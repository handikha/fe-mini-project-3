import * as Yup from "yup";

export const inputCategorySchema = Yup.object({
  category: Yup.string()
    .required("Category is required")
    .matches(/^[a-zA-Z\s]+$/, "Category must contain only letters"),
});
