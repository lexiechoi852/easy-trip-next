import React from "react";
import Image from "next/image";
import { CalendarEvent } from "@/types/trip";

interface TripItemProps {
  calendarEvent: CalendarEvent;
  index: number;
}

export default function TripItem({ calendarEvent, index }: TripItemProps) {
  return (
    <div className="mb-3 flex flex-col items-center rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100 md:flex-row">
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
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="location-pin"
              className="h-8 w-8 text-cyan-700"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z"
              />
            </svg>
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
