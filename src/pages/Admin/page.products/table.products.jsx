import {
  BsArrowDownShort,
  BsArrowUpShort,
  BsCheckLg,
  BsDash,
  BsSortAlphaDown,
  BsSortAlphaUp,
  BsXLg,
} from "react-icons/bs";
import Button from "../../../components/Button";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { getProducts } from "../../../store/slices/products/slices";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import formatNumber from "../../../utils/formatNumber";

export default function ProductsTable({
  products,
  isGetProductsLoading,
  current_page,
  handleShowModal,
  selectedCategory,
  categories,
  sortName,
  setSortName,
  sortPrice,
  setSortPrice,
  sortStatus,
  setSortStatus,
  keywords,
}) {
  const dispatch = useDispatch();

  const handleSort = (type, sortBy) => {
    if (sortBy === "price") {
      setSortStatus("");
      setSortName(null);
    }
    if (sortBy === "name") {
      setSortStatus("");
      setSortPrice(null);
    }
    if (sortBy === "status") {
      setSortPrice(null);
      setSortName(null);
    }

    if (type === "ASC" && sortBy === "name") setSortName(true);
    if (type === "DESC" && sortBy === "name") setSortName(false);
    if (type === "ASC" && sortBy === "price") setSortPrice(true);
    if (type === "DESC" && sortBy === "price") setSortPrice(false);

    dispatch(
      getProducts({
        category_id: selectedCategory,
        page: 1,
        sort_name: sortBy === "name" ? type : "",
        sort_price: sortBy === "price" ? type : "",
        limit: 10,
        keywords: keywords ? keywords.current.value : "",
        status: sortBy === "status" ? type : "",
      })
    );
  };

  const getCategoryByName = (id) => {
    const category = categories.find((item) => item.id === id);
    return category?.name;
  };

  return (
    <table className="text-gray-500 dark:text-gray-400 w-full text-left text-sm">
      <thead className="text-gray-700 dark:bg-gray-700 dark:text-gray-400 bg-slate-100 text-sm uppercase dark:bg-slate-800">
        <tr>
          <th className="p-3">#</th>
          <th className="p-3">
            <span className="flex items-center gap-1">
              Product Name{" "}
              {sortName === null ? (
                <Button
                  isSmall
                  className="bg-light duration-300 dark:bg-dark-gray"
                  title={<BsDash />}
                  onClick={() => {
                    handleSort("ASC", "name");
                  }}
                />
              ) : sortName ? (
                <Button
                  isSmall
                  className="bg-light duration-300 dark:bg-dark-gray"
                  title={<BsSortAlphaDown className="text-xl" />}
                  onClick={() => {
                    handleSort("DESC", "name");
                  }}
                />
              ) : (
                <Button
                  isSmall
                  className="bg-light duration-300 dark:bg-dark-gray"
                  title={<BsSortAlphaUp className="text-xl" />}
                  onClick={() => {
                    handleSort("ASC", "name");
                  }}
                />
              )}
            </span>
          </th>
          <th className="p-3">Category</th>
          <th className="p-3">
            <span className="flex items-center gap-1">
              Price{" "}
              {sortPrice === null ? (
                <Button
                  isSmall
                  title={<BsDash />}
                  className="bg-light p-1 duration-300 dark:bg-dark-gray"
                  onClick={() => {
                    handleSort("ASC", "price");
                  }}
                />
              ) : sortPrice ? (
                <Button
                  isSmall
                  title={<BsArrowUpShort className="text-xl" />}
                  className="bg-light p-1 duration-300 dark:bg-dark-gray"
                  onClick={() => {
                    handleSort("DESC", "price");
                  }}
                />
              ) : (
                <Button
                  isSmall
                  title={<BsArrowDownShort className="text-xl" />}
                  className="bg-light p-1 duration-300 dark:bg-dark-gray"
                  onClick={() => {
                    handleSort("ASC", "price");
                  }}
                />
              )}
            </span>
          </th>
          <th className="p-3">Image</th>
          <th className="p-3">
            <span className="flex items-center gap-1">
              Status{" "}
              {sortStatus === "" ? (
                <Button
                  isSmall
                  title={<BsDash />}
                  className="bg-light p-1 duration-300 dark:bg-dark-gray"
                  onClick={() => {
                    handleSort(1, "status");
                    setSortStatus(1);
                  }}
                />
              ) : sortStatus === 1 ? (
                <Button
                  isSmall
                  isPrimary
                  title={<BsCheckLg />}
                  className="bg-light p-1 duration-300 dark:bg-dark-gray"
                  onClick={() => {
                    handleSort(0, "status");
                    setSortStatus(0);
                  }}
                />
              ) : (
                sortStatus === 0 && (
                  <Button
                    isSmall
                    isDanger
                    title={<BsXLg />}
                    className="bg-light p-1 duration-300 dark:bg-dark-gray"
                    onClick={() => {
                      handleSort("", "status");
                      setSortStatus("");
                    }}
                  />
                )
              )}
            </span>
          </th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {isGetProductsLoading ? (
          <tr className="text-center">
            <td colSpan={7} className="p-3">
              <div className="mx-auto block h-6 w-6 animate-spin rounded-full border-[3px] border-r-transparent">
                <span className="sr-only">Loading...</span>
              </div>
            </td>
          </tr>
        ) : products.length === 0 ? (
          <tr className="text-center">
            <td colSpan={7} className="p-3">
              No data to display
            </td>
          </tr>
        ) : (
          products?.map((item, index) => (
            <motion.tr
              initial={{
                opacity: 0,
              }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: index * 0.05 }}
              key={index}
              className="cursor-pointer duration-300 odd:bg-slate-200/70 even:bg-slate-100 hover:bg-primary/30 dark:odd:bg-slate-700 dark:even:bg-slate-800 dark:hover:bg-primary/40"
              onClick={() => handleShowModal("Details", item.id)}
            >
              <th
                scope="row"
                className="text-gray-900 whitespace-nowrap p-3 font-medium dark:text-white"
              >
                {index + 1 + (current_page - 1) * 10}
              </th>
              <td className="p-3">{item.name}</td>
              <td className="p-3">{getCategoryByName(item.categoryId)}</td>
              <td className="p-3">IDR {formatNumber(item.price)}</td>
              <td className="p-3">
                <div className="aspect-[4/3] w-10">
                  <img
                    src={process.env.REACT_APP_PRODUCT_IMAGE_URL + item.image}
                    alt={`${item.name}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </td>
              <td className="p-3">
                {item.status === 1 ? (
                  <Button
                    isSmall
                    isPrimary
                    onClick={() => handleShowModal("Change Status", item.id)}
                    title="Active"
                  />
                ) : (
                  <Button
                    isSmall
                    isDanger
                    onClick={() => handleShowModal("Change Status", item.id)}
                    title="Inactive"
                  />
                )}
              </td>

              <td className="p-3">
                <div className="flex gap-2">
                  <Button
                    isSmall
                    isWarning
                    onClick={() => handleShowModal("Edit", item?.id)}
                    title={<HiOutlinePencilSquare className="text-lg" />}
                  />
                  <Button
                    isSmall
                    isDanger
                    onClick={() => handleShowModal("Delete", item.id)}
                    title={<HiOutlineTrash className="text-lg" />}
                  />
                </div>
              </td>
            </motion.tr>
          ))
        )}
      </tbody>
    </table>
  );
}
