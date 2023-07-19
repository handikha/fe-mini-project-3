import React from "react";
import products from "../../json/products.json";
import categories from "../../json/categories.json";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import formatNumber from "../../utils/formatNumber";

function Card({ name, image, category, onClick, price }) {
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
          <Button isSecondary isSmall>
            <FaMinus className=" text-white" />
          </Button>
          <input
            type="text"
            className="w-full text-center lg:w-10 "
            placeholder="Qty"
          />
          <Button isPrimary isSmall className="font-bold">
            <FaPlus className=" text-white" />
          </Button>
        </div>
      </div>
      <Button isButton isBLock isPrimary title="Add" />
    </div>
  );
}

export default function RenderCards() {
  const navigate = useNavigate();

  return products.products
    .map((product, index) => (
      <Card
        key={index}
        name={product.name}
        price={product.price}
        category={product.category.name}
        image={product.image}
        onClick={() => navigate(`/article/${product.id}`)}
      />
    ))
    .slice(0, 9);
}
