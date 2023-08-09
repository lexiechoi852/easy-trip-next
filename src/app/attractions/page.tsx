import React from "react";
import AttractionList from "@/components/AttractionList";
import attractions from "@/assets/attractions";

export const metadata = {
  title: "Attractions",
  description: `Explore attractions in Toronto`,
};

export default async function Page() {
  return (
    <div>
      <AttractionList attractions={attractions} />
    </div>
  );
}
