import React from "react";
import LoginSignUpSession from "@/components/LoginSignUpSession";
import MobileModal from "@/components/MobileModal";

export const metadata = {
  title: "Easy Trip",
  description: `Start planning your trip`,
};

export default function Home() {
  return (
    <div className="container mx-auto flex flex-wrap items-center px-5 py-36 md:h-full">
      <div className="flex h-full flex-col justify-center pr-0 md:w-1/2 md:pr-16 lg:w-3/5 lg:pr-0">
        <h2 className="text-4xl font-medium text-gray-900">
          The new way to plan your next trip
        </h2>
        <p className="mt-4 leading-relaxed text-gray-900">
          Create a fully customized day-by-day itinerary for free
        </p>
      </div>
      <div className="mt-10 flex w-full flex-col rounded-lg bg-gray-100 p-8 md:ml-auto md:mt-0 md:w-1/2 lg:w-2/6">
        <LoginSignUpSession />
      </div>
      <MobileModal />
    </div>
  );
}
