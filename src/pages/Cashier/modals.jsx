import React, { useState } from "react";
import Modal from "../../components/Modal";
import formatNumber from "../../utils/formatNumber";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";

export default function RenderModals({
  showModal,
  type,
  selectedProduct,
  handleCloseModal,
  category,
  carts,
}) {
  const getTotalPrice = (qty, price) => qty * price;
  const getGrandTotal = () => {
    let grandTotal = 0;
    carts.forEach((item) => {
      grandTotal += item.price * item.qty;
    });
    return grandTotal;
  };

  const [customerData, setCustomerData] = useState({});
  const handleCustomerData = (name, value) => {
    setCustomerData({ ...customerData, [name]: value });
  };

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
    <>
      {showModal && type === "Check Out" && (
        <Modal
          showModal={showModal}
          closeModal={() => {
            handleCloseModal(false);
          }}
          title={`${type}`}
        >
          <div
            className={`flex h-52 w-full flex-col overflow-auto pr-2 duration-300`}
          >
            {carts.map((item, index) => (
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
              </div>
            ))}
          </div>

          <div className="py-4">
            <Input
              label="Customer Name"
              name={"customerName"}
              onChange={(e) => {
                handleCustomerData("customerName", e.target.value);
              }}
            />
            <div className="mt-2 flex gap-2">
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
            </div>
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
      )}

      {showModal && type === "Details" && (
        <Modal
          showModal={showModal}
          title={`${type} Product`}
          closeModal={() => handleCloseModal()}
        >
          <div className="flex flex-col">
            <div className="aspect-[5/3] w-full overflow-hidden rounded-lg">
              <img
                src={
                  process.env.REACT_APP_PRODUCT_IMAGE_URL +
                  selectedProduct.image
                }
                alt={`${selectedProduct.name}`}
                className="h-full w-full object-cover "
              />
            </div>
            <h3 className="title mt-4">{selectedProduct.name}</h3>
            <p>{category}</p>
            <p className="card-price mt-2">
              IDR {formatNumber(selectedProduct.price)}
            </p>
            <p className="mt-4">{selectedProduct.description}</p>
          </div>
        </Modal>
      )}
    </>
  );
}
