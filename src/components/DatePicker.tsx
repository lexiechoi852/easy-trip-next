"use client";

import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

interface DatePickerProp {
  startDate: string | null;
  endDate: string | null;
  onValueChange: (date: { startDate: string; endDate: string }) => void;
}

export default function DatePicker({
  startDate,
  endDate,
  onValueChange,
}: DatePickerProp) {
  const [date, setDate] = useState({
    startDate,
    endDate,
  });

  const handleValueChange = (newValue: any) => {
    setDate(newValue);
    onValueChange(newValue);
  };

  return <Datepicker value={date} onChange={handleValueChange} />;
}
