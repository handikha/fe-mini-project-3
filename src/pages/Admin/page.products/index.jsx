import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import Button from "../../../components/Button";
import {
  getProducts,
  resetSuccessProduct,
} from "../../../store/slices/products/slices";
import { getCategories } from "../../../store/slices/categories/slices";
import Input from "../../../components/Input";
import ProductsTable from "./table.products";
import RenderProductModals from "./modals";

export default function Products() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortName, setSortName] = useState(true);
  const [sortPrice, setSortPrice] = useState(null);
  const [sortStatus, setSortStatus] = useState("");

  const searchRef = useRef(null);

  const {
    products,
    categories,
    isDeleteProductLoading,
    isSubmitProductLoading,
    isGetProductsLoading,
    current_page,
    total_pages,
  } = useSelector((state) => {
    return {
      products: state.products.data,
      categories: state.categories.data,
      current_page: state.products.current_page,
      total_pages: state.products.total_pages,
      isDeleteProductLoading: state.products.isDeleteProductLoading,
      isSubmitProductLoading: state.products.isSubmitProductLoading,
      isGetProductsLoading: state.products.isGetProductsLoading,
    };
  });

  const getCategoryByName = (id) => {
    const category = categories.find((item) => item.id === id);
    return category?.name;
  };

  const handleShowModal = (action, id) => {
    if (action === "Add") setShowModal({ show: true, type: action });

    if (action === "Details") {
      const productData = products.find((item) => item.id === id);
      setSelectedProduct(productData);
      setShowModal({ show: true, type: action, id });
    }

    if (action === "Edit") {
      const productData = products.find((item) => item.id === id);
      setSelectedProduct(productData);
      setShowModal({ show: true, type: action, id });
    }

    if (action === "Delete") {
      const productData = products.find((item) => item.id === id);
      setSelectedProduct(productData);
      setShowModal({ show: true, type: action, id });
    }

    if (action === "Change Status") {
      const productData = products.find((item) => item.id === id);
      setSelectedProduct(productData);
      setShowModal({ show: true, type: action, id });
    }
  };

  const handlePagination = (type) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    dispatch(
      getProducts({
        category_id: selectedCategory,
        page: type === "prev" ? current_page - 1 : current_page + 1,
        sort_name:
          sortName === true
            ? "ASC"
            : sortName === false
            ? "DESC"
            : sortName === null && "",
        sort_price:
          sortPrice === true
            ? "ASC"
            : sortPrice === false
            ? "DESC"
            : sortPrice === null && "",
        limit: 10,
        keywords: searchRef ? searchRef.current.value : "",
        status: sortStatus,
      })
    );
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSortName(true);
    setSortPrice(null);
    setSortStatus("");

    dispatch(
      getProducts({
        category_id: selectedCategory,
        page: 1,
        sort_name: "",
        sort_price: "",
        limit: 10,
        keywords: searchRef.current.value,
        status: "",
      })
    );
  };

  const resetSearch = () => {
    searchRef.current.value = "";
    dispatch(
      getProducts({
        category_id: selectedCategory,
        page: 1,
        sort_name: "",
        sort_price: "",
        limit: 12,
        keywords: "",
        status: "",
      })
    );
  };

  useEffect(() => {
    dispatch(
      getProducts({
        category_id: selectedCategory,
        page: 1,
        sort_name: "ASC",
        sort_price: "",
        limit: 10,
        keywords: "",
        status: sortStatus,
      })
    );
    dispatch(
      getCategories({
        page: 1,
        sort: "",
        limit: 99,
      })
    );
  }, [isDeleteProductLoading, isSubmitProductLoading, selectedCategory]);

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(resetSuccessProduct());
  };

  return (
    <>
      <form className="relative w-full lg:w-1/2" onSubmit={handleSearch}>
        <Input ref={searchRef} type="text" placeholder="Search product..." />
        <button
          type="submit"
          className="absolute right-0 top-0 cursor-pointer p-[11px] duration-300 hover:text-primary"
        >
          {searchRef.current?.value ? (
            <HiXMark className="text-xl" onClick={resetSearch} />
          ) : (
            <HiMagnifyingGlass className="text-xl " />
          )}
        </button>
      </form>

      <div className="col-span-full my-4 flex items-center justify-between">
        <h3 className="title">Products</h3>
        <Button
          isButton
          isPrimary
          className=" flex items-center gap-2"
          onClick={() => handleShowModal("Add")}
        >
          <FaPlus /> Add Product
        </Button>
      </div>

      <div className="col-span-full flex gap-3 overflow-auto py-2">
        <Button
          title="All"
          isSmall
          onClick={() => {
            setSelectedCategory("");
          }}
          className={`whitespace-nowrap px-2 py-1 text-sm text-white duration-300 md:text-base  ${
            selectedCategory === ""
              ? "bg-primary"
              : "bg-primary/60 hover:bg-primary/80 dark:bg-primary/40 dark:hover:bg-primary/60"
          }`}
        />
        {categories.map((category, index) => (
          <Button
            key={index}
            title={category.name}
            isSmall
            onClick={() => {
              setSelectedCategory(category.id);
            }}
            className={`whitespace-nowrap px-2 py-1 text-sm text-white duration-300 md:text-base  ${
              category.id === selectedCategory
                ? "bg-primary"
                : "bg-primary/60 hover:bg-primary/80 dark:bg-primary/40 dark:hover:bg-primary/60"
            }`}
          />
        ))}
      </div>

      <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
        <ProductsTable
          products={products}
          categories={categories}
          handleShowModal={handleShowModal}
          isGetProductsLoading={isGetProductsLoading}
          current_page={current_page}
          selectedCategory={selectedCategory}
          sortName={sortName}
          setSortName={setSortName}
          sortPrice={sortPrice}
          setSortPrice={setSortPrice}
          sortStatus={sortStatus}
          setSortStatus={setSortStatus}
          keywords={searchRef}
        />
      </div>

      {!isGetProductsLoading && total_pages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <Button
            isPrimary
            isButton
            isDisabled={current_page === 1}
            title="Prev"
            onClick={() => handlePagination("prev")}
          />
          <Button
            isPrimary
            isButton
            title="Next"
            isDisabled={current_page === total_pages}
            onClick={() => handlePagination("next")}
          />
        </div>
      )}

      <RenderProductModals
        showModal={showModal.show}
        type={showModal.type}
        selectedProduct={selectedProduct}
        handleCloseModal={handleCloseModal}
        category={getCategoryByName(selectedProduct?.categoryId)}
      />
    </>
  );
}
