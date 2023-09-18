"use client";

import React from "react";
import { useAppSelector } from "@/store/hooks";
import TripItem from "./TripItem";

export default function TripList() {
  const { calendarEvents } = useAppSelector((state) => state.trip);

  return (
    <div>
      {calendarEvents.length > 0 ? (
        <>
          {calendarEvents.map((calendarEvent) => (
            <TripItem key={calendarEvent.id} calendarEvent={calendarEvent} />
          ))}
        </>
      ) : (
        <div>There is no calendar event</div>
      )}
    </div>
  );
}
