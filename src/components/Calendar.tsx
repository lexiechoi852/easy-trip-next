"use client";

import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addAttractionToCalendar, addTrip } from "@/store/tripSlice";

export default function Calendar() {
  const dispatch = useAppDispatch();
  const { calendarEvents, trips } = useAppSelector((state) => state.trip);

  useEffect(() => {
    if (trips.length === 0) {
      dispatch(addTrip());
    }
  }, []);

  const calendarRef = useRef<FullCalendar>(null);

  const handleEventDrop = (info: any) => {
    console.log(info, "handleEventDrop info");
  };

  const handleExternalEventDrop = (dropInfo: any) => {
    console.log(dropInfo, "handleExternalEventDrop info");
    const newEvent = {
      title: dropInfo.draggedEl.title,
      date: dropInfo.date.toISOString(),
    };
    dispatch(addAttractionToCalendar(newEvent));
  };

  const handleEventClick = (info: any) => {
    console.log(info, "handleEventClick info");
  };

  return (
    <div className="h-full w-full rounded-lg border p-2">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        ref={calendarRef}
        eventDurationEditable
        initialView="timeGridWeek"
        allDaySlot={false}
        events={calendarEvents}
        eventDrop={handleEventDrop}
        drop={handleExternalEventDrop}
        eventClick={handleEventClick}
        editable
        droppable
      />
    </div>
  );
}
