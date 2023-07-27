import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useDropzone } from "react-dropzone";
import { capitalizeEachWords } from "../../utils/capitalizeEachWords";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
} from "../../store/slices/products/slices";

export default function InputProduct({ productData, categories }) {
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  const descriptionRef = useRef(null);

  const [productDataImage, setProductDataImage] = useState(null);
  const [error, setError] = useState("");

  const { isSubmitProductLoading } = useSelector((state) => {
    return {
      isSubmitProductLoading: state.products.isSubmitProductLoading,
    };
  });

  // Set nilai awal input form berdasarkan data productData
  useEffect(() => {
    if (productData) {
      nameRef.current.value = productData.name || "";
      priceRef.current.value = productData.price || "";
      categoryRef.current.value = productData.categoryId || "";
      descriptionRef.current.value = productData.description || "";
      setProductDataImage(productData.image);
    }
  }, [productData]);

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
    setProductDataImage(null);
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { "image/*": [".jpg", ".png", ".jpeg"] },
    noClick: true,
    noKeyboard: true,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Data product (JSON)
    const inputProductData = {
      name: capitalizeEachWords(nameRef.current?.value),
      price: priceRef.current?.value,
      categoryId: categoryRef.current?.value,
      description: descriptionRef.current?.value,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(inputProductData));
    formData.append("file", file);

    if (productData) {
      dispatch(updateProduct({ id: productData.id, formData }));
    } else {
      dispatch(createProduct(formData));
    }
  };

  return (
    <form
      className="flex max-h-[400px] flex-col gap-3 overflow-y-auto px-2 py-2"
      onSubmit={handleSubmit}
    >
      <Input
        ref={nameRef}
        type="text"
        placeholder="Product Name"
        name="name"
        label="Product Name"
        id="name"
        autoFocus
      />
      {error && <div className="text-red-500 dark:text-red-400">{error}</div>}

      <label htmlFor="categories">Category</label>
      <select
        ref={categoryRef}
        id="categories"
        className="-mt-3 w-full rounded-lg border border-primary/50 bg-inherit px-1 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 dark:bg-slate-800 dark:focus:ring-primary"
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

      <Input
        ref={priceRef}
        type="text"
        placeholder="Price"
        name="price"
        label="Price"
        id="price"
      />

      <Input
        ref={descriptionRef}
        type="textarea"
        name="description"
        label="Description"
        id="description"
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

          {previewImage || productDataImage ? (
            <img
              alt={`http://localhost:5000/${productData?.name}`}
              src={previewImage || "http://localhost:5000/" + productDataImage}
              className="w-64"
            />
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

        {file === null && !productDataImage ? (
          <>
            <p className="text-md mb-2 mt-2 text-center font-normal text-slate-400">
              Or
            </p>

            <Button onClick={open} title="Choose a file" isSmall isPrimary />
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
          </div>
        )}
      </div>
      {productData ? (
        <Button
          isButton
          isPrimary
          title="Edit Product"
          className="mt-4"
          type="submit"
          // onClick={handleShowModal}
        />
      ) : (
        <Button
          isButton
          isPrimary
          title="Add Product"
          className="mt-4"
          type="submit"
          isLoading={isSubmitProductLoading}
        />
      )}
    </form>
  );
}
