"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Attraction } from "@/types/attraction";
import { addScheduleItem, removeScheduleItem } from "@/store/tripThunk";

interface AddAttractionButtonProps {
  attraction: Attraction;
}

export default function AddAttractionButton({
  attraction,
}: AddAttractionButtonProps) {
  const dispatch = useAppDispatch();
  const { currentTrip, scheduleItems } = useAppSelector((state) => state.trip);

  const checkSelectedAttraction = () => {
    if (
      scheduleItems &&
      scheduleItems.length > 0 &&
      scheduleItems.find((selected) => selected.attractionId === attraction.id)
    ) {
      return true;
    }
    return false;
  };

  const clickAttraction = (attraction: Attraction) => {
    if (checkSelectedAttraction()) {
      const scheduleItem = scheduleItems.find(
        (scheduleItem) => scheduleItem.attractionId === attraction.id,
      );

      if (scheduleItem) {
        dispatch(removeScheduleItem(scheduleItem.id));
      }
    } else {
      const scheduleItem = {
        attractionId: attraction.id,
        tripId: currentTrip!.id,
      };
      dispatch(addScheduleItem(scheduleItem));
    }
  };

  const generateClassName = () => {
    let className =
      "mr-2 rounded-lg bg-cyan-700 p-2 font-medium text-white hover:bg-cyan-800";
    if (checkSelectedAttraction()) {
      className =
        "mr-2 rounded-lg bg-red-600 p-2 font-medium text-white hover:bg-red-700";
      return className;
    }
    return className;
  };

  return (
    <button
      onClick={() => clickAttraction(attraction)}
      type="button"
      className={generateClassName()}
    >
      {checkSelectedAttraction() ? "Remove Attraction" : "Add Attraction"}
    </button>
  );
}
