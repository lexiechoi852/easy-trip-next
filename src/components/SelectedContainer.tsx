"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import SelectedAttraction from "./SelectedAttraction";

export default function SelectedContainer() {
  const { selectedAttractions } = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(selectedAttractions, "selectedAttractions");
  }, [selectedAttractions]);

  return (
    <div className="mr-2 min-w-[260px] rounded-lg border shadow-lg">
      <div className="text-center text-lg font-semibold text-gray-800">
        Selected Attractions
      </div>
      {selectedAttractions && selectedAttractions.length > 0 ? (
        <div>
          {selectedAttractions.map((attraction, index) => (
            <SelectedAttraction
              key={attraction.id}
              attraction={attraction}
              index={index}
            />
          ))}
          <Link
            href="/calendar"
            className="m-2 flex rounded-lg bg-sky-700 p-2 font-bold hover:bg-sky-500"
          >
            <svg
              className="mr-2 h-6 w-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
            <div className="text-white">Plan your trip NOW</div>
          </Link>
        </div>
      ) : (
        <div className="relative m-2 flex items-center rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          <svg
            className="mr-2 h-6 w-6 text-red-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 8v4m0 0-2-2m2 2 2-2M3 5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5H3ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
            />
          </svg>
          <span className="block sm:inline">No Items</span>
        </div>
      )}
    </div>
  );
}
