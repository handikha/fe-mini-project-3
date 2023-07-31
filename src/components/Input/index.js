import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

const Input = React.forwardRef(
  (
    {
      value,
      type,
      name,
      id,
      placeholder,
      autoFocus,
      onChange,
      label,
      className,
      errorInput,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputClass = [className];

    inputClass.push(
      `w-full rounded-lg border bg-inherit px-2 py-2 outline-none focus:ring-2 ${
        errorInput
          ? "focus:ring-danger/50 dark:focus:ring-danger border-danger/50 focus:border-danger"
          : "focus:ring-primary/50 dark:focus:ring-primary border-primary/50 focus:border-primary"
      }`
    );
    // rounded-md border py-1 focus:outline-none focus:ring-2 focus:ring-primary/50

    if (type === "password") {
      return (
        <div className='relative'>
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            name={name}
            className={inputClass.join(" ")}
            id={id}
            placeholder={placeholder}
            autoFocus={autoFocus}
            value={value}
            onChange={onChange}
          />
          <span
            className='absolute bottom-1/2 right-2 flex aspect-square h-1/2 translate-y-1/2 cursor-pointer select-none items-center justify-center'
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
            {showPassword ? (
              <HiOutlineEye className='text-xl' />
            ) : (
              <HiOutlineEyeSlash className='text-xl' />
            )}
          </span>
        </div>
      );
    }

    if (type === "textarea") {
      return (
        <>
          <div className=''>
            {label && <label htmlFor={id}>{label}</label>}
            <textarea
              ref={ref}
              value={value}
              name={name}
              className={inputClass.join(" ")}
              id={id}
              cols='30'
              rows='5'
              placeholder={placeholder}
              autoFocus={autoFocus}
              onChange={onChange}
            ></textarea>
          </div>
        </>
      );
    }

    return (
      <>
        <div className=''>
          {label && <label htmlFor={id}>{label}</label>}
          <input
            ref={ref}
            value={value}
            type={type}
            name={name}
            className={inputClass.join(" ")}
            id={id}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onChange={onChange}
          />
        </div>
      </>
    );
  }
);

export default Input;
