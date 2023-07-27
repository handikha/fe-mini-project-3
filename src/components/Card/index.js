import React, { useState } from "react";
import products from "../../json/products.json";
import categories from "../../json/categories.json";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import formatNumber from "../../utils/formatNumber";

export default function Card({ name, image, category, onClick, price }) {
  const [count, setCount] = useState(0);

  return (
    <div className="group flex h-full w-full flex-col gap-3 rounded-md p-4 shadow-md duration-300 hover:scale-[103%] hover:shadow-xl dark:bg-slate-800/60">
      <div className="aspect-[2/1] w-full overflow-hidden rounded-lg">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover duration-300 group-hover:scale-110"
        />
      </div>

      <div className="">
        <h3 className="card-title">{name}</h3>
        <p>{category}</p>
      </div>

      {/* TODO: ADD QUANTITY */}
      <div className="mt-auto flex flex-col items-center justify-between gap-1 text-sm text-light-gray lg:flex-row">
        <p className="card-price">IDR {formatNumber(price)}</p>
        <div className="flex gap-2 text-xs">
          <Button
            isSecondary
            isSmall
            onClick={() => {
              count > 0 && setCount(count - 1);
            }}
          >
            <FaMinus className=" text-white" />
          </Button>
          <input
            type="text"
            className="w-full text-center lg:w-10 "
            placeholder="Qty"
            value={count}
          />
          <Button
            isPrimary
            isSmall
            className="font-bold"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <FaPlus className=" text-white" />
          </Button>
        </div>
      </div>
      <Button
        isButton
        isBLock
        isPrimary
        title="Add"
        onClick={() => {
          onClick(count);
        }}
      />
    </div>
  );
}
