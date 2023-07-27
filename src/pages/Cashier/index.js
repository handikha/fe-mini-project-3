import React, { useState } from "react";
import RenderCards from "../../components/Card";
import cart from "../../json/cart.json";
import Button from "../../components/Button";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import formatNumber from "../../utils/formatNumber";
import { HiOutlineTrash } from "react-icons/hi2";
import { getProducts } from "../../store/slices/products/slices";
import { getCategories } from "../../store/slices/categories/slices";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LoadingCategories from "./loading.categories";
import LoadingCards from "./loading.cards";

export default function Cashier() {
  const getTotalPrice = (qty, price) => qty * price;

  const getGrandTotal = () => {
    let grandTotal = 0;
    cart.cart.forEach((item) => {
      grandTotal += item.price * item.qty;
    });
    return grandTotal;
  };

  const [isCartExpand, setIsCartExpand] = useState(false);
  const handleExpandCart = () => setIsCartExpand((prevState) => !prevState);

  // -----------------------------------------------------------------------------
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    isGetProductsLoading,
    products,
    categories,
    current_page,
    total_pages,
  } = useSelector((state) => {
    return {
      isGetProductsLoading: state.products.isGetProductsLoading,
      products: state.products.data,
      categories: state.categories.data,
      current_page: state.products.current_page,
      total_pages: state.products.total_pages,
    };
  });

  const handlePagination = (type) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    dispatch(
      getProducts({
        category_id: selectedCategory,
        page: type === "prev" ? current_page - 1 : current_page + 1,
        sort: "",
        limit: 9,
      })
    );
    console.log(current_page);
  };

  useEffect(() => {
    dispatch(
      getProducts({
        category_id: selectedCategory,
        page: 1,
        sort: "",
        limit: 9,
      })
    );
    dispatch(getCategories());
  }, [selectedCategory]);

  return (
    <div className="container pb-48 pt-20">
      <div className="grid grid-cols-2 gap-4 duration-300 md:grid-cols-2 lg:grid-cols-9">
        <div className="col-span-full flex gap-3 overflow-auto py-2">
          <>
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
          </>
        </div>

        <div className="col-span-full grid grid-cols-2 gap-4 md:col-span-6 md:grid-cols-3">
          {isGetProductsLoading ? (
            <LoadingCards />
          ) : products.length === 0 ? (
            <div className="col-span-full mt-4 flex justify-center gap-2">
              <h3>No data to display</h3>
            </div>
          ) : (
            <>
              <RenderCards products={products} categories={categories} />
              {total_pages > 1 && (
                <div className="col-span-full mt-4 flex justify-center gap-2">
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
            </>
          )}
        </div>

        {/* CART COMPONENT */}
        <div className="relative bottom-0 left-0 w-full md:col-span-3">
          <div className="fixed bottom-0 left-0 w-full rounded-xl border-t-[1px] border-primary bg-inherit bg-slate-100 p-4 shadow-md dark:bg-slate-800 lg:sticky lg:top-24 lg:h-[calc(100vh-7.5rem)] lg:rounded-md lg:border-none">
            <h3 className="title">Cart</h3>
            <p>
              {cart.cart.length} item{cart.cart.length > 1 && "s"}
            </p>
            <div
              className={`flex w-full flex-col overflow-auto pr-2 duration-300 lg:h-[70%] ${
                isCartExpand ? "h-80" : "h-0"
              }`}
            >
              {cart.cart.map((item, index) => (
                <div
                  key={index}
                  className={`flex w-full items-center gap-2 border-b-[1px] py-4`}
                >
                  <div className="aspect-[5/3] h-6 overflow-hidden rounded">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <div className="">
                      <p className="cart-title">{item.name}</p>
                    </div>

                    <div className="flex justify-between">
                      <p className="cart-title">
                        {formatNumber(item.price)} x{" "}
                        <span className="font-bold">{item.qty}</span>
                      </p>

                      <p className="cart-title font-bold">
                        {formatNumber(getTotalPrice(item.qty, item.price))}
                      </p>
                    </div>
                  </div>
                  <Button isDanger isSmall className="mx-2 rounded-md">
                    <HiOutlineTrash className="text-lg" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <p className="text-base font-bold dark:text-title-dark lg:text-xl">
                Total
              </p>
              <p className="text-base font-bold text-primary dark:text-green-400 lg:text-lg">
                {formatNumber(getGrandTotal())}
              </p>
            </div>
            <div className="mt-4">
              <Button isButton isPrimary isBLock title="Check Out" />
            </div>

            <div
              className="absolute left-1/2 top-0  z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-2 border-slate-100 bg-primary px-4 py-1 dark:border-slate-800 lg:hidden"
              onClick={handleExpandCart}
            >
              {isCartExpand ? (
                <FaAngleDown className="text-xl text-white" />
              ) : (
                <FaAngleUp className="text-xl text-white" />
              )}
            </div>
          </div>
        </div>
        {/* END OF CART COMPONENT */}
      </div>
    </div>
  );
}
