import React from "react";
import attractions from "@/assets/attractions";
import SimpleMap from "@/components/SimpleMap";
import AttractionList from "@/components/AttractionList";
import SelectedContainer from "@/components/SelectedContainer";

export const metadata = {
  title: "Attractions",
  description: `Explore attractions in Toronto`,
};

export default async function Page() {
  return (
    <div className="flex flex-col">
      <SimpleMap />
      <div className=" mx-auto mb-8 mt-4 flex">
        <SelectedContainer />
        <AttractionList attractions={attractions} />
      </div>
    </div>
  );
}
