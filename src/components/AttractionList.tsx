"use client";

import React from "react";
import { useAppSelector } from "@/store/hooks";
import AttractionCard from "./AttractionCard";

export default function AttractionList() {
  const { attractions } = useAppSelector((state) => state.attraction);

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {attractions.length > 0 &&
        attractions.map((attraction) => (
          <AttractionCard key={attraction.id} attraction={attraction} />
        ))}
    </div>
  );
}
