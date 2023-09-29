"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import useAuth from "@/utils/useAuth";
import SignInModal from "./SignInModal";

export default function LoginButton() {
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const { handleSignIn, handleSignOut } = useAuth();

  useEffect(() => {
    if (!user && pathname === "/attractions") {
      setIsModalOpen(true);
    }
  }, [pathname, user]);

  if (user && !user.isAnonymous) {
    return (
      <button
        type="button"
        onClick={handleSignOut}
        className="text-sm font-semibold leading-6 text-gray-900 hover:font-bold hover:underline"
      >
        Log out
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleSignIn}
        className="text-sm font-semibold leading-6 text-gray-900 hover:font-bold hover:underline"
      >
        Log in
      </button>
      {isModalOpen && (
        <SignInModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}
