// pages/api/add-device.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { addDevice } from '../libs/actions/device.actions'; // Adjust the import path based on your project structure
// pages/api/add-device.ts

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Log the request method and body for debugging
      console.log('Received POST request:', req.body);

      const { user_id, device_name, device_type, device_count, device_unit_usage } = req.body;

      // Validate the request body to ensure all required fields are present
      if (!user_id || !device_name || !device_type || !device_count || !device_unit_usage) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Call the addDevice function to insert the data into the Supabase database
      const data = await addDevice({ 
        user_id, 
        device_name, 
        device_type, 
        device_count, 
        device_unit_usage 
      });

      // Log the successful insertion
      console.log('Device added successfully:', data);

      // Respond with the inserted data
      res.status(200).json(data);
    } catch (error) {
      // Log the error details
      console.error('Error adding device:', error);

      // Respond with a 500 status and the error message
      res.status(500).json({ error: error.message });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ message: 'Method not allowed' });
  }
}
