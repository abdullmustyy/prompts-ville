"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "@components/FormItems";

const editProfileSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Username field is required.")
    .min(5, "Username is too short - should be ${min} chars minimum.")
    .lowercase("Note: Username wiil be converted to lowercase.")
    .matches(/[a-zA-Z]/, "Username can only contain Latin letters."),
  displayName: Yup.string()
    .required("Display name field is required.")
    .min(2, "Display name is too short - should be ${min} chars minimum."),
});

const EditProfile = ({ params }) => {
  const [profile, setProfile] = useState({});
  const [profileValues, setProfileValues] = useState({
    displayName: profile.displayName,
    userName: profile.userName,
  });
  const { replace } = useRouter();

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(`/profile/api/${params.id}`);
      const data = await response.json();

      setProfile(data);
    };

    if (params.id) getProfile();
  }, [params.id]);

  const handleChange = useCallback(async (e) => {
    const { name, value } = e.target;

    setProfileValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const updateProfile = useCallback(
    async (values) => {
      try {
        const response = await fetch(`/profile/api/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.status === 200) {
          alert("Profile updated successfully!");
          replace("/profile");
        }
      } catch (error) {
        alert("Something went wrong!");
        replace("/profile");
      }
    },
    [params.id, replace]
  );

  return (
    <section>
      <Formik
        initialValues={profileValues}
        validationSchema={editProfileSchema}
        onSubmit={updateProfile}
        enableReinitialize
      >
        {({ initialValues, isSubmitting, resetForm, values }) => (
          <section>
            {console.log("Values", values)}
            {console.log("InitialValues", initialValues)}
            <Form>
              <button type="submit" onClick={updateProfile}>
                Save
              </button>
              <MyTextInput
                name="displayName"
                type="text"
                placeholder="Display name"
                value={initialValues.displayName}
                onChange={handleChange}
              />
              <MyTextInput
                name="userName"
                type="text"
                placeholder="Username"
                value={initialValues.userName}
                onChange={handleChange}
              />
            </Form>
          </section>
        )}
      </Formik>
    </section>
  );
};

export default EditProfile;
