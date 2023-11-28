/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeScheduleItem } from "@/store/tripThunk";
import { ScheduleItem } from "@/types/trip";
import TrashBinIcon from "./icons/TrashBinIcon";

interface ScheduleItemProps {
  attraction: ScheduleItem;
}

export default function Schedule({ attraction }: ScheduleItemProps) {
  const dispatch = useAppDispatch();

  const { scheduleItems } = useAppSelector((state) => state.trip);

  const removeAttraction = () => {
    const scheduleItem = scheduleItems.find(
      (scheduleItem) => scheduleItem.id === attraction.id,
    );

    if (scheduleItem) {
      dispatch(removeScheduleItem(scheduleItem.id));
    }
  };

  return (
    <div
      className="fc-event relative m-2 flex cursor-grab rounded-lg border bg-cyan-700 p-2"
      id={attraction.attractionId.toString()}
      title={attraction.name}
    >
      <div className="flex items-center font-semibold text-white">
        {attraction.name}
      </div>
      <button
        type="button"
        className="ml-auto"
        onClick={removeAttraction}
        aria-label="remove attraction"
      >
        <TrashBinIcon className="text-white" />
      </button>
    </div>
  );
}
