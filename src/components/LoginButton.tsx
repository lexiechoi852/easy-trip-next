"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  console.log(session, "session");

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
