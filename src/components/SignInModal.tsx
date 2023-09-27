"use client";

import React from "react";
import { Modal } from "flowbite-react";

interface SignInModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export default function SignInModal({
  isModalOpen,
  setIsModalOpen,
}: SignInModalProps) {
  return (
    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Header className="p-2">Sign up to save your trip</Modal.Header>
      <Modal.Body className="max-w-2xl p-2">
        <div>Sign in with Google</div>
        <div>Sign in as anonymous user</div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end p-2">
        Skip and sign up later
      </Modal.Footer>
    </Modal>
  );
}
