"use client";

import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { Attraction } from "@/types/attraction";
import AddAttractionButton from "./AddAttractionButton";

interface ReadMoreProps {
  attraction: Attraction;
}

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
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500">
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
