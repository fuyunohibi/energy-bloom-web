declare type Device = {
  id: string;
  user_id: string;
  device_name: string;
  device_type: string;
  created_at: string;
  device_count: number;
  device_unit_usage: number;
};

declare interface AddDeviceParams {
  user_id: string;
  device_name: string;
  device_type: string;
  device_count: number;
  device_unit_usage: number;
}

declare interface UpdateDeviceParams {
  id: string;
  device_name: string;
  device_type: string;
  device_count: number;
  device_unit_usage: number;
}

declare interface DeleteDeviceParams {
  id: string;
}

declare interface GetDevicesParams {
  user_id: string;
}