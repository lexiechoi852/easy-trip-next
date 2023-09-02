"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Attraction } from "@/types/attraction";
import { addAttraction, removeAttraction } from "@/store/userSlice";

interface AddAttractionButtonProps {
  attraction: Attraction;
}

export default function AddAttractionButton({
  attraction,
}: AddAttractionButtonProps) {
  const dispatch = useAppDispatch();
  const { selectedAttractions } = useAppSelector((state) => state.user);

  const checkSelectedAttraction = () => {
    if (
      selectedAttractions &&
      selectedAttractions.length > 0 &&
      selectedAttractions.find((selected) => selected.id === attraction.id)
    ) {
      return true;
    }
    return false;
  };

  const clickAttraction = (attraction: Attraction) => {
    if (checkSelectedAttraction()) {
      dispatch(removeAttraction(attraction));
    } else {
      dispatch(addAttraction(attraction));
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
