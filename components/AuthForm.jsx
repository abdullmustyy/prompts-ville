"use client";

import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "@components/FormItems";
import { FaCircleExclamation } from "react-icons/fa6";

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
    .label("Confirm password")
    .required("Confirm your password.")
    .oneOf([Yup.ref("password")], "Passwords do not match."),
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

const AuthForm = () => {
  const [providers, setProviders] = useState(null);
  const [googleProvider, setGoogleProvider] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const [error, setError] = useState(null);
  const [pageType, setPageType] = useState("signin");

  const { get } = useSearchParams();
  const callbackUrl = get("callbackUrl");
  const { replace } = useRouter();

  useEffect(() => {
    const setProvidersList = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setProvidersList();
  }, []);

  useEffect(() => {
    if (providers) {
      setGoogleProvider(providers.google);
      setCredentials(providers.credentials);
    }
  }, [providers]);

  const isSignIn = pageType === "signin";
  const isSignUp = pageType === "signup";

  const logIn = async ({ email, password }, resetForm) => {
    try {
      const response = await signIn(credentials.id, {
        email,
        password,
        redirect: false,
        callbackUrl: callbackUrl || "/profile",
      });

      if (response.error) {
        setError("Invalid credentials.");
        return;
      }

      resetForm();
      replace("response.url");
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (
    { userName, displayName, email, password },
    resetForm,
    setSubmitting
  ) => {
    setSubmitting(true);
    try {
      const useExistRes = await fetch("/api/auth/user-exists", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      const { user } = await useExistRes.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          userName,
          displayName,
          email,
          password,
        }),
      });

      if (response.ok) {
        setSubmitting(false);
        resetForm();
        setPageType("signin");
      } else {
        console.log("Something went wrong.");
        console.log(response);
      }
    } catch (error) {
      console.log("Error during registeration:", error);
    }
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    isSignIn
      ? await logIn(values, resetForm)
      : await signUp(values, resetForm, setSubmitting);
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
                onClick={() => setError(null)}
                className="px-5 py-1.5 text-base font-bold bg-primary-orange rounded-full text-white disable"
              >
                {isSubmitting ? "Signing" : "Sign"} {isSignIn ? "In" : "Up"}
              </button>
              {error && (
                <div className="text-red-600 flex items-center gap-2">
                  <FaCircleExclamation />
                  <h3 className="text-base textcenter text-red-600 font-semibold">
                    {error}
                  </h3>
                </div>
              )}
            </Form>
            <div className="flex-center gap-4 w-fit place-self-center">
              <hr className="md:w-[15rem] w-[10rem] h-[1px] border-none" />
              <span className="test-sm font-semibold">or</span>
              <hr className="md:w-[15rem] w-[10rem] h-[1px] border-none" />
            </div>
            <div>
              {googleProvider && (
                <button
                  type="button"
                  key={googleProvider.name}
                  onClick={() => {
                    signIn(googleProvider.id, {
                      callbackUrl: callbackUrl || "/profile",
                    });
                  }}
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
              )}
            </div>
            <p
              className="text-base font-semibold cursor-pointer w-fit place-self-center"
              onClick={() => {
                resetForm();
                setError(null);
                setPageType(isSignIn ? "signup" : "signin");
              }}
            >
              {isSignIn && (
                <span className="group">
                  Don&apos;t have an account?{" "}
                  <span className="orange_gradient font-bold group-hover:text-primary-orange group-hover:underline underline-offset-2">
                    Sign Up here
                  </span>
                </span>
              )}
              {isSignUp && (
                <span className="group">
                  Already have an account?{" "}
                  <span className="orange_gradient font-bold group-hover:text-primary-orange group-hover:underline underline-offset-2">
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

export default AuthForm;
