"use server";

import { createClient } from "@/src/utils/supabase/server";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";

export const addBilling = async ({
  user_id,
  month,
  year,
  price,
  tax,
  total,
}: AddBillingParams) => {
  try {
    const supabase = createClient();

    const createdAt = dayjs().toISOString();

    console.log("Adding billing this is from actions:", {
      user_id,
      month,
      year,
      price,
      tax,
      total,
      created_at: createdAt,
    });

    const { data, error } = await supabase.from("billings").insert([
      {
        user_id,
        month,
        year,
        price,
        tax,
        total,
        created_at: createdAt, 
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/");

    return data;
  } catch (error) {
    console.error("Error adding billing:", error);
    throw new Error("Failed to add billing. Please try again later.");
  }
};

export const getBillings = async ({
  user_id,
}: GetBillingParams) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("billings")
        .select("*")
        .eq("user_id", user_id);

    if (error) {
        console.error("Error:", error);
        throw new Error(error.message);
    }

    console.log("BILLING DATA:", data);

    return data;
  } catch (error) {
    console.error("Error getting billing:", error);
    throw new Error("Failed to get billing. Please try again later.");
  }
};
