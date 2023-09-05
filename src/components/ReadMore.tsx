"use client";

import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { Attraction } from "@/types/attraction";
import AddAttractionButton from "./AddAttractionButton";

interface ReadMoreProps {
  attraction: Attraction;
}

const dayOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ReadMore({ attraction }: ReadMoreProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="rounded-lg border p-2 text-gray-900 hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        Read More
      </button>
      <Modal dismissible show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header className="p-2">{attraction.name}</Modal.Header>
        <Modal.Body className="max-w-2xl p-2">
          <div>
            <div>
              <span className="mr-2 font-bold text-gray-600">Address:</span>
              <span className="text-gray-500">{attraction.address}</span>
            </div>
            <div>
              <span className="mr-2 font-bold text-gray-600">Website:</span>
              <a
                href={attraction.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {attraction.url}
              </a>
            </div>
            <div>
              <div className="font-bold text-gray-500">Opening Hours</div>
              <table>
                <tbody>
                  {attraction.openingHours.map((time, index) => (
                    <tr key={time.dayOfWeek}>
                      <td className="mr-2 min-w-[120px] font-semibold text-gray-600">
                        {dayOfWeek[index]}
                      </td>
                      <td className="text-gray-500">
                        <span>{time.openTime}</span>
                        {time.openTime && time.closeTime ? (
                          <span>-</span>
                        ) : (
                          <span>Closed</span>
                        )}
                        <span>{time.closeTime}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              {attraction.description}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end p-2">
          <AddAttractionButton attraction={attraction} />
          <button
            type="button"
            className="rounded-lg border p-2 text-gray-900 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
