"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { Trip } from "@/types/trip";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentTrip } from "@/store/tripSlice";
import { getAllTrips } from "@/store/tripThunk";
import getAllAttractions from "@/store/attractionThunk";

export default function RecentTrips() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user } = useAppSelector((state) => state.user);
  const { trips } = useAppSelector((state) => state.trip);

  useEffect(() => {
    if (user) {
      dispatch(getAllTrips(user.id));
    }
    dispatch(getAllAttractions());
  }, [dispatch, user]);

  const selectTrip = (trip: Trip) => {
    dispatch(setCurrentTrip(trip));
    router.push("/attractions");
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-4xl font-medium text-gray-900">Recent Trips</h2>
      <div className="mx-auto flex flex-wrap justify-center gap-4 lg:justify-start">
        {trips.length > 0 ? (
          trips.map((trip) => (
            <button
              type="button"
              key={trip.id.toString()}
              className="group flex max-w-md flex-col gap-2 md:max-w-xs lg:max-w-[250px] xl:max-w-xs"
              onClick={() => selectTrip(trip)}
            >
              <div className="h-full w-full overflow-hidden rounded-lg">
                <Image
                  src="/toronto.jpeg"
                  width={450}
                  height={450}
                  className="transition-transform group-hover:scale-110"
                  alt="Picture of Toronto"
                />
              </div>
              <div className="flex items-center text-gray-700">
                <div className="text-lg font-bold">Trip to Toronto</div>
                <div className="ml-auto flex text-sm">
                  <div>{format(new Date(trip.startDate), "dd MMM")}</div>
                  <div className="mx-1">-</div>
                  <div>{format(new Date(trip.endDate), "dd MMM")}</div>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="mt-4 leading-relaxed text-gray-900">
            You haven’t created anything yet. Plan a new trip in the right
            section.
          </div>
        )}
      </div>
    </div>
  );
}
