import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import categories from "../../json/categories.json";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import InputCategory from "./input.category";

export default function CategoriesTable() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleShowModal = (action, id) => {
    if (action === "Add") setShowModal({ show: true, type: action });

    if (action === "Edit") {
      const categoryData = categories.categories.find((item) => item.id === id);
      setSelectedCategory(categoryData);
      setShowModal({ show: true, type: action, id });
    }

    if (action === "Delete") {
      const categoryData = categories.categories.find((item) => item.id === id);
      setSelectedCategory(categoryData);
      setShowModal({ show: true, type: action, id });
    }
  };

  const handleCloseModal = () => setShowModal(false);

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
            {categories.categories.map((item, index) => (
              <tr
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
              </tr>
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
          <InputCategory />
        </Modal>
      )}

      {showModal.show && showModal.type === "Edit" && (
        <Modal
          showModal={showModal}
          title={`${showModal.type} Category ${showModal.id}`}
          closeModal={() => handleCloseModal()}
        >
          <InputCategory categoryData={selectedCategory} />
        </Modal>
      )}

      {showModal.show && showModal.type === "Delete" && (
        <Modal
          showModal={showModal}
          title={`${showModal.type} Category ${showModal.id}`}
          closeModal={() => handleCloseModal()}
        ></Modal>
      )}
    </>
  );
}
