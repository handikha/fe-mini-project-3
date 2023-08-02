import React, { useState } from "react";
import Button from "../../../components/Button";
import { BsDash, BsSortAlphaDown, BsSortAlphaUp } from "react-icons/bs";
import { motion } from "framer-motion";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { getCategories } from "../../../store/slices/categories/slices";
import { useDispatch } from "react-redux";

export default function CategoriesTable({
  categories,
  limit,
  handleShowModal,
  current_page,
}) {
  const dispatch = useDispatch();
  const [sortName, setSortName] = useState(null);

  const handleSortName = (type) => {
    if (type === "ASC") {
      setSortName(true);
    } else if (type === "DESC") {
      setSortName(false);
    } else {
      setSortName(null);
    }

    dispatch(
      getCategories({
        sort: type,
        page: 1,
        limit,
      })
    );
  };

  return (
    <table className="text-gray-500 dark:text-gray-400 w-full text-left text-sm">
      <thead className="text-gray-700 dark:bg-gray-700 dark:text-gray-400 bg-slate-100 text-sm uppercase dark:bg-slate-800">
        <tr>
          <th scope="col" className="p-3">
            #
          </th>
          <th scope="col" className="p-3">
            <span className="flex items-center gap-1">
              Category Name{" "}
              {sortName === null ? (
                <Button
                  isSmall
                  className="bg-light duration-300 dark:bg-dark-gray"
                  title={<BsDash />}
                  onClick={() => {
                    setSortName(true);
                    handleSortName("ASC");
                  }}
                />
              ) : sortName ? (
                <Button
                  isSmall
                  className="bg-light duration-300 dark:bg-dark-gray"
                  title={<BsSortAlphaDown className="text-xl" />}
                  onClick={() => {
                    setSortName(false);
                    handleSortName("DESC");
                  }}
                />
              ) : (
                <Button
                  isSmall
                  className="bg-light duration-300 dark:bg-dark-gray"
                  title={<BsSortAlphaUp className="text-xl" />}
                  onClick={() => {
                    setSortName(null);
                    handleSortName("");
                  }}
                />
              )}
            </span>
          </th>
          <th scope="col" className="p-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {categories.length === 0 && (
          <tr className="text-center">
            <td colSpan={3} className="p-3">
              No data to display
            </td>
          </tr>
        )}
        {categories.map((item, index) => (
          <motion.tr
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: index * 0.05 }}
            key={index}
            className="duration-300 odd:bg-slate-200/70 even:bg-slate-100 dark:odd:bg-slate-700 dark:even:bg-slate-800"
          >
            <th
              scope="row"
              className="text-gray-900 whitespace-nowrap p-3 font-medium dark:text-white"
            >
              {index + 1 + (current_page - 1) * 10}
            </th>
            <td className="p-3">{item.name}</td>
            <td className="flex gap-2 p-3">
              <Button
                isSmall
                isWarning
                onClick={() => handleShowModal("Edit", item.id)}
              >
                <HiOutlinePencilSquare className="text-lg" />
              </Button>
              <Button
                isSmall
                isDanger
                onClick={() => handleShowModal("Delete", item.id)}
              >
                <HiOutlineTrash className="text-lg" />
              </Button>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
}
