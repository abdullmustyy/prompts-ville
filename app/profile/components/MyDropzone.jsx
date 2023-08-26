"use client";

import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCamera } from "react-icons/fa6";

const MyDropzone = ({ params, setProfileValues }) => {
  const [file, setFile] = useState([]);

  // useEffect(() => {
  //   const uploadToCloudinary = async () => {
  //     if (!file?.length) return;

  //     const formData = new FormData();
  //     file.forEach((file) => formData.append("file", file));
  //     formData.append("upload_preset", "promptsville");

  //     const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  //     const data = await fetch(URL, {
  //       method: "POST",
  //       body: formData,
  //     }).then((res) => res.json());

  //     const { secure_url } = data;
  //     try {
  //       const response = await fetch(`/profile/api/${params.id}/edit-photo`, {
  //         method: "PATCH",
  //         body: JSON.stringify({ image: secure_url }),
  //       });

  //       if (response.ok) console.log("Image updated successfully!");
  //     } catch (error) {
  //       console.log("Error updating image: ", error);
  //     }
  //   };

  //   uploadToCloudinary();
  // }, [file, params.id]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length) {
        acceptedFiles.forEach((file) => {
          const preview = URL.createObjectURL(file);

          setProfileValues((prev) => ({ ...prev, image: preview }));
        });
      }
    },
    [setProfileValues]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  return (
    <section className="absolute place-self-center z-30">
      <div {...getRootProps({ className: "w-fit cursor-pointer" })}>
        <input {...getInputProps()} />
        <div className="bg-[#0f1419bf] hover:bg-[#272c30bf] p-2 rounded-full transition-all">
          <FaCamera className="text-white text-xl" />
        </div>
      </div>
    </section>
  );
};

export default MyDropzone;
