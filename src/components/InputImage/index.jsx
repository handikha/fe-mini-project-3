import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "../Button";

export default function InputImage({
  file,
  error,
  setFile,
  productData,
  productDataImage,
  setProductDataImage,
}) {
  const [previewImage, setPreviewImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile.size > 1000000) {
      alert("file too large. Max 1 MB");
      return;
    }
    setFile(selectedFile);

    // show prev image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const removeImage = () => {
    setFile(null);
    setPreviewImage(null);
    setProductDataImage(null);
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { "image/*": [".jpg", ".png", ".jpeg"] },
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div className="flex h-fit w-full flex-col items-center justify-center px-4">
      <p className="text-dark mb-2 text-center text-lg font-semibold md:text-lg">
        Upload your image
      </p>

      <div
        {...getRootProps({
          className: `w-full h-fit flex items-center justify-center flex-col p-4 border-2 border-dark
            border-dashed rounded-md ${isDragActive ? "bg-teal-200/30" : null}`,
        })}
      >
        <input
          {...getInputProps({
            name: "image",
          })}
        />

        {previewImage || productDataImage ? (
          <img
            alt={productData?.name}
            src={
              previewImage ||
              process.env.REACT_APP_PRODUCT_IMAGE_URL + productDataImage
            }
            className="w-64"
          />
        ) : (
          <>
            <p className="md:text-md text-center text-sm text-slate-400">
              {file === null && (
                <>
                  <span className="select-none">
                    Drag & Drop your image here
                  </span>
                  {error.image && (
                    <div className="text-base text-red-500 dark:text-red-400">
                      {error.image}
                    </div>
                  )}
                </>
              )}
            </p>
          </>
        )}
      </div>

      {file === null && !productDataImage ? (
        <>
          <p className="text-md mb-2 mt-2 text-center font-normal text-slate-400">
            Or
          </p>

          <Button onClick={open} title="Choose a file" isSmall isPrimary />
        </>
      ) : (
        <div className="flex gap-2">
          <Button
            onClick={removeImage}
            title="Remove"
            isSmall
            isSecondary
            className="mt-2"
          />
        </div>
      )}
    </div>
  );
}
