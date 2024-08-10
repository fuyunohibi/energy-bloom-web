"use client";

import { useState } from "react";
import { cn } from "@/src/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import EditOrDeleteDeviceDialog from "../dialogs/edit-or-delete-device-dialog";

export const HoverEffectEdit = ({
  items,
  className,
  useGrid = true,
}: {
  items: Device[];
  className?: string;
  useGrid?: boolean;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn("", className, {
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 py-10": useGrid,
      })}
    >
      {items.map((item, idx) => (
        <div
          key={item?.device_name}
          className="relative group  block p-2  w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-primary dark:bg-slate-800 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card device={item}>
            <Carddevice_name>{item.device_name}</Carddevice_name>
            <CardDescription className="text-black-2 text-[14px] font-medium">
              {item.device_count}{" "}
              {item.device_count === 1 ? "Device" : "Devices"}
            </CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  device,
  className,
  children,
}: {
  device: Device;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl w-full relative z-20 shadow-lg bg-white overflow-hidden",
        className
      )}
    >
      <div className="absolute top-4 right-2 z-[9999]">
        <EditOrDeleteDeviceDialog device={device}
        />
      </div>
      <div className="relative z-50">
        <div className="px-8 py-6">{children}</div>
      </div>
    </div>
  );
};
export const Carddevice_name = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-black-1 font-bold tracking-wide", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-3 text-black-2 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};