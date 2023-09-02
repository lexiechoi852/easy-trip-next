import React from "react";
import Image from "next/image";
import { Attraction } from "@/types/attraction";
import ReadMore from "./ReadMore";
import AddAttractionButton from "./AddAttractionButton";

interface AttractionCardProps {
  attraction: Attraction;
}

export default function AttractionCard({ attraction }: AttractionCardProps) {
  return (
    <section className="mx-auto flex max-w-sm flex-col rounded-lg border border-gray-300 p-4 shadow-lg">
      <div className="group relative mb-auto">
        <h2 className="text-2xl font-semibold text-gray-800">
          {attraction.name}
        </h2>
        <Image
          className="mx-auto h-52 w-full rounded object-cover"
          src={attraction.image}
          alt={attraction.name}
          width={250}
          height={250}
        />
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {attraction.description}
        </p>
      </div>
      <div className="mt-2 flex justify-end">
        <AddAttractionButton attraction={attraction} />
        <ReadMore attraction={attraction} />
      </div>
    </section>
  );
}
