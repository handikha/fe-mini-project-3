import React from "react";
import RenderCards from "../../components/Card";

import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { FaAngleUp } from "react-icons/fa6";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="container py-24">
      <div className=" mt-2 grid grid-cols-2 gap-x-4 gap-y-8 duration-300 md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-full grid grid-cols-2 gap-4 md:col-span-3 md:grid-cols-3">
          <RenderCards />
        </div>

        <div className="relative bottom-0 left-0 w-full ">
          <div className="fixed bottom-0 left-0 w-full rounded-xl border-t-[1px] border-primary bg-inherit bg-slate-100 p-4 shadow-md dark:bg-slate-800 lg:sticky lg:top-24 lg:h-[calc(100vh-7.5rem)] lg:rounded-md lg:border-none">
            <h3 className="title">Shopping Cart</h3>
            <div className="flex w-full flex-wrap">
              <div className=""></div>
            </div>
            <div className="absolute left-1/2 top-0  z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-2 border-slate-100 bg-primary px-4 py-1 dark:border-slate-800 lg:hidden">
              <FaAngleUp className="text-xl text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// h-[calc(100vh-8.5rem)]
