"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/userThunk";
import { Toast } from "flowbite-react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { object, string } from "yup";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { errorMessage } = useAppSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validationSchema = object({
    email: string().required(),
    password: string().required(),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const { email, password } = values;
        dispatch(login({ email, password })).then((res) => {
          if (res.type.includes("fulfilled")) {
            router.push("/trips");
          }
        });
      }}
    >
      {({ handleChange }) => (
        <Form className="flex flex-col">
          <label className="mb-2 block font-bold text-gray-700" htmlFor="email">
            Email
            <input
              id="email"
              type="text"
              name="email"
              placeholder="Email"
              className="w-full rounded-lg font-normal"
              onChange={handleChange}
            />
          </label>
          <div className="relative w-full">
            <label
              className="mb-2 block font-bold text-gray-700"
              htmlFor="password"
            >
              Password
              <input
                id="password"
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
          <button
            type="submit"
            className="items-end rounded-lg border bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
          {errorMessage && (
            <Toast className="mt-3">
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
