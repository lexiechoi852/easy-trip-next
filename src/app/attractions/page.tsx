import React from "react";
import attractions from "@/assets/attractions";
import AttractionList from "@/components/AttractionList";
import SelectedContainer from "@/components/SelectedContainer";

export const metadata = {
  title: "Attractions",
  description: `Explore attractions in Toronto`,
};

export default async function Page() {
  return (
    <div className="flex flex-col">
      <div className=" mx-auto mt-4 flex overflow-scroll">
        <SelectedContainer />
        <AttractionList attractions={attractions} />
      </div>
    </div>
  );
}
