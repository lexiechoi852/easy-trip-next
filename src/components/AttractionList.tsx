import React from "react";
import { Attraction } from "@/types/attraction";
import AttractionCard from "./AttractionCard";

export default function AttractionList({
  attractions,
}: {
  attractions: Attraction[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {attractions.map((attraction) => (
        <AttractionCard key={attraction.id} attraction={attraction} />
      ))}
    </div>
  );
}
