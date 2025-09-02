"use client";

import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";

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
            This website is hosted on Render’s free tier. When inactive for a
            while, the server temporarily goes to sleep. It may take up to 1
            minute for everything to wake up and run again. Thank you for your
            patience 🙏
          </p>
        </div>
        <div className="flex justify-end">
          <Button onClick={close}>Continue</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
