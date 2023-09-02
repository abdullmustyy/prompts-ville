"use client";

import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCamera } from "react-icons/fa6";

const MyDropzone = ({ setFile, setProfileValues }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length) {
        acceptedFiles.forEach((file) => {
          const preview = URL.createObjectURL(file);

          setFile([file]);
          setProfileValues((prev) => ({ ...prev, image: preview }));
        });
      }
    },
    [setFile, setProfileValues]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
    noDrag: true,
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
