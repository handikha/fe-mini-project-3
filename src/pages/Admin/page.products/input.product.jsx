import React, { useEffect, useRef, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { capitalizeEachWords } from "../../../utils/capitalizeEachWords";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
} from "../../../store/slices/products/slices";
import {
  inputProductValidationSchema,
  updateProductValidationSchema,
} from "../../../store/slices/products/validation";
import Toast from "react-hot-toast";
import InputImage from "../../../components/InputImage";

export default function InputProduct({ productData, categories }) {
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  const descriptionRef = useRef(null);

  const [error, setError] = useState("");
  const [confrimAdd, setConfirmAdd] = useState(false);

  const [file, setFile] = useState(null);
  const [productDataImage, setProductDataImage] = useState(null);
  // const [previewImage, setPreviewImage] = useState(null);

  const { isSubmitProductLoading } = useSelector((state) => {
    return {
      isSubmitProductLoading: state.products.isSubmitProductLoading,
    };
  });

  useEffect(() => {
    if (productData) {
      nameRef.current.value = productData.name || "";
      priceRef.current.value = productData.price || "";
      categoryRef.current.value = productData.categoryId || "";
      descriptionRef.current.value = productData.description || "";
      setProductDataImage(productData.image);
    }
  }, [productData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Data product (JSON)
    const inputProductData = {
      name: capitalizeEachWords(nameRef.current?.value),
      price: priceRef.current?.value,
      categoryId: categoryRef.current?.value,
      description: descriptionRef.current?.value,
      image: file,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(inputProductData));
    if (file) formData.append("file", file);

    try {
      if (productData) {
        await updateProductValidationSchema.validate(inputProductData, {
          abortEarly: false,
        });

        setError("");
        setConfirmAdd(true);

        if (confrimAdd) {
          dispatch(updateProduct({ id: productData.id, formData }));
        }
      } else {
        await inputProductValidationSchema.validate(inputProductData, {
          abortEarly: false,
        });

        setError("");
        setConfirmAdd(true);

        if (confrimAdd) {
          dispatch(createProduct(formData));
        }
      }
    } catch (error) {
      const errors = {};

      Toast.error("Check your input fields");
      error.inner.forEach((innerError) => {
        errors[innerError.path] = innerError.message;
      });
      setError(errors);
    }
  };

  return (
    <form className="px-2 py-2" onSubmit={handleSubmit}>
      <div
        className={`${
          confrimAdd ? "hidden" : null
        } flex max-h-[400px] flex-col gap-3 overflow-y-auto px-2 py-2 `}
      >
        <div className="">
          <Input
            ref={nameRef}
            type="text"
            placeholder="ex: Sausage Roll"
            name="name"
            label="Product Name"
            id="name"
            errorInput={error.name}
            onChange={() => setError({ ...error, name: false })}
            autoFocus
          />
          {error.name && (
            <div className=" text-red-500 dark:text-red-400">{error.name}</div>
          )}
        </div>

        <label htmlFor="categories">Category</label>
        <select
          ref={categoryRef}
          id="categories"
          onChange={() => setError({ ...error, categoryId: false })}
          className={`-mt-3 w-full rounded-lg border bg-slate-100 px-2 py-2 outline-none focus:ring-2  dark:bg-slate-800 ${
            error.categoryId
              ? "border-danger/50 focus:border-danger focus:ring-danger/50 dark:focus:ring-danger"
              : "border-primary/50 focus:border-primary focus:ring-primary/50 dark:focus:ring-primary"
          }`}
        >
          <option value="" className="text-light-gray">
            Select Category
          </option>
          {categories?.map((category, index) => (
            <option key={index} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {error.categoryId && (
          <div className=" text-red-500 dark:text-red-400">
            {error.categoryId}
          </div>
        )}

        <div className="">
          <Input
            ref={priceRef}
            type="number"
            placeholder="ex: 35000"
            name="price"
            label="Price"
            id="price"
            errorInput={error.price}
            onChange={() => setError({ ...error, price: false })}
          />
          {error.price && (
            <div className=" text-red-500 dark:text-red-400">{error.price}</div>
          )}
        </div>

        <div className="">
          <Input
            ref={descriptionRef}
            type="textarea"
            name="description"
            label="Description"
            id="description"
            errorInput={error.description}
            onChange={() => setError({ ...error, description: false })}
          />
          {error.description && (
            <div className=" text-red-500 dark:text-red-400">
              {error.description}
            </div>
          )}
        </div>

        <InputImage
          error={error}
          productData={productData}
          file={file}
          setFile={setFile}
          productDataImage={productDataImage}
          setProductDataImage={setProductDataImage}
        />

        {productData ? (
          <Button
            isButton
            isPrimary
            title="Edit Product"
            className="mt-4"
            type="submit"
          />
        ) : (
          <Button
            isButton
            isPrimary
            title="Add Product"
            className="mt-4"
            type="submit"
          />
        )}
      </div>

      <div className={`${!confrimAdd ? "hidden" : null}`}>
        {productData ? (
          <p className="modal-text">
            Are you sure you want to update this product?
          </p>
        ) : (
          <p className="modal-text">
            Are you sure you want to add{" "}
            <span className="font-bold">
              {capitalizeEachWords(nameRef.current?.value)}
            </span>{" "}
            to the product list?
          </p>
        )}
        <div className="flex justify-end gap-2">
          {!isSubmitProductLoading && (
            <Button
              isButton
              isSecondary
              title="Back"
              className="mt-4"
              type="button"
              onClick={() => setConfirmAdd(false)}
            />
          )}

          <Button
            isButton
            isPrimary
            title="Sure"
            className="mt-4"
            type="submit"
            isLoading={isSubmitProductLoading}
          />
        </div>
      </div>
    </form>
  );
}
