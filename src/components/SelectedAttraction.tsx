"use client";

import React from "react";
import { Attraction } from "@/types/attraction";
import { useAppDispatch } from "@/store/hooks";
import { removeAttraction } from "@/store/userSlice";

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
        <span className="absolute font-bold text-white">{index}</span>
      </div>
      <div className="flex items-center">{attraction.name}</div>
      <button
        type="button"
        className="ml-auto"
        onClick={() => dispatch(removeAttraction(attraction))}
      >
        <svg
          className="h-5 w-5 text-gray-800 dark:text-white"
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
