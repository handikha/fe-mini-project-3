import React from "react";

export default function LoadingCategories() {
  const length = 7;
  const loadingItems = Array.from({ length });

  const getRandomWidth = () => {
    return Math.floor(Math.random() * 101) + 40;
  };

  return (
    <div className="flex animate-pulse gap-3">
      {loadingItems.map((_, index) => (
        <div
          key={index}
          className="mb-2 h-8 rounded-lg bg-slate-400"
          style={{ width: `${getRandomWidth()}px` }}
        ></div>
      ))}
    </div>
  );
}
