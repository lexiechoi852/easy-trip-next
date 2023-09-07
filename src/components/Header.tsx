import React from "react";
import HeaderLink from "./HeaderLink";

export default function Header() {
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center p-6"
        aria-label="Global"
      >
        <div className="flex">
          <a href="/" className="m-1.5 flex justify-center p-1.5">
            <h1 className="mr-2 text-2xl font-bold text-cyan-700">Easy Trip</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-10 w-10"
            >
              <path d="M23,9.32a1.06,1.06,0,0,0-.1-.76,4.93,4.93,0,0,0-6.75-1.8L14,8,9,5.65a1,1,0,0,0-.92,0l-3,1.73a1,1,0,0,0-.5.84,1,1,0,0,0,.46.87l3.3,2.08-1.74,1-4.78.58a1,1,0,0,0-.53,1.75l3.54,3.06a3,3,0,0,0,3.55.44L22.5,9.93A1,1,0,0,0,23,9.32Zm-15.53,7a1,1,0,0,1-1.2-.18L4.37,14.51l2.73-.33a1,1,0,0,0,.38-.13l3.36-1.93a1,1,0,0,0,.5-.85,1,1,0,0,0-.47-.86L7.57,8.32l1.1-.63,5,2.32a1,1,0,0,0,.92,0l2.56-1.48a3,3,0,0,1,3.36.29Z" />
            </svg>
          </a>
        </div>
        <div className="ml-auto flex max-w-[300px] flex-1 justify-between">
          <HeaderLink name="Attractions" href="/attractions" />
          <HeaderLink name="Calendar" href="/calendar" />
          <HeaderLink name="Schedule" href="/schedule" />
        </div>
      </nav>
    </header>
  );
}