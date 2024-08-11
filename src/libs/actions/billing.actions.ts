"use server";

import { createClient } from "@/src/utils/supabase/server";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { getMonthlyUsage } from './electricity-usage.actions';
import { TAX } from "@/src/constants";

export const addBilling = async ({
  user_id,
  month,
  year,
}: AddBillingParams) => {
  try {
    const supabase = createClient();

    const createdAt = dayjs().toISOString();

    const {usage, price} = await getMonthlyUsage({ user_id });
    const numericPrice = Number(price);
    const totalPrice = Number(numericPrice.toFixed(2));

    console.log("price:", totalPrice);

    const tax = Number((totalPrice * TAX).toFixed(2));
    const total = totalPrice + tax;

    console.log("Adding billing this is from actions:", {
      user_id,
      month,
      year,
      totalPrice,
      tax,
      total,
      created_at: createdAt,
    });

    const { data, error } = await supabase.from("billings").insert([
      {
        user_id,
        month,
        year,
        price: totalPrice,
        tax,
        total,
        created_at: createdAt,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/house/billing");

    return data;
  } catch (error) {
    console.error("Error adding billing:", error);
    throw new Error("Failed to add billing. Please try again later.");
  }
};

export const getBillings = async ({ user_id }: GetBillingParams) => {
  try {
    const supabase = createClient();
    const currentMonth = dayjs().month() + 1;
    const currentYear = dayjs().year();

    const { data, error } = await supabase
      .from("billings")
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      console.error("Error:", error);
      throw new Error(error.message);
    }

    console.log("BILLING DATA:", data);

    const isFirstDayOfMonth = new Date().getDate() === 1;
    const hasCurrentMonthBilling = data.some(
      (billing) => billing.month === currentMonth && billing.year === currentYear
    );
    console.log("hasCurrentMonthBilling:", hasCurrentMonthBilling);
    if (!hasCurrentMonthBilling || (!hasCurrentMonthBilling && isFirstDayOfMonth)) {
      console.log("No billing data for this month. Adding new billing...");

      await addBilling({
        user_id,
        month: currentMonth,
        year: currentYear,
      });
    } else {
      console.log("Billing data already exists for this month.");
    }

    return data;
  } catch (error) {
    console.error("Error getting billing:", error);
    throw new Error("Failed to get billing. Please try again later.");
  }
};
