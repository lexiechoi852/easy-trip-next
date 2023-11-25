"use client";

import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, accessToken } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user || !accessToken) {
      router.push("/");
    }
  }, [user, accessToken, router]);

  return <div>{children}</div>;
}
