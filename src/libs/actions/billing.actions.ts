"use server";

import { createClient } from '@/src/utils/supabase/server'; 
import { revalidatePath } from 'next/cache';

export const addBilling = async ({
    month,
    year,
    price,
    tax,
    total,
}: AddBillingParams) => {
    try {
        const supabase = createClient();
        
        console.log('Adding billing this is from actions:', {
            month,
            year,
            price,
            tax,
            total,
        });

        const { data, error } = await supabase
            .from('billing')
            .insert([
                {
                    month,
                    year,
                    price,
                    tax,
                    total,
                },
            ]);

        if (error) {
            throw new Error(error.message);
        }

        revalidatePath('/');

        return data;
    } catch (error) {
        console.error('Error adding billing:', error);
        throw new Error('Failed to add billing. Please try again later.');
    }
}

export const getBilling = async ({ user_id }: GetBillingParams): Promise<Billing[]> => {
    try {
        const supabase = createClient();

        // const { data, error } = await supabase
        //     .from("billing")
        //     .select("*")
        //     .eq("user_id", user_id);
    
        // if (error) {
        //     console.error("Error:", error);
        //     throw new Error(error.message);
        // }
    
        // return data;

        const data = [
            {
                id: "1",
                user_id: user_id,
                month: "July",
                year: "2024",
                price: 1000,
                tax: 10,
                total: 1010,
                created_at: "2024-08-10 18:51:14.373682"
            },
            {
                id: "2",
                user_id: user_id,
                month: "August",
                year: "2024",
                price: 1200,
                tax: 10,
                total: 1210,
                created_at: "2024-08-10 18:51:14.373682"
            },
            {
                id: "3",
                user_id: user_id,
                month: "September",
                year: "2024",
                price: 1300,
                tax: 10,
                total: 1310,
                created_at: "2024-08-10 18:51:14.373682"
            },
            {
                id: "4",
                user_id: user_id,
                month: "October",
                year: "2024",
                price: 1400,
                tax: 10,
                total: 1410,
                created_at: "2024-08-10 18:51:14.373682"
            },
        ]

        return data as Billing[];

    } catch (error) {
        console.error("Error getting billing:", error);
        // throw new Error("Failed to get billing. Please try again later.");
        const billing: Billing[] = [];
        return billing;
    }
};


