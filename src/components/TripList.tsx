"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { format, isSameDay } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { sortTripEvents } from "@/store/tripSlice";
import { CalendarEvent } from "@/types/trip";
import { getDirection } from "@/store/tripThunk";
import TripItem from "./TripItem";
import CarIcon from "./icons/CarIcon";

export default function TripList() {
  const dispatch = useAppDispatch();

  const { sortedTripEvents, tripDirections } = useAppSelector(
    (state) => state.trip,
  );

  useEffect(() => {
    dispatch(sortTripEvents());
  }, [dispatch]);

  useEffect(() => {
    for (let i = 1; i < sortedTripEvents.length; i++) {
      const previousIndex = i - 1;
      const previousEvent = sortedTripEvents[previousIndex];

      const directionInfo = {
        origin: `${previousEvent.latitude},${previousEvent.longitude}`,
        destination: `${sortedTripEvents[i].latitude},${sortedTripEvents[i].longitude}`,
        mode: google.maps.TravelMode.DRIVING,
      };
      dispatch(getDirection(directionInfo));
    }
  }, [sortedTripEvents, dispatch]);

  const renderDate = (sortedTripEvent: CalendarEvent, index: number) => {
    const previousIndex = index === 0 ? index : index - 1;
    const sameDay = isSameDay(
      new Date(sortedTripEvent.start),
      new Date(sortedTripEvents[previousIndex].start),
    );
    if (!sameDay || index === 0) {
      return (
        <div className="flex justify-center">
          <div className="mr-2 rounded-full bg-gray-100 px-4 py-2  text-sm font-medium text-gray-800">
            {format(new Date(sortedTripEvent.start), "PPPP")}
          </div>
        </div>
      );
    }
    return <div />;
  };

  const renderTravelTime = (index: number) => {
    if (index === 0) return <div />;

    return (
      <div className="relative flex items-center justify-center">
        <button type="button" className="flex items-center justify-center">
          <CarIcon />
          <div className="mx-2 font-semibold text-gray-500">
            {tripDirections[index - 1]?.routes[0]?.legs[0]?.duration?.text}
          </div>
        </button>
        <div className="absolute">
          <ul />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {sortedTripEvents.length > 0 ? (
        <>
          {sortedTripEvents.map((calendarEvent, index) => (
            <div className="flex flex-col gap-2" key={calendarEvent.id}>
              {renderDate(calendarEvent, index)}
              {renderTravelTime(index)}
              <TripItem calendarEvent={calendarEvent} index={index} />
            </div>
          ))}
        </>
      ) : (
        <div className="flex w-full flex-col items-center rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100">
          <div>There is nothing in the trip</div>
          <div className="flex">
            <Link
              href="/attractions"
              className="m-2 flex rounded-lg bg-sky-700 p-2 font-bold hover:bg-sky-500"
            >
              <svg
                className="mr-1 h-6 w-6 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>
              <div className="text-white">Add Attraction</div>
            </Link>
            <Link
              href="/calendar"
              className="m-2 flex rounded-lg bg-sky-700 p-2 font-bold hover:bg-sky-500"
            >
              <svg
                className="mr-2 h-6 w-6 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z"
                />
              </svg>
              <div className="text-white">Plan Attraction</div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
