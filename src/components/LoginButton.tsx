"use client";

import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout, setUser } from "@/store/userSlice";
import SignInModal from "./SignInModal";

export default function LoginButton() {
  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (session && session.user) {
      dispatch(setUser(session.user));
    }
    if (!session) {
      dispatch(logout());
    }
  }, [session, dispatch]);

  useEffect(() => {
    if (!user && pathname === "/attractions") {
      setIsModalOpen(true);
    }
  }, [user, pathname]);

  if (session && session.user) {
    return (
      <button
        type="button"
        onClick={() => signOut()}
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
        onClick={() => signIn()}
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
