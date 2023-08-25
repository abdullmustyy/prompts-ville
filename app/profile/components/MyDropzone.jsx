"use client";

import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const MyDropzone = ({ params }) => {
  const [file, setFile] = useState([]);

  useEffect(() => {
    const uploadToCloudinary = async () => {
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
    };

    uploadToCloudinary();
  }, [file, params.id]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      acceptedFiles.forEach((file) => {
        setFile([Object.assign(file, { preview: URL.createObjectURL(file) })]);
      });
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  return (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        )}
      </div>
      <ul>
        {file.map((file) => (
          <li key={file.name}>
            <Image
              src={file.preview}
              alt=""
              width={100}
              height={100}
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MyDropzone;
