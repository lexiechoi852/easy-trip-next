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

  const [currentTab, setCurrentTab] = useState<string>("login");

  const generateClassName = (tab: string) => {
    const roundedCss = tab === "login" ? "rounded-l-lg" : "rounded-r-lg";

    let className = `w-1/2 ${roundedCss} bg-gray-200 px-4 py-2 font-bold hover:text-gray-900 hover:bg-gray-300`;
    if (currentTab === tab) {
      className = `w-1/2 ${roundedCss} px-4 py-2 font-bold text-white bg-blue-500`;
      return className;
    }
    return className;
  };

  return (
    <div>
      <div className="inline-flex w-full">
        <button
          type="button"
          onClick={() => setCurrentTab("login")}
          className={generateClassName("login")}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab("signUp")}
          className={generateClassName("signUp")}
        >
          Sign Up
        </button>
      </div>
      <div className="mt-2">
        {currentTab === "login" ? (
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
            <SignUpForm setCurrentTab={setCurrentTab} />
          </div>
        )}
      </div>
    </div>
  );
}
