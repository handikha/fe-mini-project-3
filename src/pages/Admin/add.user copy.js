import React from "react";
import Input from "../../components/Input";
import InputImage from "../../components/InputImage";
import Button from "../../components/Button";

export default function AddUser() {
  return (
    <form
      className="flex max-h-[400px] flex-col gap-3 overflow-y-auto px-2 py-2"
      onSubmit={handleSubmit}
    >
      <Input type="text" placeholder="Username" name="username" autoFocus />
      <Input type="email" placeholder="Email" name="email" />
      <Input type="text" placeholder="Phone" name="phone" />
      <Input type="text" placeholder="Full Name" name="fullName" />
      <InputImage />
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
