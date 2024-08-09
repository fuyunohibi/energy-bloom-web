"use client";

import * as React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog"; // Adjust this import path if needed
import { addDevice } from "@/src/libs/actions/device.actions";

interface RightSidebarProps {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

const RightSidebar = ({ user }: RightSidebarProps) => {
  const [deviceName, setDeviceName] = React.useState('');
  const [deviceType, setDeviceType] = React.useState('');
  const [deviceNumber, setDeviceNumber] = React.useState('');
  const [deviceUnitUsage, setDeviceUnitUsage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      // const response = await fetch('/api/add-device', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     user_id: user.id,
      //     device_name: deviceName,
      //     device_type: deviceType,
      //     device_number: Number(deviceNumber),
      //     device_unit_usage: Number(deviceUnitUsage),
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to add device');
      // }

      // const data = await response.json();
      // console.log('Device added:', data);
      // Optionally reset the form or close the dialog here
      console.log('Device added via front:', {
        user_id: user.id,
        device_name: deviceName,
        device_type: deviceType,
        device_number: Number(deviceNumber),
        device_unit_usage: Number(deviceUnitUsage),
      });

      const data = await addDevice({
        user_id: user.id,
        device_name: deviceName,
        device_type: deviceType,
        device_number: Number(deviceNumber),
        device_unit_usage: Number(deviceUnitUsage),
      });

      console.log('Device success:', data);
    } catch (error) {
      console.error('Error adding device:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="no-scrollbar hidden max-h-screen flex-col border-l border-gray-200 xl:flex w-[355px] xl:overflow-y-scroll bg-white rounded-[3.25rem] m-5 shadow-lg">
      <section className="flex flex-col pb-8">
        {/* BACKGROUND IMAGE */}
        <div className="h-[160px] w-full bg-primary bg-cover bg-no-repeat" />
        {/* PROFILE */}
        <div className="relative flex px-6 max-xl:justify-center">
          <div className="flex-center absolute -top-12 size-24 rounded-full bg-gray-100 border-white p-1.5 shadow-profile">
            <Image
              src={user?.avatar_url}
              className="rounded-full"
              width={100}
              height={100}
              alt="user avatar"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col pt-[4.5rem]">
            <h1 className="text-[24px] font-semibold text-gray-900">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-[16px] font-normal text-gray-600">
              {user.email}
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-between gap-8 px-6 py-8">
        <div className="flex w-full justify-between">
          <h2 className="text-[18px] font-semibold text-gray-900">
            My Furniture
          </h2>
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex gap-2">
                <Image
                  src="/assets/icons/shared/plus-icon.svg"
                  width={20}
                  height={20}
                  alt="plus icon"
                />
                <h2 className="text-[14px] font-semibold text-gray-600 mt-[0.15rem]">
                  Add Furniture
                </h2>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Device</DialogTitle>
                <DialogDescription>
                  Add details about the new device.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Device Name"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Device Type"
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Device Number"
                  value={deviceNumber}
                  onChange={(e) => setDeviceNumber(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Device Unit Usage"
                  value={deviceUnitUsage}
                  onChange={(e) => setDeviceUnitUsage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <button type="button" className="mr-4">
                      Cancel
                    </button>
                  </DialogClose>
                  <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;
