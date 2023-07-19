import React, { useState } from "react";
import RenderCards from "../../components/Card";
import cart from "../../json/cart.json";
import categories from "../../json/categories.json";
import Button from "../../components/Button";
import { FaAngleDown, FaAngleUp, FaRegTrashCan } from "react-icons/fa6";
import formatNumber from "../../utils/formatNumber";

export default function HomePage() {
  const getTotalPrice = (qty, price) => qty * price;

  const getGrandTotal = () => {
    let grandTotal = 0;
    cart.cart.forEach((item) => {
      grandTotal += item.price * item.qty;
    });
    return grandTotal;
  };

  const [isCartExpand, setIsCartExpand] = useState(true);
  const handleExpandCart = () => setIsCartExpand((prevState) => !prevState);

  const [activeIndex, setActiveIndex] = useState(0);
  const handleCategories = (index) => setActiveIndex(index);

  return (
    <div className="container py-20">
      <div className="grid grid-cols-2 gap-4 duration-300 md:grid-cols-2 lg:grid-cols-9">
        <div className="col-span-full flex gap-3 overflow-auto py-2">
          {categories.categories.map((category, index) => (
            <Button
              key={index}
              title={category.name}
              isSmall
              onClick={() => handleCategories(index)}
              className={`whitespace-nowrap px-2 py-1 text-sm text-white duration-300 md:text-base  ${
                activeIndex === index
                  ? "bg-primary"
                  : "bg-primary/60 hover:bg-primary/80"
              }`}
            />
          ))}
        </div>

        <div className="col-span-full grid grid-cols-2 gap-4 md:col-span-6 md:grid-cols-3">
          <RenderCards />
        </div>

        <div className="relative bottom-0 left-0 w-full md:col-span-3">
          <div className="fixed bottom-0 left-0 w-full rounded-xl border-t-[1px] border-primary bg-inherit bg-slate-100 p-4 shadow-md dark:bg-slate-800 lg:sticky lg:top-24 lg:h-[calc(100vh-7.5rem)] lg:rounded-md lg:border-none">
            <h3 className="title">Cart</h3>
            <p>
              {cart.cart.length} item{cart.cart.length > 1 && "s"}
            </p>
            <div
              className={`flex  w-full flex-col overflow-auto pr-2 duration-300 lg:h-[70%] ${
                isCartExpand ? "h-80" : "h-0"
              }`}
            >
              {cart.cart.map((item, index) => (
                <div
                  key={index}
                  className="flex w-full items-center gap-2 py-2"
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
                  <Button isDanger className="ml-2 rounded-md p-2">
                    <FaRegTrashCan />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <p className="text-xl font-bold dark:text-title-dark">Total</p>
              <p className="font-bold text-primary dark:text-green-400">
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
      </div>
    </div>
  );
}
