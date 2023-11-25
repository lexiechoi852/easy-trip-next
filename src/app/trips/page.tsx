import CreateTripForm from "@/components/CreateTripForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import RecentTrips from "@/components/RecentTrips";
import React from "react";

export const metadata = {
  title: "Trips",
  description: `Organize all your trip here`,
};

export default function page() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto flex flex-col flex-wrap items-center px-5 py-36 md:flex-row">
        <div className="pr-0 lg:w-3/5 lg:pr-0">
          <RecentTrips />
        </div>
        <div className="mt-10 flex w-full flex-col rounded-lg bg-gray-100 p-8 lg:w-2/6">
          <CreateTripForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}
