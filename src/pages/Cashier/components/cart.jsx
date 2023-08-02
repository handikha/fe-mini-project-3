import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import formatNumber from "../../../utils/formatNumber";
import Button from "../../../components/Button";

export default function Cart({ carts, setCarts, handleShowModal }) {
  const [isCartExpand, setIsCartExpand] = useState(false);
  const handleExpandCart = () => setIsCartExpand((prevState) => !prevState);

  const removeItem = (id) => {
    const newCarts = carts.filter((item) => item.id !== id);
    setCarts(newCarts);
  };

  const getTotalPrice = (qty, price) => qty * price;

  const getGrandTotal = () => {
    let grandTotal = 0;
    carts.forEach((item) => {
      grandTotal += item.price * item.qty;
    });
    return grandTotal;
  };
  return (
    <div className="relative bottom-0 left-0 w-full md:col-span-3">
      <div className="fixed bottom-0 left-0 w-full rounded-xl border-t-[1px] border-primary bg-inherit bg-slate-100 p-4 shadow-md dark:bg-slate-800 lg:sticky lg:top-24 lg:h-[calc(100vh-7.5rem)] lg:rounded-md lg:border-none">
        <h3 className="title">Cart</h3>
        <p>
          {carts.length} item{carts.length > 1 && "s"}
        </p>
        <div
          className={`flex w-full flex-col overflow-auto pr-2 duration-300 lg:h-[70%] ${
            isCartExpand ? "h-80" : "h-0"
          }`}
        >
          {carts.length > 0 &&
            carts.map((item, index) => (
              <div
                key={index}
                className={`flex w-full items-center gap-2 border-b-[1px] py-4`}
              >
                <div className="aspect-[5/3] h-6 overflow-hidden rounded">
                  <img
                    src={process.env.REACT_APP_PRODUCT_IMAGE_URL + item.image}
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
                <Button
                  isDanger
                  isSmall
                  className="mx-2 rounded-md"
                  onClick={() => {
                    removeItem(item.id);
                  }}
                >
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
          <Button
            isButton
            isPrimary
            isBLock
            title="Check Out"
            onClick={() => {
              handleShowModal("Check Out", null);
            }}
          />
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
  );
}
