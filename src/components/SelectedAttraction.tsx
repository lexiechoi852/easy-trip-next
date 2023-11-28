"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeScheduleItem } from "@/store/tripThunk";
import { ScheduleItem } from "@/types/trip";
import MarkerIcon from "./icons/MarkerIcon";
import TrashBinIcon from "./icons/TrashBinIcon";

interface SelectedAttractionProps {
  attraction: ScheduleItem;
  index: number;
}

export default function SelectedAttraction({
  attraction,
  index,
}: SelectedAttractionProps) {
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
    <div className="relative m-2 flex rounded-lg border p-2">
      <div className="mr-1 flex justify-center">
        <MarkerIcon />
        <span className="absolute font-bold text-white">{index + 1}</span>
      </div>
      <div className="flex items-center">{attraction.name}</div>
      <button
        type="button"
        className="ml-auto"
        onClick={removeAttraction}
        aria-label="remove attraction"
      >
        <TrashBinIcon className="text-gray-800" />
      </button>
    </div>
  );
}
