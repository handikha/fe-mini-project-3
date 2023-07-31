import React, { useEffect, useRef, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { inputCategorySchema } from "../../../store/slices/categories/validation";
import {
  createCategory,
  updateCategory,
} from "../../../store/slices/categories/slices";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeEachWords } from "../../../utils/capitalizeEachWords";

export default function InputCategory({ categoryData }) {
  const dispatch = useDispatch();
  const categoryNameRef = useRef(null);
  const [error, setError] = useState("");

  const { isSubmitCategoryLoading } = useSelector((state) => {
    return {
      isSubmitCategoryLoading: state.categories.isSubmitCategoryLoading,
    };
  });
  useEffect(() => {
    if (categoryData) {
      categoryNameRef.current.value = categoryData.name || "";
    }
  }, [categoryData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputValue = capitalizeEachWords(categoryNameRef.current.value);
    try {
      await inputCategorySchema.validate({ category: inputValue });
      setError("");

      if (!categoryData) {
        dispatch(
          createCategory({
            name: inputValue,
          })
        );
      } else {
        dispatch(
          updateCategory({
            id: categoryData.id,
            name: inputValue,
          })
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <Input
        ref={categoryNameRef}
        type="text"
        placeholder="ex: Beverages"
        id="category"
        name="category"
        label="Category Name"
        autoFocus
        errorInput={error}
      />
      {error && <div className="text-red-500 dark:text-red-400">{error}</div>}

      <Button
        isButton
        isPrimary
        title={categoryData ? "Edit Category" : "Add Category"}
        type="submit"
        isLoading={isSubmitCategoryLoading}
      />
    </form>
  );
}
