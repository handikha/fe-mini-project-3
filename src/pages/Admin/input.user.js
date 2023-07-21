import React, { useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useDropzone } from "react-dropzone";

export default function InputUser() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const fullNameRef = useRef(null);

  const [file, setFile] = useState(null);
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
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { "image/*": [".jpg", ".png", ".jpeg"] },
    noClick: true,
    noKeyboard: true,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Data pengguna (JSON)
    const userData = {
      username: usernameRef.current?.value,
      email: emailRef.current?.value,
      phone: phoneRef.current?.value,
      fullName: fullNameRef.current?.value,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(userData));
    formData.append("file", file);

    // Tampilkan isi data pada formData
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Tampilkan informasi file dalam formData
    console.log("file (Image):", formData.get("file"));
  };

  return (
    <form
      className="flex max-h-[400px] flex-col gap-3 overflow-y-auto px-2 py-2"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Username"
        name="username"
        autoFocus
        ref={usernameRef}
      />
      <Input type="email" placeholder="Email" name="email" ref={emailRef} />
      <Input type="text" placeholder="Phone" name="phone" ref={phoneRef} />
      <Input
        type="text"
        placeholder="Full Name"
        name="fullName"
        ref={fullNameRef}
      />

      {/* INPUT IMAGE */}
      <div className="flex h-fit w-full flex-col items-center justify-center px-4">
        <p className="text-dark mb-2 text-center text-lg font-semibold md:text-lg">
          Upload your image
        </p>

        <div
          {...getRootProps({
            className: `w-full h-fit flex items-center justify-center flex-col p-4 border-2 border-dark border-dashed rounded-md ${
              isDragActive ? "bg-teal-200/30" : null
            }`,
          })}
        >
          <input {...getInputProps({ name: "image" })} />

          {previewImage ? (
            <img alt="" src={previewImage} className="w-64" />
          ) : (
            <>
              <p className="md:text-md text-center text-sm text-slate-400">
                {file === null && (
                  <span className="select-none">
                    Drag & Drop your image here
                  </span>
                )}
              </p>
            </>
          )}
        </div>

        {file === null ? (
          <>
            <p className="text-md mb-2 mt-2 text-center font-normal text-slate-400">
              Or
            </p>

            <Button
              onClick={open}
              title="Choose a file"
              isSmall
              isPrimary
              // isLoading={isUploadImageLoading}
              // isDisabled={isUploadImageLoading}
            />
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

            {/* <Button
            onClick={onButtonUpload}
            title="Upload Image"
            isSmall
            isPrimary
            className="mt-2"
          /> */}
          </div>
        )}
      </div>

      <Button
        isButton
        isPrimary
        title="Add User"
        className="mt-4"
        type="submit"
        // onClick={handleShowModal}
      />
    </form>
  );
}
