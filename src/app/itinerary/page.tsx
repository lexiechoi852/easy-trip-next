import React from "react";
import TripList from "@/components/TripList";
import Map from "@/components/Map";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "Itinerary",
  description: `Visualize Schedule for your trip`,
};

export default function page() {
  return (
    <ProtectedRoute>
      <div className="flex">
        <div className="w-1/2">
          <TripList />
        </div>
        <div className="w-1/2">
          <Map />
        </div>
      </div>
    </ProtectedRoute>
  );
}
