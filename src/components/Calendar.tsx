"use client";

import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addAttractionToCalendar,
  addTrip,
  editCalendarEvent,
  removeCalendarEvent,
} from "@/store/tripSlice";

export default function Calendar() {
  const dispatch = useAppDispatch();
  const { calendarEvents, trips } = useAppSelector((state) => state.trip);

  useEffect(() => {
    if (trips.length === 0) {
      const newTrip = {
        city: "toronto",
        startDate: new Date().toISOString(),
        endDate: dayjs().add(5, "day").toISOString(),
      };
      dispatch(addTrip(newTrip));
    }
  }, []);

  useEffect(() => {
    console.log(calendarEvents, "calendarEvents");
  }, [calendarEvents]);

  const calendarRef = useRef(null);

  const handleEventChange = (eventInfo: any) => {
    console.log(eventInfo, "handleEventChange info");
    const newEventInfo = {
      id: eventInfo.oldEvent.id,
      start: eventInfo.event.start.toISOString(),
      end: eventInfo.event.end.toISOString(),
    };
    dispatch(editCalendarEvent(newEventInfo));
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

  const isInsideCalendar = (point: { x: number; y: number }, element: any) => {
    const rect = element.elRef.current.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const bottom = rect.bottom + window.scrollY;
    const left = rect.left + window.scrollX;
    const right = rect.right + window.scrollX;

    return (
      point.x >= left && point.x <= right && point.y >= top && point.y <= bottom
    );
  };

  const handleEventDrag = (eventInfo: any) => {
    console.log(eventInfo, "handleEventDrag info");
    if (!calendarRef.current) return;
    if (
      isInsideCalendar(
        { x: eventInfo.jsEvent.pageX, y: eventInfo.jsEvent.pageY },
        calendarRef.current!,
      )
    )
      return;
    eventInfo.event.remove();
    const eventId = eventInfo.event.id;
    dispatch(removeCalendarEvent(eventId));
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
        eventDrop={handleEventChange}
        drop={handleExternalEventDrop}
        eventClick={handleEventClick}
        eventResize={handleEventChange}
        eventDragStop={handleEventDrag}
        businessHours={{ daysOfWeek: [0, 1, 2, 3, 4, 5, 6] }}
        editable
        droppable
      />
    </div>
  );
}
