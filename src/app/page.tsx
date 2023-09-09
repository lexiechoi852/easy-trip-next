import React from "react";
import CreateTripForm from "@/components/CreateTripForm";

export const metadata = {
  title: "New Trip",
  description: `Start planning your trip`,
};

export default function Home() {
  return (
    <div className="container mx-auto flex flex-wrap items-center px-5 py-36">
      <div className="pr-0 md:w-1/2 md:pr-16 lg:w-3/5 lg:pr-0">
        <h1 className="text-4xl font-medium text-gray-900">
          The new way to plan your next trip
        </h1>
        <p className="mt-4 leading-relaxed">
          Create a fully customized day-by-day itinerary for free
        </p>
      </div>
      <div className="mt-10 flex w-full flex-col rounded-lg bg-gray-100 p-8 md:ml-auto md:mt-0 md:w-1/2 lg:w-2/6">
        <CreateTripForm />
      </div>
    </div>
  );
}
