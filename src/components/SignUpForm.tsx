"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signUp } from "@/store/userThunk";
import { Toast } from "flowbite-react";
import { Form, Formik } from "formik";
import React, { Dispatch, SetStateAction, useState } from "react";
import { object, ref, string } from "yup";

interface SignUpFormProps {
  setTab: Dispatch<SetStateAction<string>>;
}
export default function SignUpForm({ setTab }: SignUpFormProps) {
  const dispatch = useAppDispatch();

  const { errorMessage } = useAppSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validationSchema = object({
    name: string().required(),
    email: string().required(),
    password: string().required(),
    confirmPassword: string().oneOf([ref("password")], "Passwords must match"),
  });
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const { name, email, password } = values;
        dispatch(signUp({ name, email, password })).then((res) => {
          if (res.type.includes("fulfilled")) {
            setTab("login");
            resetForm();
          }
        });
      }}
    >
      {({ errors, handleChange, resetForm }) => (
        <Form className="flex flex-col gap-2">
          <label className="mb-2 block font-bold text-gray-700" htmlFor="email">
            Email
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="w-full rounded-lg font-normal"
              onChange={handleChange}
            />
          </label>
          <label className="mb-2 block font-bold text-gray-700" htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full rounded-lg font-normal"
              onChange={handleChange}
            />
          </label>
          <div className="relative w-full">
            <label
              className="mb-2 block font-bold text-gray-700"
              htmlFor="Password"
            >
              Password
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full rounded-lg font-normal"
                onChange={handleChange}
              />
            </label>
            <button
              className="absolute end-2.5 top-7 rounded-lg bg-gray-100 p-1 font-semibold hover:bg-gray-200"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              Show
            </button>
          </div>
          <div className="relative w-full">
            <label
              className="mb-2 block font-bold text-gray-700"
              htmlFor="Password"
            >
              Confirm Password
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password Again"
                className="w-full rounded-lg font-normal"
                onChange={handleChange}
              />
            </label>
            <button
              className="absolute end-2.5 top-7 rounded-lg bg-gray-100 p-1 font-semibold hover:bg-gray-200"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              Show
            </button>
            {errors.confirmPassword ? (
              <span className="text-xs italic text-red-500">
                {errors.confirmPassword}
              </span>
            ) : null}
          </div>
          <div className="flex justify-end gap-3">
            <button
              className="rounded-lg border bg-gray-300 px-4 py-2 font-bold hover:bg-gray-500 hover:text-white"
              type="button"
              onClick={() => resetForm()}
            >
              Reset
            </button>
            <button
              className="rounded-lg border bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          {errorMessage && (
            <Toast>
              <div className="ml-3 text-sm font-semibold text-red-600">
                {errorMessage}
              </div>
              <Toast.Toggle />
            </Toast>
          )}
        </Form>
      )}
    </Formik>
  );
}
