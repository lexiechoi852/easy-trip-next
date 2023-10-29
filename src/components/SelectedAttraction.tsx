"use client";

import React from "react";
import { Attraction } from "@/types/attraction";
import { useAppDispatch } from "@/store/hooks";
import { removeAttraction } from "@/store/tripSlice";
import MarkerIcon from "./icons/MarkerIcon";
import TrashBinIcon from "./icons/TrashBinIcon";

interface SelectedAttractionProps {
  attraction: Attraction;
  index: number;
}

export default function SelectedAttraction({
  attraction,
  index,
}: SelectedAttractionProps) {
  const dispatch = useAppDispatch();

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
        onClick={() => dispatch(removeAttraction(attraction))}
      >
        <TrashBinIcon className="text-gray-800" />
      </button>
    </div>
  );
}
