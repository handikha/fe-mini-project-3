import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

export default function Input({ type, label, name, id, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);
  const className =
    "w-full rounded-lg border bg-inherit px-2 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary";

  if (type === "password") {
    return (
      <div className="relative">
        <label htmlFor={id}>{label}</label>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          className={className}
          id={id}
        />
        <span
          className="justify-cente absolute bottom-[5px] right-0 flex aspect-square h-1/2 cursor-pointer select-none items-center"
          onClick={() => setShowPassword((prevState) => !prevState)}
        >
          {showPassword ? (
            <HiOutlineEye className="text-xl" />
          ) : (
            <HiOutlineEyeSlash className="text-xl" />
          )}
        </span>
      </div>
    );
  }

  return (
    <div className="">
      <label htmlFor={id}>{label}</label>
      <input type={type} name={name} className={className} id={id} />
    </div>
  );
}
