import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  deleteCategory,
  resetSuccessCategory,
} from "../../../store/slices/categories/slices";
import { FaPlus } from "react-icons/fa6";
import Button from "../../../components/Button";
import RenderCategoryModals from "./modals";
import CategoriesTable from "./table.categories";

export default function Categories() {
  const limit = 10;

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortName, setSortName] = useState(null);

  const {
    categories,
    isSubmitCategoryLoading,
    isDeleteCategoryLoading,
    isGetCategoryLoading,
    success,
    current_page,
    total_pages,
  } = useSelector((state) => {
    return {
      categories: state.categories.data,
      current_page: state.categories.current_page,
      total_pages: state.categories.total_pages,
      success: state.categories.success,
      isDeleteCategoryLoading: state.categories.isDeleteCategoryLoading,
      isGetCategoryLoading: state.categories.isGetCategoryLoading,
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

  const handlePagination = (type) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    dispatch(
      getCategories({
        page: type === "prev" ? current_page - 1 : current_page + 1,
        sort:
          sortName === true
            ? "ASC"
            : sortName === false
            ? "DESC"
            : sortName === null && "",
        limit,
      })
    );
  };

  useEffect(() => {
    dispatch(getCategories({ sort: "", page: 1, limit }));
  }, [isSubmitCategoryLoading, isDeleteCategoryLoading]);

  return (
    <>
      <div className="col-span-full mb-4 flex items-center justify-between">
        <h3 className="title">Categories</h3>
        <Button
          isButton
          isPrimary
          className="flex items-center gap-2"
          onClick={() => handleShowModal("Add")}
        >
          <FaPlus /> Add Category
        </Button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <CategoriesTable
          categories={categories}
          handleShowModal={handleShowModal}
          limit={limit}
          current_page={current_page}
        />
      </div>

      {!isGetCategoryLoading && total_pages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <Button
            isPrimary
            isButton
            isDisabled={current_page === 1}
            title="Prev"
            onClick={() => handlePagination("prev")}
          />
          <Button
            isPrimary
            isButton
            title="Next"
            isDisabled={current_page === total_pages}
            onClick={() => handlePagination("next")}
          />
        </div>
      )}

      <RenderCategoryModals
        showModal={showModal.show}
        type={showModal.type}
        selectedCategory={selectedCategory}
        handleCloseModal={handleCloseModal}
        success={success}
        handleDeleteCategory={handleDeleteCategory}
        isDeleteCategoryLoading={isDeleteCategoryLoading}
      />
    </>
  );
}
