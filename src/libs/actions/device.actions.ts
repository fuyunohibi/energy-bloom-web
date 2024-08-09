"use server";

import { createClient } from '@/src/utils/supabase/server'; 
import { revalidatePath } from 'next/cache';

export const addDevice = async ({
  user_id,
  device_name,
  device_type,
  device_count,
  device_unit_usage,
}: AddDeviceParams) => {
  try {
    const supabase = createClient();

    console.log('Adding device this is from actions:', {
      user_id,
      device_name,
      device_type,
      device_count,
      device_unit_usage,
    });

    const { data, error } = await supabase
      .from('devices')
      .insert([
        {
          user_id,
          device_name,
          device_type,
          device_count,
          device_unit_usage,
        },
      ]);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath('/');

    return data;
  } catch (error) {
    console.error('Error adding device:', error);
    throw new Error('Failed to add device. Please try again later.');
  }
};

export const getDevices = async ({ user_id }: GetDevicesParams) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("devices")
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      console.error("Error:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw new Error("Failed to fetch devices. Please try again later.");
  }
};
