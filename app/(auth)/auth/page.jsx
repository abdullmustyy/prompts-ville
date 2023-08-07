"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "@components/FormItems";

const authSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address.")
    .required("Email field should not be empty."),
  password: Yup.string()
    .required("Password field should not be empty.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const authValues = {
  email: "",
  password: "",
};

const Auth = () => {
  const [pageType, setPageType] = useState("signin");
  const isSignIn = pageType === "signin";
  const isSignUp = pageType === "signup";
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleSubmit = async (values, { resetForm }) => {
    await delay(2000);
    alert(JSON.stringify(values, null, 2));
    // resetForm();
  };

  return (
    <section className="absolute w-screen h-screen left-0 top-0 flex flex-col justify-center items-center gap-6">
      <h1 className="font-satoshi font-semibold text-xl text-black tracking-wide">
        {isSignIn ? "Sign" : "Sign"}{" "}
        <span className="orange_gradient">{isSignIn ? "In" : "Up"}</span>
      </h1>
      <Formik
        initialValues={authValues}
        validationSchema={authSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, resetForm }) => (
          <Form className="lg:w-[50%] md:w-[70%] w-full md:px-0 px-6 grid gap-4">
            <MyTextInput
              name="email"
              type="email"
              placeholder="Email address"
            />
            <MyTextInput
              name="password"
              type="password"
              placeholder="Password"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-1.5 text-base font-bold bg-primary-orange rounded-full text-white disable"
            >
              {isSubmitting ? "Signing" : "Sign"} {isSignIn ? "In" : "Up"}
            </button>
            <p
              className="text-base font-semibold cursor-pointer place-self-center w-fit"
              onClick={() => {
                resetForm();
                setPageType(isSignIn ? "signup" : "signin");
              }}
            >
              {isSignIn && (
                <span>
                  Don&apos;t have an account?{" "}
                  <span className="orange_gradient font-bold">
                    Sign Up here
                  </span>
                </span>
              )}
              {isSignUp && (
                <span>
                  Already have an account?{" "}
                  <span className="orange_gradient font-bold">
                    Sign In here
                  </span>
                </span>
              )}
            </p>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Auth;
