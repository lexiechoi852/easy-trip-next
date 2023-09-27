"use client";

import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useFormikContext } from "formik";

interface DatePickerProp {
  startDate: string | null;
  endDate: string | null;
}

interface FormValues {
  city: string;
  startDate: string | null;
  endDate: string | null;
}

export default function DatePicker({ startDate, endDate }: DatePickerProp) {
  const { values } = useFormikContext<FormValues>();

  const [date, setDate] = useState({
    startDate,
    endDate,
  });

  const handleValueChange = (newDate: any) => {
    setDate(newDate);
    values.startDate = newDate.startDate;
    values.endDate = newDate.endDate;
  };

  return <Datepicker value={date} onChange={handleValueChange} />;
}
