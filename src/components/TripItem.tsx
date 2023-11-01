import React from "react";
import Image from "next/image";
import { CalendarEvent } from "@/types/trip";
import MarkerIcon from "./icons/MarkerIcon";

interface TripItemProps {
  calendarEvent: CalendarEvent;
  index: number;
}

export default function TripItem({ calendarEvent, index }: TripItemProps) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100 md:flex-row">
      <Image
        className="h-96 w-full rounded-lg object-cover md:h-auto md:w-48"
        src={calendarEvent.image}
        alt={calendarEvent.title}
        width={250}
        height={250}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <div className="mb-2 flex items-center">
          <div className="mr-1 flex justify-center">
            <MarkerIcon />
            <span className="absolute font-bold text-white">{index + 1}</span>
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {calendarEvent.title}
          </h5>
        </div>
        <p className="mb-3 line-clamp-3 font-normal text-gray-700 dark:text-gray-400">
          {calendarEvent.description}
        </p>
      </div>
    </div>
  );
}
