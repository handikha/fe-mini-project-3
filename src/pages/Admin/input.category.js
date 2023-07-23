import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { inputCategorySchema } from "../../store/slices/categories/validation";
import { createCategory } from "../../store/slices/categories/slices";
import { useDispatch } from "react-redux";

export default function InputCategory({ categoryData }) {
  const dispatch = useDispatch();
  const categoryNameRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (categoryData) {
      categoryNameRef.current.value = categoryData.name || "";
    }
  }, [categoryData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputValue = categoryNameRef.current.value;

    try {
      await inputCategorySchema.validate({ category: inputValue });
      console.log(inputValue);
      setError(""); // Clear any previous errors
      dispatch(
        createCategory({
          name: categoryNameRef.current?.value,
        })
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = () => {};

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={categoryData ? handleEdit : handleSubmit}
    >
      <Input
        ref={categoryNameRef}
        type="text"
        placeholder="Category Name"
        name="category"
        autoFocus
      />
      {error && <div className="text-red-500">{error}</div>}{" "}
      {/* Display the error message */}
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
