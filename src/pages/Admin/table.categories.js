import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import InputCategory from "./input.category";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  deleteCategory,
  resetSuccessCategory,
} from "../../store/slices/categories/slices";
import { motion } from "framer-motion";
import SuccessMessage from "../../components/SuccessMessage";

export default function CategoriesTable() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    categories,
    isSubmitCategoryLoading,
    isDeleteCategoryLoading,
    success,
  } = useSelector((state) => {
    return {
      categories: state.categories.data,
      success: state.categories.success,
      isDeleteCategoryLoading: state.categories.isDeleteCategoryLoading,
      isSubmitCategoryLoading: state.categories.isSubmitCategoryLoading,
    };
  });

  const handleShowModal = (action, id) => {
    if (action === "Add") setShowModal({ show: true, type: action });

    if (action === "Edit") {
      const categoryData = categories.find((item) => item.id === id);
      setSelectedCategory(categoryData);
      setShowModal({ show: true, type: action, id });
    }

    if (action === "Delete") {
      const categoryData = categories.find((item) => item.id === id);
      setSelectedCategory(categoryData);
      setShowModal({ show: true, type: action, id });
    }

    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";

    dispatch(resetSuccessCategory());
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [isSubmitCategoryLoading, isDeleteCategoryLoading]);

  return (
    <>
      <div className="col-span-full mb-4 flex justify-between">
        <h3>Categories</h3>
        <Button
          isButton
          isPrimary
          className=" flex items-center gap-2"
          onClick={() => handleShowModal("Add")}
        >
          <FaPlus /> Add Category
        </Button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-gray-500 dark:text-gray-400 w-full text-left text-sm">
          <thead className="text-gray-700 dark:bg-gray-700 dark:text-gray-400 bg-slate-100 text-sm uppercase dark:bg-slate-800">
            <tr>
              <th scope="col" className="p-3">
                #
              </th>
              <th scope="col" className="p-3">
                Category Name
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
                  {index + 1}
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
                  <Button isSmall isDanger>
                    <HiOutlineTrash
                      className="text-lg"
                      onClick={() => handleShowModal("Delete", item.id)}
                    />
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal.show && showModal.type === "Add" && (
        <Modal
          showModal={showModal}
          title={`${showModal.type} Category`}
          closeModal={() => handleCloseModal()}
        >
          {success ? (
            <SuccessMessage message="Category created successfully" />
          ) : (
            <InputCategory />
          )}
        </Modal>
      )}

      {showModal.show && showModal.type === "Edit" && (
        <Modal
          showModal={showModal}
          title={`${showModal.type} Category`}
          closeModal={() => handleCloseModal()}
        >
          {success ? (
            <SuccessMessage message="Category updated successfully" />
          ) : (
            <InputCategory categoryData={selectedCategory} />
          )}
        </Modal>
      )}

      {showModal.show && showModal.type === "Delete" && (
        <Modal
          showModal={showModal}
          title={`${showModal.type} Category`}
          closeModal={() => handleCloseModal()}
        >
          {success ? (
            <SuccessMessage
              message={`Category ${selectedCategory.name} deleted successfully`}
            />
          ) : (
            <>
              <p className="modal-text">
                Are you sure to delete{" "}
                <span className="font-bold">{selectedCategory.name}</span>?
              </p>

              <div className="mt-4 flex justify-end gap-2">
                {!isDeleteCategoryLoading && (
                  <Button
                    title="No"
                    isButton
                    isSecondary
                    onClick={handleCloseModal}
                  />
                )}
                <Button
                  title="Yes"
                  isButton
                  isDanger
                  isLoading={isDeleteCategoryLoading}
                  onClick={() => handleDeleteCategory(selectedCategory.id)}
                />
              </div>
            </>
          )}
        </Modal>
      )}

    </>
  );
}
