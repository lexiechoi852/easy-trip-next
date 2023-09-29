"use client";

import React from "react";
import Image from "next/image";
import { Modal } from "flowbite-react";
import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase/config";

interface SignInModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export default function SignInModal({
  isModalOpen,
  setIsModalOpen,
}: SignInModalProps) {
  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Header className="border-0 p-4">
        Sign in to save your trip
      </Modal.Header>
      <Modal.Body className="flex max-w-2xl flex-col px-4 py-0">
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-lg border p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          onClick={handleSignIn}
        >
          <Image src="/google-icon.webp" width={36} height={36} alt="Google" />
          <div className="ml-1 font-bold">Sign in with Google</div>
        </button>
        <div className="flex w-full justify-center">
          <button
            type="button"
            className="my-4 font-bold text-blue-500 hover:text-blue-700"
            onClick={() => signInAnonymously(auth)}
          >
            Skip and sign in later
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
