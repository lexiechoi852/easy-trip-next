"use client";

import React from "react";
import { useFormik } from "formik";
import { object, date, string } from "yup";
import { useAppDispatch } from "@/store/hooks";
import { addTrip } from "@/store/tripSlice";
import DatePicker from "./DatePicker";

interface DatePickerValue {
  startDate: string;
  endDate: string;
}

interface FormValues {
  city: string;
  startDate: string | null;
  endDate: string | null;
}

export default function CreateTripForm() {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      city: "toronto",
      startDate: null,
      endDate: null,
    } as FormValues,
    validationSchema: object({
      city: string().required(),
      startDate: date().required("Choose a date using date picker"),
      endDate: date().required("Choose a date using date picker"),
    }),
    onSubmit: (formData) => {
      const newTrip = {
        city: formData.city,
        startDate: formData.startDate!,
        endDate: formData.endDate!,
      };
      dispatch(addTrip(newTrip));
      formik.setSubmitting(false);
    },
  });

  const handleDatePickerValue = (date: DatePickerValue) => {
    formik.values.startDate = date.startDate;
    formik.values.endDate = date.endDate;
  };

  return (
    <form className="mb-4 w-full px-8 pb-8 pt-6" onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <span>Choose a city</span>
        <select
          id="city"
          name="city"
          onChange={formik.handleChange}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <option value="toronto">Toronto</option>
        </select>
        {formik.errors.city ? (
          <span className="text-xs italic text-red-500">
            {formik.errors.city}
          </span>
        ) : null}
      </div>
      <div className="mb-6">
        <span>When will your trip be?</span>
        <DatePicker
          onValueChange={handleDatePickerValue}
          startDate={formik.values.startDate}
          endDate={formik.values.endDate}
        />
        {formik.errors.startDate || formik.errors.endDate ? (
          <span className="text-xs italic text-red-500">
            {formik.errors.startDate}
          </span>
        ) : null}
      </div>
      <div className="flex items-center justify-between">
        {formik.isSubmitting || formik.isValidating ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <button
            className="flex justify-center rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-800 focus:outline-none"
            type="submit"
          >
            Start planning
          </button>
        )}
      </div>
    </form>
  );
}