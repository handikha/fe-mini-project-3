import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import categories from "../../json/categories.json";
import Button from "../../components/Button";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import formatNumber from "../../utils/formatNumber";
import { HiOutlineTrash } from "react-icons/hi2";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import axios from "axios";

export default function Cashier() {
  const [products, setProducts] = useState([]);

  const [carts, setCarts] = useState([]);

  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/v1/products").then((res) => {
      setProducts(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  const getTotalPrice = (qty, price) => qty * price;

  const getGrandTotal = () => {
    let grandTotal = 0;
    carts.forEach((item) => {
      grandTotal += item.price * item.qty;
    });
    return grandTotal;
  };

  const [isCartExpand, setIsCartExpand] = useState(false);
  const handleExpandCart = () => setIsCartExpand((prevState) => !prevState);

  const [activeIndex, setActiveIndex] = useState(0);
  const handleCategories = (index) => setActiveIndex(index);

  const removeItem = (id) => {
    const newCarts = carts.filter((item) => item.id !== id);
    setCarts(newCarts);
  };

  const [customerData, setCustomerData] = useState({});

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

  const handleCustomerData = (name, value) => {
    setCustomerData({ ...customerData, [name]: value });
  };
  console.log(customerData);

  const handlePay = () => {
    axios
      .post(
        "http://127.0.0.1:5000/api/v1/transaction",
        {
          customerName: customerData.customerName,
          table: customerData.table,
          orderItems: carts.map((item) => ({
            productId: item.id,
            quantity: item.qty,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        axios
          .post(
            "http://127.0.0.1:5000/api/v1/transaction/pay",
            {
              orderId: res.data.data.id,
              payAmount: customerData.payAmount,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then(() => {
            window.location.reload();
          });
      });
  };

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
          {products.length > 0 &&
            products
              .map((product, index) => (
                <Card
                  key={index}
                  name={product.name}
                  price={product.price}
                  category={product.category.name}
                  image={product.image}
                  onClick={(qty) => addItem({ ...product, qty })}
                />
              ))
              .slice(0, 9)}
        </div>

        {/* CART COMPONENT */}
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
                  setIsShowModal(true);
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
        {/* END OF CART COMPONENT */}
      </div>

      <Modal
        showModal={isShowModal}
        closeModal={() => {
          setIsShowModal(false);
        }}
        title="Checkout"
      >
        <div
          className={`flex w-full flex-col overflow-auto pr-2 duration-300 lg:h-[70%] ${
            isCartExpand ? "h-80" : "h-0"
          }`}
        >
          {carts.map((item, index) => (
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
            </div>
          ))}
        </div>
        <div className={"py-4"}>
          <Input
            label="Customer Name"
            name={"customerName"}
            onChange={(e) => {
              handleCustomerData("customerName", e.target.value);
            }}
          />
          <Input
            label="Pay Amount"
            name={"payAmount"}
            type={"number"}
            onChange={(e) => {
              handleCustomerData("payAmount", e.target.value);
            }}
          />
          <Input
            label="Table Number"
            name={"table"}
            type={"number"}
            onChange={(e) => {
              handleCustomerData("table", e.target.value);
            }}
          />
          <p className="my-4 text-base font-bold text-primary">
            Grand Total : {formatNumber(getGrandTotal())}
          </p>
          <Button
            className={"my-4"}
            isButton
            isPrimary
            isBLock
            title="Pay"
            onClick={handlePay}
          />
        </div>
      </Modal>
    </div>
  );
}
