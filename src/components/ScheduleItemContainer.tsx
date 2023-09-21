"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Draggable } from "@fullcalendar/interaction";
import { useAppSelector } from "@/store/hooks";
import ScheduleItem from "./ScheduleItem";

export default function ScheduleItemContainer() {
  const createDraggleItems = () => {
    const draggableEl: HTMLElement | null =
      document.getElementById("external-events");
    if (draggableEl) {
      const draggle = new Draggable(draggableEl, {
        itemSelector: ".fc-event",
      });
      console.log(draggle, "draggle");
    }
  };

  useEffect(() => {
    createDraggleItems();
  }, []);

  const { selectedAttractions, calendarEvents } = useAppSelector(
    (state) => state.trip,
  );

  return (
    <div
      className="mr-2 min-w-[260px] rounded-lg border shadow-lg"
      id="external-events"
    >
      <div className="text-center text-lg font-semibold text-gray-800">
        Unplanned Attractions
      </div>
      {selectedAttractions && selectedAttractions.length > 0 ? (
        <div>
          {selectedAttractions.map((attraction) => (
            <ScheduleItem key={attraction.id} attraction={attraction} />
          ))}
        </div>
      ) : (
        <div>
          {calendarEvents && calendarEvents.length > 0 ? (
            <Link
              href="/itinerary"
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
              <div className="text-white">Check out the itinerary</div>
            </Link>
          ) : (
            <Link
              href="/attractions"
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
              <div className="text-white">
                Find Attractions you want to visit
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
