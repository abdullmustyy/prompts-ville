"use client";

import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { getProviders, signIn } from "next-auth/react";
import { MyTextInput } from "@components/FormItems";
import Image from "next/image";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address.")
    .required("Email field is required."),
  password: Yup.string()
    .required("Password field is required.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const signUpSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Username field is required.")
    .min(5, "Username is too short - should be ${min} chars minimum.")
    .lowercase("Note: Username wiil be converted to lowercase.")
    .matches(/[a-zA-Z]/, "Username can only contain Latin letters."),
  displayName: Yup.string()
    .required("Display name field is required.")
    .min(2, "Display name is too short - should be ${min} chars minimum."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Email field is required."),
  password: Yup.string()
    .required("Password field is required.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  confirmPassword: Yup.string()
    .required("Password field is required.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const signInValues = {
  email: "",
  password: "",
};

const signUpValues = {
  userName: "",
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [providers, setProviders] = useState(null);
  const [pageType, setPageType] = useState("signin");
  const isSignIn = pageType === "signin";
  const isSignUp = pageType === "signup";

  useEffect(() => {
    const setProvidersList = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvidersList();
  }, []);

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
        initialValues={isSignIn ? signInValues : signUpValues}
        validationSchema={isSignIn ? signInSchema : signUpSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, resetForm }) => (
          <section className="lg:w-[50%] md:w-[70%] w-full md:px-0 px-6 grid gap-4">
            <Form className="grid gap-4">
              {isSignUp && (
                <>
                  <MyTextInput
                    name="userName"
                    type="text"
                    placeholder="Username"
                  />
                  <MyTextInput
                    name="displayName"
                    type="text"
                    placeholder="Display name"
                  />
                </>
              )}
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
              {isSignUp && (
                <MyTextInput
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                />
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-1.5 text-base font-bold bg-primary-orange rounded-full text-white disable"
              >
                {isSubmitting ? "Signing" : "Sign"} {isSignIn ? "In" : "Up"}
              </button>
            </Form>
            <div className="flex-center gap-4 w-fit place-self-center">
              <hr className="w-[15rem] h-[1px] border-none" />
              <span className="test-sm font-semibold">or</span>
              <hr className="w-[15rem] h-[1px] border-none" />
            </div>
            <div>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="google_btn"
                  >
                    <Image
                      src="/assets/icons/google.svg"
                      width={20}
                      height={20}
                      alt="Google logo"
                      className="rounded-full"
                    />
                    <span className="mx-auto">Continue with Google</span>
                  </button>
                ))}
            </div>
            <p
              className="text-base font-semibold cursor-pointer w-fit place-self-center"
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
          </section>
        )}
      </Formik>
    </section>
  );
};

export default Auth;
