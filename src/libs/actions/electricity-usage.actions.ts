"use server";

import { UNIT_PRICE } from '@/src/constants';
import { createClient } from '@/src/utils/supabase/server'; 
import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';

export const getMonthlyUsage = async ({ user_id }: GetMonthlyUsageParams) => {
    try {
        const supabase = createClient();
        
        const currentMonth = dayjs().month() + 1
        const currentYear = dayjs().year();

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

        return data[0].price;

    } catch (error) {
        console.error("Error fetching usage data:", error);
        throw new Error("Failed to fetch usage data. Please try again later.");
    }
};

export const addElectricityUsage = async ({
    user_id,
    usage,
    price,
  }: AddElectricityUsageParams) => {
    try {
        const supabase = createClient();

        const createdAt = dayjs().toISOString(); 

        const currentMonth = dayjs().month() + 1;
        const currentYear = dayjs().year();

        console.log("Adding this usage from actions:", {
            user_id,
            month: currentMonth,
            year: currentYear,
            usage,
            price,
            created_at: createdAt,
            updated_at: createdAt,
        });

        const { data, error } = await supabase.from("usages").insert([
        {
            user_id,
            month: currentMonth,
            year: currentYear,
            usage,
            price,
            created_at: createdAt,
            updated_at: createdAt,
        },
        ]);

        if (error) {
        throw new Error(error.message);
        }

        revalidatePath("/");

        return data;
    } catch (error) {
        console.error("Error adding device:", error);
        throw new Error("Failed to add device. Please try again later.");
    }
  };

  export const updateElectricityUsage = async ({
    user_id,
    usage,
    price,
  }: UpdateElectricityUsageParams) => {
    try {
        const supabase = createClient();
        const updatedAt = dayjs().toISOString(); 

        const currentMonth = dayjs().month() + 1;
        const currentYear = dayjs().year();

        console.log('Updating this usage from actions:', {
            user_id,
            usage,
            price,
            updated_at: updatedAt,
        });

        const { data, error } = await supabase
        .from('usages')
        .update({
            user_id,
            usage,
            price,
            updated_at: updatedAt,
        })
        .eq('user_id', user_id)
        .eq('month', currentMonth)
        .eq('year', currentYear);

        if (error) {
        throw new Error(error.message);
        }

        revalidatePath('/');

        return data;
    } catch (error) {
        console.error('Error updating device:', error);
        throw new Error('Failed to update device. Please try again later.');
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
        const currentMinute = now.diff(currentMonthStart, 'minute');

        console.log("Minutes since the start of the month:", currentMinute);

        const rawUsage = devices.reduce((total, device) => {
            const deviceCreatedAt = dayjs(device.created_at);

            const minutesSinceCreation = deviceCreatedAt.isSame(currentMonthStart, "minute")
                ? Math.min(currentMinute - deviceCreatedAt.minute(), currentMinute)
                : currentMinute;

            const usageToday = device.device_unit_usage * Math.max(minutesSinceCreation, 0);

            const totalUsage = (total + usageToday) / 60;

            return totalUsage;
        }, 0);

        const usage = parseFloat(rawUsage.toFixed(2));
        const price = parseFloat((usage * UNIT_PRICE).toFixed(2));

        console.log("Today's usage (in minutes):", {
            usage,
            price,
        });

        const isFirstDayOfMonth = now.isSame(dayjs().startOf("month"), "day");
        console.log("Is first day of month:", isFirstDayOfMonth);

        if (isFirstDayOfMonth) {
            try {
                await addElectricityUsage({ user_id, usage, price });
            } catch (error) {
                console.error("Error adding today's usage:", error);
                throw new Error("Failed to add today's usage. Please try again later.");
            }
        } else {
            try {
                await updateElectricityUsage({ user_id, usage, price });
            } catch (error) {
                console.error("Error updating today's usage:", error);
                throw new Error("Failed to update today's usage. Please try again later.");
            }
        }

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
  

