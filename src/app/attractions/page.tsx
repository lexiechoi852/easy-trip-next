import React from "react";
import SimpleMap from "@/components/SimpleMap";
import AttractionList from "@/components/AttractionList";
import SelectedContainer from "@/components/SelectedContainer";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "Attractions",
  description: `Explore attractions in Toronto`,
};

export default async function Page() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col">
        <SimpleMap />
        <div className="mx-auto mb-8 mt-4 grid grid-cols-1 gap-2 sm:grid-cols-4">
          <div className="hidden sm:block">
            <SelectedContainer />
          </div>
          <div className="col-span-3">
            <AttractionList />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
