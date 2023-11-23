"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function LoginSignUpSession() {
  const { user, accessToken } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user && accessToken) {
      router.push("/trips");
    }
  }, [user, accessToken, router]);

  const [tab, setTab] = useState<string>("login");
  return (
    <div>
      <div className="inline-flex w-full">
        <button
          type="button"
          onClick={() => setTab("login")}
          className="w-1/2 rounded-l bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setTab("signUp")}
          className="w-1/2 rounded-r bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
        >
          Sign Up
        </button>
      </div>
      <div className="mt-2">
        {tab === "login" ? (
          <div className="flex flex-col gap-2">
            <h3 className="text-center text-xl font-bold text-gray-700">
              Login
            </h3>
            <LoginForm />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <h3 className="text-center text-xl font-bold text-gray-700">
              Sign Up
            </h3>
            <SignUpForm setTab={setTab} />
          </div>
        )}
      </div>
    </div>
  );
}
