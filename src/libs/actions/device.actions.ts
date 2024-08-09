"use server";

import { createClient } from "@/src/utils/supabase/server";

export const addDevice = async ({
  user_id,
  device_name,
  device_type,
  device_number,
  device_unit_usage,
}: {
  user_id: string;
  device_name: string;
  device_type: string;
  device_number: number;
  device_unit_usage: number;
}) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("devices").insert([
      {
        user_id,
        device_name,
        device_type,
        device_number,
        device_unit_usage,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error adding device:", error);
    throw new Error("Failed to add device. Please try again later.");
  }
};
