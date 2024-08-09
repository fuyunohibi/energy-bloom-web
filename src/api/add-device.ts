// pages/api/add-device.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { addDevice } from '../libs/actions/device.actions'; // Adjust the import path based on your project structure

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user_id, device_name, device_type, device_number, device_unit_usage } = req.body;

    try {
      const data = await addDevice({ 
        user_id, 
        device_name, 
        device_type, 
        device_number, 
        device_unit_usage 
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
