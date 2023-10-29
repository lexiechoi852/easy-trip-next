"use client";

import React from "react";
import Image from "next/image";
import { Modal } from "flowbite-react";
import useAuth from "@/utils/useAuth";

interface SignInModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export default function SignInModal({
  isModalOpen,
  setIsModalOpen,
}: SignInModalProps) {
  const { handleSignInAnonymously, handleSignIn } = useAuth();

  const login = async () => {
    await handleSignIn();
    setIsModalOpen(false);
  };

  const loginAnonymously = async () => {
    await handleSignInAnonymously();
    setIsModalOpen(false);
  };

  return (
    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="m-5 flex justify-between">
        <h5 className="text-lg font-bold text-gray-600">
          Sign in to save your trip
        </h5>
      </div>
      <Modal.Body className="mt-2 flex max-w-2xl flex-col px-4 py-0">
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-lg border p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          onClick={login}
        >
          <Image src="/google-icon.webp" width={36} height={36} alt="Google" />
          <div className="ml-1 font-bold">Sign in with Google</div>
        </button>
        <div className="flex w-full justify-center">
          <button
            type="button"
            className="my-4 font-bold text-blue-500 hover:text-blue-700"
            onClick={loginAnonymously}
          >
            Skip and sign in later
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
