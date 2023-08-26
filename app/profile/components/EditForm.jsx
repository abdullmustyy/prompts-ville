"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "@components/FormItems";
import MyDropzone from "./MyDropzone";
import { FaArrowLeftLong } from "react-icons/fa6";

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

const EditForm = ({ params, intercept }) => {
  const [profileValues, setProfileValues] = useState({});
  const { replace, back } = useRouter();
  const [file, setFile] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(`/profile/api/${params.id}`);
      const data = await response.json();

      setProfileValues({
        displayName: data.displayName,
        userName: data.userName,
        image: data.image,
      });
    };

    if (params.id) getProfile();
  }, [params.id]);

  const handleChange = useCallback(async (e) => {
    const { name, value } = e.target;

    setProfileValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const uploadToCloudinary = useCallback(async () => {
    if (!file?.length) return;

    const formData = new FormData();
    file.forEach((file) => formData.append("file", file));
    formData.append("upload_preset", "promptsville");

    const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    const data = await fetch(URL, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    const { secure_url } = data;
    try {
      const response = await fetch(`/profile/api/${params.id}/edit-photo`, {
        method: "PATCH",
        body: JSON.stringify({ image: secure_url }),
      });

      if (response.ok) console.log("Image updated successfully!");
    } catch (error) {
      console.log("Error updating image: ", error);
    }
  }, [file, params.id]);

  const updateProfile = useCallback(
    async (values) => {
      await uploadToCloudinary();

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
          intercept ? back() : replace("/profile");
        }
      } catch (error) {
        alert("Something went wrong!");
        intercept ? back() : replace("/profile");
      }
    },
    [back, intercept, params.id, replace, uploadToCloudinary]
  );

  return (
    <section className="bg-white p-4 rounded-lg shadow-lg">
      <div className="main">
        <div className="gradient" />
      </div>
      <Formik
        initialValues={profileValues}
        validationSchema={editProfileSchema}
        onSubmit={updateProfile}
        enableReinitialize
      >
        {({ isSubmitting, resetForm }) => (
          <section>
            <Form className="space-y-4">
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <FaArrowLeftLong
                    onClick={() => (intercept ? back() : replace("/profile"))}
                    className="cursor-pointer"
                  />
                  <span className="text-lg font-semibold">Edit profile</span>
                </div>
                <button type="submit" className="black_btn">
                  Save
                </button>
              </div>
              <div className="relative grid w-24 h-24">
                <div className="absolute inset-0 bg-[#000] bg-opacity-40 rounded-full z-20"></div>
                <Image
                  fill
                  src={profileValues.image}
                  alt="User Image"
                  className="rounded-full z-10"
                />
                <MyDropzone
                  setFile={setFile}
                  setProfileValues={setProfileValues}
                />
              </div>
              <MyTextInput
                name="displayName"
                type="text"
                placeholder="Display name"
                value={profileValues.displayName}
                onChange={handleChange}
              />
              <MyTextInput
                name="userName"
                type="text"
                placeholder="Username"
                value={profileValues.userName}
                onChange={handleChange}
              />
            </Form>
          </section>
        )}
      </Formik>
    </section>
  );
};

export default EditForm;
