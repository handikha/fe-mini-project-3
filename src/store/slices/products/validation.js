import * as Yup from "yup";

export const inputProductSchema = Yup.object({
  name: Yup.string()
    .required("Product name is required")
    .matches(/^[a-zA-Z\s]+$/, "Product name must contain only letters"),
  price: Yup.string()
    .required("Price is required")
    .matches(/^[0-9]+$/, "Price must contain only numbers"),
  description: Yup.string()
    .required("Description is required")
    .min(20, "Description must be at least 20 letters long"),
  categoryId: Yup.string().required("Category is required"),
  image: Yup.string().required("Image is required"),
});
