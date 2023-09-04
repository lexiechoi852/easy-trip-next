/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import { Attraction } from "@/types/attraction";
import { useAppDispatch } from "@/store/hooks";
import { removeAttraction } from "@/store/tripSlice";

interface ScheduleItemProps {
  attraction: Attraction;
}

export default function ScheduleItem({ attraction }: ScheduleItemProps) {
  const dispatch = useAppDispatch();

  return (
    <div
      className="fc-event relative m-2 flex cursor-grab rounded-lg border bg-cyan-700 p-2"
      title={attraction.name}
    >
      <div className="flex items-center font-semibold text-white">
        {attraction.name}
      </div>
      <button
        type="button"
        className="ml-auto"
        onClick={() => dispatch(removeAttraction(attraction))}
      >
        <svg
          className="h-5 w-5 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
          />
        </svg>
      </button>
    </div>
  );
}
