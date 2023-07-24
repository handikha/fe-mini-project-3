import React from "react";
import { HiCheckCircle } from "react-icons/hi2";

export default function SuccessMessage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <HiCheckCircle className=" rounded-full bg-slate-100 text-6xl text-primary" />
      <p className="modal-text mt-4">{message}</p>
    </div>
  );
}
