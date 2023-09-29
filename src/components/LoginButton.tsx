"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout, setUser } from "@/store/userSlice";
import SignInModal from "./SignInModal";

export default function LoginButton() {
  const dispatch = useAppDispatch();

  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
        };
        dispatch(setUser(currentUser));
      } else {
        dispatch(logout());
        if (pathname === "/attractions") {
          setIsModalOpen(true);
        }
      }
    });
  }, [dispatch, pathname]);

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  if (user && !user.isAnonymous) {
    return (
      <button
        type="button"
        onClick={() => signOut(auth)}
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
