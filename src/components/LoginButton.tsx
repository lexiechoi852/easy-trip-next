"use client";

import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useAppDispatch } from "@/store/hooks";
import { logout, setUser } from "@/store/userSlice";

export default function LoginButton() {
  const dispatch = useAppDispatch();

  const { data: session } = useSession();
  useEffect(() => {
    if (session && session.user) {
      dispatch(setUser(session.user));
    }
    if (!session) {
      dispatch(logout());
    }
  }, [session, dispatch]);

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
    <button
      type="button"
      onClick={() => signIn()}
      className="text-sm font-semibold leading-6 text-gray-900 hover:font-bold hover:underline"
    >
      Log in
    </button>
  );
}
