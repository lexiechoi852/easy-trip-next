/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import { Attraction } from "@/types/attraction";
import { useAppDispatch } from "@/store/hooks";
import { removeAttraction } from "@/store/tripSlice";
import TrashBinIcon from "./icons/TrashBinIcon";

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
        <TrashBinIcon className="text-white" />
      </button>
    </div>
  );
}
