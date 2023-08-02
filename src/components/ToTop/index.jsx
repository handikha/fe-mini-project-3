import React from "react";

export default function ToTop({ className }) {
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div
      className={`fixed bottom-4 right-4 z-20 flex aspect-square w-12 cursor-pointer items-center justify-center rounded-full bg-primary shadow-md shadow-slate-400 duration-300 dark:shadow-none md:w-14 ${className}`}
      onClick={toTop}
    >
      <div className="relative top-[3px] aspect-square w-1/4 rotate-45 border-[4px] border-b-0 border-r-0 border-white"></div>
    </div>
  );
}
