import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { inputCategorySchema } from "../../store/slices/categories/validation";
import { createCategory } from "../../store/slices/categories/slices";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

export default function InputCategory({ categoryData }) {
  const dispatch = useDispatch();

  const { isCreateCategoryLoading } = useSelector((state) => {
    return {
      isCreateCategoryLoading: state.categories.isCreateCategoryLoading,
    };
  });
  console.log(isCreateCategoryLoading);
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
      setError("");

      dispatch(
        createCategory({
          name: inputValue,
        })
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = () => {};

  return (
    <>
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
          isLoading={isCreateCategoryLoading}
          // onClick={handleShowModal}
        />
      </form>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
    </>
  );
}
