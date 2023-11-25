"use client";

import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import useTrip from "@/utils/useTrip";
import dayjs from "dayjs";
import {
  addTripItem,
  removeScheduleItem,
  removeTripItem,
  updateTripItem,
} from "@/store/tripThunk";

export default function Calendar() {
  const dispatch = useAppDispatch();

  const { addTrip } = useTrip();

  const { attractions } = useAppSelector((state) => state.attraction);
  const { scheduleItems, calendarEvents, currentTrip } = useAppSelector(
    (state) => state.trip,
  );

  useEffect(() => {
    if (!currentTrip) {
      addTrip();
    }
  }, [dispatch, currentTrip, addTrip]);

  const calendarRef = useRef(null);

  const handleEventChange = (eventInfo: any) => {
    const newEventInfo = {
      id: eventInfo.oldEvent.id,
      start: eventInfo.event.start.toISOString(),
      end: eventInfo.event.end.toISOString(),
    };
    dispatch(updateTripItem(newEventInfo));
  };

  const handleExternalEventDrop = (dropInfo: any) => {
    const attraction = attractions.find(
      (attraction) => attraction.name === dropInfo.draggedEl.title,
    );

    if (currentTrip && attraction) {
      const scheduleItem = scheduleItems.find(
        (scheduleItem) => scheduleItem.attractionId === attraction.id,
      );

      const newEvent = {
        overlap: false,
        start: dropInfo.date.toISOString(),
        end: dayjs(new Date(dropInfo.date)).add(2, "hour").toISOString(),
        attractionId: attraction.id,
        tripId: currentTrip.id,
      };
      dispatch(addTripItem(newEvent));
      if (scheduleItem) {
        dispatch(removeScheduleItem(scheduleItem.id));
      }
    }
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
    dispatch(removeTripItem(eventId));
  };

  return (
    <div className="h-full w-full rounded-lg border p-2">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        ref={calendarRef}
        eventDurationEditable
        initialView="timeGridWeek"
        initialDate={currentTrip ? currentTrip.startDate : new Date()}
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
