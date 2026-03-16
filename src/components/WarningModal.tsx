"use client";

import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";

export default function WarningModal() {
  const [openModal, setOpenModal] = useState(true);
  const close = () => {
    setOpenModal(false);
  };
  return (
    <Modal show={openModal} onClose={close} position="center">
      <Modal.Header>Friendly Reminder</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            This website is hosted on Google Cloud Run&apos;s free tier. When
            inactive for a while, your container may scale down to zero, causing
            a brief delay on the first request while it starts up again. Thank
            you for your patience 🙏
          </p>
        </div>
        <div className="flex justify-end">
          <Button onClick={close}>Continue</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
