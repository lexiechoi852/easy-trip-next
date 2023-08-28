"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderLinkProps {
  name: string;
  href: string;
}

export default function HeaderLink({ name, href }: HeaderLinkProps) {
  const pathname = usePathname();

  const generateClassName = () => {
    let className =
      "text-sm font-semibold leading-6 text-gray-900 hover:font-bold hover:text-gray-900 hover:underline";
    if (pathname === href) {
      className =
        "text-sm font-bold leading-6 text-cyan-700 hover:font-bold hover:text-cyan-700 hover:underline";
      return className;
    }
    return className;
  };

  return (
    <Link href={href} className={generateClassName()}>
      {name}
    </Link>
  );
}
