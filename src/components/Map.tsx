"use client";

import React, { useMemo } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

export default function Map() {
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
      scrollwheel: false,
    }),
    [],
  );

  if (!isLoaded) {
    return <div style={{ height: "300px" }}>Loading...</div>;
  }

  return (
    <GoogleMap
      options={mapOptions}
      zoom={12}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={{ height: "300px" }}
      onLoad={() => console.log("Map Component Loaded...")}
    />
  );
}
