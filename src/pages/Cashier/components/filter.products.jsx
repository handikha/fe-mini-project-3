import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineFunnel } from "react-icons/hi2";
import { getProducts } from "../../../store/slices/products/slices";
import { useDispatch } from "react-redux";
import Button from "../../../components/Button";

export default function FilterProducts({ selectedCategory, keywords }) {
  const dispatch = useDispatch();
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleSort = (type, sortBy) => {
    setShowFilterMenu(false);

    const sort_name = sortBy === "name" ? type : sortBy === "" ? "ASC" : "";
    const sort_price = sortBy === "price" ? type : sortBy === "" ? "ASC" : "";

    dispatch(
      getProducts({
        category_id: selectedCategory,
        page: 1,
        sort_name: sort_name,
        sort_price: sort_price,
        limit: 12,
        keywords: keywords,
      })
    );
  };

  const handleOutsideClick = (e) => {
    const filterMenu = document.querySelector(".filter-menu");

    if (filterMenu && !filterMenu.contains(e.target)) {
      setShowFilterMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative w-fit">
      <Button
        isSmall
        isPrimary
        className="h-full w-fit"
        onClick={() => setShowFilterMenu((prevState) => !prevState)}
      >
        <HiOutlineFunnel className="text-xl" />
      </Button>

      <AnimatePresence>
        {showFilterMenu && (
          <motion.div
            initial={{
              opacity: 0,
              scaleY: 0,
              originY: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            animate={{
              opacity: 1,
              scaleY: 1,
            }}
            exit={{
              opacity: 0,
              scaleY: 0,
              originY: 0,
            }}
            className="filter-menu absolute right-0 z-10 mt-1 flex w-max flex-col items-start gap-2 rounded-lg border border-primary/50 bg-slate-100 p-4 shadow-lg  dark:bg-slate-800 lg:left-full lg:top-0 lg:ml-1 lg:mt-0"
          >
            <Button
              className="hover:text-primary"
              title="No Filter"
              onClick={() => {
                handleSort("", "");
              }}
            />
            <Button
              className="hover:text-primary"
              title="Sort Name A-Z"
              onClick={() => {
                handleSort("ASC", "name");
              }}
            />

            <Button
              className="hover:text-primary"
              title="Sort Name Z-A"
              onClick={() => {
                handleSort("DESC", "name");
              }}
            />
            <Button
              className="hover:text-primary"
              title="Sort Price 0-9"
              onClick={() => {
                handleSort("ASC", "price");
              }}
            />
            <Button
              className="hover:text-primary"
              title="Sort Price 9-0"
              onClick={() => {
                handleSort("DESC", "price");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
