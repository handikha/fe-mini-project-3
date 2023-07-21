import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function InputCategory() {
  return (
    <form className="flex flex-col gap-3">
      <Input
        type="text"
        placeholder="Category Name"
        name="category"
        autoFocus
      />
      <Button
        isButton
        isPrimary
        title="Add Category"
        type="submit"
        // onClick={handleShowModal}
      />
    </form>
  );
}
