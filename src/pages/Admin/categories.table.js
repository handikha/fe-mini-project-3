import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import { FaPlus } from "react-icons/fa6";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

export default function CategoriesTable({ categories }) {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="col-span-full mb-4 flex justify-between">
        <h3>Categories</h3>
        <Button
          isButton
          isPrimary
          className=" flex items-center gap-2"
          onClick={handleShowModal}
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
            {categories.map((item, index) => (
              <tr
                key={index}
                className="cursor-pointer duration-300 odd:bg-slate-200/70 even:bg-slate-100 hover:bg-primary/30 dark:odd:bg-slate-700 dark:even:bg-slate-800 dark:hover:bg-primary/70"
                onClick={() => window.alert(`Category id: ${item.id}`)}
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
                    onClick={() => {
                      window.alert(`Edit : ${item.id}`);
                    }}
                  >
                    <HiOutlinePencilSquare className="text-lg" />
                  </Button>
                  <Button isSmall isDanger>
                    <HiOutlineTrash
                      className="text-lg"
                      onClick={() => {
                        window.alert(`Delete : ${item.id}`);
                      }}
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        showModal={showModal}
        title="Add Category"
        closeModal={handleCloseModal}
      >
        <form className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="Category Name"
            name="category"
            autoFocus
          />
          <Button
            isButton
            isPrimary
            title="Add Category"
            // onClick={handleShowModal}
          />
        </form>
      </Modal>
    </>
  );
}
