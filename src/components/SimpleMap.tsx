"use client";

import React, { useMemo } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useAppSelector } from "@/store/hooks";

export default function SimpleMap() {
  const { scheduleItems } = useAppSelector((state) => state.trip);

  const libraries = useMemo(() => ["places"], []);

  const mapCenter = useMemo(() => ({ lat: 43.6532, lng: -79.3832 }), []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    [],
  );

  if (!isLoaded) {
    return (
      <div
        role="status"
        className="animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0"
      >
        <div className="flex h-[300px] w-full items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
          <svg
            className="h-10 w-full text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      options={mapOptions}
      zoom={12}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={{ height: "300px" }}
    >
      {scheduleItems.length > 0 &&
        scheduleItems.map((scheduleItem, index) => (
          <Marker
            key={scheduleItem.id}
            position={{
              lat: scheduleItem.latitude,
              lng: scheduleItem.longitude,
            }}
            label={{
              className: "font-bold",
              color: "white",
              text: (index + 1).toString(),
            }}
            icon={{
              url: "/marker.svg",
              scaledSize: new google.maps.Size(30, 40),
            }}
          />
        ))}
    </GoogleMap>
  );
}
