import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/slices/products/slices";
import { getCategories } from "../../store/slices/categories/slices";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import Input from "../../components/Input";
import Card from "../../components/Card";
import Button from "../../components/Button";
import RenderModals from "./modals";
import Cart from "./components/cart";
import LoadingCards from "./components/loading.cards";
import FilterProducts from "./components/filter.products";

export default function Cashier() {
  const dispatch = useDispatch();
  const [carts, setCarts] = useState([]);

  const addItem = (item) => {
    const copyCart = [...carts];
    const newItem = copyCart.findIndex((cart) => cart.id === item.id);
    if (newItem !== -1) {
      copyCart[newItem].qty = item.qty;
      setCarts(copyCart);
    } else {
      setCarts([...carts, { ...item }]);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const searchRef = useRef(null);

  const {
    isGetProductsLoading,
    categories,
    current_page,
    total_pages,
    products,
  } = useSelector((state) => {
    return {
      products: state.products.data,
      isGetProductsLoading: state.products.isGetProductsLoading,
      categories: state.categories.data,
      current_page: state.products.current_page,
      total_pages: state.products.total_pages,
    };
  });

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (action, id) => {
    if (action === "Details") {
      const productData = products.find((item) => item.id === id);
      setSelectedProduct(productData);
      setShowModal({ show: true, type: action, id });
    }

    if (action === "Check Out") {
      setShowModal({ show: true, type: action });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
        sort_name: "",
        sort_price: "",
        limit: 12,
        keywords: "",
      })
    );
  };

  const handleSearch = (event) => {
    event.preventDefault();

    dispatch(
      getProducts({
        category_id: selectedCategory,
        page: 1,
        sort_name: "",
        sort_price: "",
        limit: 12,
        keywords: searchRef.current.value,
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
      })
    );
  };

  const getCategoryByName = (id) => {
    const category = categories.find((item) => item.id === id);
    return category?.name;
  };

  useEffect(() => {
    dispatch(
      getProducts({
        category_id: selectedCategory,
        page: 1,
        sort_name: "",
        sort_price: "",
        limit: 12,
        keywords: "",
      })
    );
    dispatch(
      getCategories({
        page: 1,
        sort: "",
        limit: "",
      })
    );
  }, [selectedCategory]);

  return (
    <div className="container pb-48 pt-20">
      <div className="grid grid-cols-2 gap-4 duration-300 md:grid-cols-2 lg:grid-cols-9">
        <div className="col-span-full flex gap-2 lg:col-span-3">
          <form className="relative w-full " onSubmit={handleSearch}>
            <Input
              ref={searchRef}
              type="text"
              placeholder="Search product..."
            />
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
          <FilterProducts
            selectedCategory={selectedCategory}
            keywords={searchRef.current?.value}
          />
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

        <div className="col-span-full grid grid-cols-2 gap-4 md:col-span-6 md:grid-cols-3">
          {isGetProductsLoading ? (
            <LoadingCards />
          ) : products.length === 0 ? (
            <div className="col-span-full mt-4 flex justify-center gap-2">
              <h3>No data to display</h3>
            </div>
          ) : (
            products.map((product, index) => (
              <Card
                key={index}
                name={product.name}
                price={product.price}
                category={product.category.name}
                image={product.image}
                onClick={(qty) => addItem({ ...product, qty })}
                showModal={() => handleShowModal("Details", product.id)}
              />
            ))
          )}

          {!isGetProductsLoading && total_pages > 1 && (
            <div className="col-span-full mt-4 flex h-fit justify-center gap-2">
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
        </div>

        <Cart carts={carts} setCarts={setCarts} handleShowModal={handleShowModal} />

      </div>

      <RenderModals
        showModal={showModal.show}
        type={showModal.type}
        selectedProduct={selectedProduct}
        handleCloseModal={handleCloseModal}
        category={getCategoryByName(selectedProduct?.categoryId)}
        carts={carts}
      />
    </div>
  );
}
