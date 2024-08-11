"use server";

import { UNIT_PRICE } from '@/src/constants';
import { createClient } from '@/src/utils/supabase/server'; 
import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';

const isBetween = (date: dayjs.Dayjs, start: dayjs.Dayjs, end: dayjs.Dayjs, inclusivity: string = '[]') => {
    const isAfterStart = inclusivity.includes('[') ? !date.isBefore(start) : date.isAfter(start);
    const isBeforeEnd = inclusivity.includes(']') ? !date.isAfter(end) : date.isBefore(end);
    return isAfterStart && isBeforeEnd;
};

// export const calculateUsage = async ({ user_id }: GetTodayUsageParams): Promise<{ totalUsage: number, totalPrice: number }> => {
//     try {
//         const supabase = createClient();
        
//         const { data: devices, error } = await supabase
//             .from("devices")
//             .select("device_unit_usage, created_at")
//             .eq("user_id", user_id);

//         if (error) {
//             console.error("Error:", error);
//             throw new Error(error.message);
//         }

//         const currentMonthStart = dayjs().startOf("month");
//         const currentMonthEnd = dayjs().endOf("month");

//         const totalUsage = devices.reduce((total, device) => {
//             const deviceCreatedAt = dayjs(device.created_at);

//             if (isBetween(deviceCreatedAt, currentMonthStart, currentMonthEnd, '[]')) {
//                 const hoursSinceCreationThisMonth = deviceCreatedAt.isSame(dayjs(), "month")
//                     ? Math.min(dayjs().hour() - deviceCreatedAt.hour(), dayjs().hour())
//                     : 0;

//                 const usageThisMonth = device.device_unit_usage * hoursSinceCreationThisMonth;

//                 return total + usageThisMonth;
//             }

//             return total;
//         }, 0);

//         const totalPrice = totalUsage * UNIT_PRICE;

//         console.log("This month's usage:", {
//             totalUsage,
//             totalPrice,
//         });

//         return {
//             totalUsage,
//             totalPrice,
//         };
//     } catch (error) {
//         console.error("Error calculating this month's usage:", error);
//         throw new Error("Failed to calculate this month's usage. Please try again later.");
//     }
// };


export const getMonthlyUsage = async ({ user_id }: GetMonthlyUsageParams) => {
    try {
        const supabase = createClient();
        
        const currentMonth = dayjs().format('MMMM'); 
        const currentYear = dayjs().format('YYYY'); 

        console.log(`Filtering for month: ${currentMonth}, year: ${currentYear}`);

        const { data, error } = await supabase
            .from("usages")
            .select("*")
            .eq("user_id", user_id)
            .eq("month", currentMonth)
            .eq("year", currentYear);   

        if (error) {
            console.error("Error:", error);
            throw new Error(error.message);
        }

        if (!data || data.length === 0) {
            console.log("No usage data found for the current month.");
            return {
                totalUsage: 0,
                totalPrice: 0
            };
        }

        return data;
    } catch (error) {
        console.error("Error fetching usage data:", error);
        throw new Error("Failed to fetch usage data. Please try again later.");
    }
};

export const addOrUpdateMonthlyUsage = async ({
    user_id,
    usage,
    price,
}: { user_id: string; usage: number; price: number }) => {
    try {
        const supabase = createClient();

        const todayDate = dayjs().startOf("day");
        const currentMonth = dayjs().month() + 1
        const currentYear = dayjs().year();

        const isFirstDayOfMonth = todayDate.isSame(dayjs().startOf("month"), "day");

        console.log(`********Filtering for month: ${currentMonth}, year: ${currentYear}`);
        console.log("Total Usage:", usage);
        console.log("Total Price:", price);


        const { data: existingData, error: fetchError } = await supabase
            .from("usages")
            .select("id")
            .eq("user_id", user_id)
            .eq("month", currentMonth)
            .eq("year", currentYear)

        if (fetchError) {
            console.error("Error checking existing data:", fetchError.message);
            throw new Error(fetchError.message);
        }

        const createdAt = dayjs().toISOString();
        const updatedAt = createdAt;
        

        if (existingData) {
            if (existingData.length > 0) {
                const { id } = existingData[0];
            const { error: updateError } = await supabase
                .from("usages")
                .update({
                    usage,
                    price,
                    updated_at: updatedAt,
                })
                .eq("id", existingData.id);

            if (updateError) {
                console.error("Error updating existing data:", updateError.message);
                throw new Error(updateError.message);
            }

            console.log("Updated usage for the current month:", {
                user_id,
                usage,
                price,
                updated_at: updatedAt,
            });

            return existingData.id;
        }
        else if (!existingData || isFirstDayOfMonth) {
            const { data, error: insertError } = await supabase.from("usages").insert([
                {
                    user_id,
                    month: currentMonth,
                    year: currentYear,
                    usage,
                    price,
                    created_at: createdAt,
                    updated_at: updatedAt,
                },
            ]);

            if (insertError) {
                console.error("Error inserting new data:", insertError.message);
                throw new Error(insertError.message);
            }

            console.log("Inserted usage for the current month:", {
                user_id,
                month: currentMonth,
                year: currentYear,
                usage,
                price,
                created_at: createdAt,
                updated_at: updatedAt,
            });

            return data[0]?.id;
        }

        // revalidatePath("/");
        return null;


    } catch (error) {
        console.error("Error adding or updating monthly usage:", error);
        throw new Error("Failed to add or update monthly usage. Please try again later.");
    }
};


export const calculateUsage = async ({ user_id }: GetTodayUsageParams): Promise<{ usage: number, price: number }> => {
    try {
        const supabase = createClient();
    
        const { data: devices, error } = await supabase
        .from("devices")
        .select("device_unit_usage, created_at")
        .eq("user_id", user_id);
    
        if (error) {
        console.error("Error:", error);
        throw new Error(error.message);
        }
    
        const now = dayjs();
        const currentMonthStart = dayjs().startOf("month");
        const currentHour = now.diff(currentMonthStart, 'hour');

        console.log("Current Month:", currentHour);
    
        const usage = devices.reduce((total, device) => {
        const deviceCreatedAt = dayjs(device.created_at);
    
        const secondsSinceCreationToday = deviceCreatedAt.isSame(
            currentMonthStart,
            "hour"
        )
            ? Math.min(currentHour - deviceCreatedAt.second(), currentHour)
            : currentHour;
    
        const usageToday =
            device.device_unit_usage * Math.max(secondsSinceCreationToday, 0);
    
        return total + usageToday;
        }, 0);
    
        const price = usage * UNIT_PRICE;
    
        console.log("Today's usage (in seconds):", {
            usage,
            price,
        });
    
        return {
            usage,
            price,
        };
    } catch (error) {
        console.error("Error calculating today's usage (in seconds):", error);
        throw new Error(
        "Failed to calculate today's usage. Please try again later."
        );
    }
};

  
  // NOTE: FOR TESTING PURPOSES ONLY (USING SECONDS INSTEAD OF HOURS)
//   export const getTodayUsage = async ({ user_id }: GetTodayUsageParams) => {
//     try {
//       const supabase = createClient();
  
//       const { data: devices, error } = await supabase
//         .from("devices")
//         .select("device_unit_usage, created_at")
//         .eq("user_id", user_id);
  
//       if (error) {
//         console.error("Error:", error);
//         throw new Error(error.message);
//       }
  
//       // Use seconds instead of hours for testing purposes
//       const currentSecond = dayjs().second();
//       const todayDate = dayjs().startOf("minute"); // Start of the current minute for testing
  
//       const totalUsage = devices.reduce((total, device) => {
//         const deviceCreatedAt = dayjs(device.created_at);
  
//         // Calculate "seconds" since creation today
//         const secondsSinceCreationToday = deviceCreatedAt.isSame(
//           todayDate,
//           "minute"
//         )
//           ? Math.min(currentSecond - deviceCreatedAt.second(), currentSecond)
//           : currentSecond;
  
//         // Calculate today's usage for this device using seconds instead of hours
//         const usageToday =
//           device.device_unit_usage * Math.max(secondsSinceCreationToday, 0);
  
//         return total + usageToday;
//       }, 0);
  
//       const totalPriceToday = totalUsage * UNIT_PRICE;
  
//       console.log("Today's usage (in seconds):", {
//         totalUsage,
//         totalPriceToday,
//       });
  
//       return {
//         totalUsage,
//         totalPriceToday,
//       };
//     } catch (error) {
//       console.error("Error calculating today's usage (in seconds):", error);
//       throw new Error(
//         "Failed to calculate today's usage. Please try again later."
//       );
//     }
//   };
  

