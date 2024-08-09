// src/pages/api/add-device.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/src/utils/supabase/server'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { user_id, device_name, device_type, device_number, device_unit_usage } = req.body;
  
      try {
        const supabase = createClient();
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
  
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }