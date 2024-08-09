"use server";

import { createClient } from '@/src/utils/supabase/server'; // Adjust the import path based on your project structure

interface AddDeviceParams {
  user_id: string;
  device_name: string;
  device_type: string;
  device_number: number;
  device_unit_usage: number;
}

export const addDevice = async ({
  user_id,
  device_name,
  device_type,
  device_number,
  device_unit_usage,
}: AddDeviceParams) => {
  try {
    const supabase = createClient();

    console.log('Adding device this is from actions:', {
      user_id,
      device_name,
      device_type,
      device_number,
      device_unit_usage,
    });

    const { data, error } = await supabase
      .from('devices')
      .insert([
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
    console.error('Error adding device:', error);
    throw new Error('Failed to add device. Please try again later.');
  }
};
