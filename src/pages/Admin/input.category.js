import React, { useEffect, useRef } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function InputCategory({ categoryData }) {
  const categoryNameRef = useRef(null);

  useEffect(() => {
    if (categoryData) {
      categoryNameRef.current.value = categoryData.name || "";
    }
  }, [categoryData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(categoryNameRef.current.value);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <Input
        ref={categoryNameRef}
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
