"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Draggable } from "@fullcalendar/interaction";
import { useAppSelector } from "@/store/hooks";
import ScheduleItem from "./ScheduleItem";
import PaperPlaneIcon from "./icons/PaperPlaneIcon";

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

  const { scheduleItems, calendarEvents } = useAppSelector(
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
      {scheduleItems && scheduleItems.length > 0 ? (
        <div>
          {scheduleItems.map((scheduleItem) => (
            <ScheduleItem key={scheduleItem.id} attraction={scheduleItem} />
          ))}
        </div>
      ) : (
        <div>
          {calendarEvents && calendarEvents.length > 0 ? (
            <Link
              href="/itinerary"
              className="m-2 flex rounded-lg bg-sky-700 p-2 font-bold hover:bg-sky-500"
            >
              <PaperPlaneIcon />
              <div className="text-white">Check out the itinerary</div>
            </Link>
          ) : (
            <Link
              href="/attractions"
              className="m-2 flex rounded-lg bg-sky-700 p-2 font-bold hover:bg-sky-500"
            >
              <PaperPlaneIcon />
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
