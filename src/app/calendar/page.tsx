import React from "react";
import Calendar from "@/components/Calendar";
import ScheduleItemContainer from "@/components/ScheduleItemContainer";

export const metadata = {
  title: "Calendar",
  description: `Plan your next trip here`,
};

export default function page() {
  return (
    <div className="flex">
      <ScheduleItemContainer />
      <Calendar />
    </div>
  );
}
