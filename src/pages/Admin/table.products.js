import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import products from "../../json/products.json";
import formatNumber from "../../utils/formatNumber";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import InputProduct from "./input.product";

export default function ProductsTable() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleShowModal = (action, id) => {
    if (action === "Add") setShowModal({ show: true, type: action });

    if (action === "Details") {
      const productData = products.products.find((item) => item.id === id);
      setSelectedProduct(productData);
      setShowModal({ show: true, type: action, id });
    }

    if (action === "Edit") {
      const productData = products.products.find((item) => item.id === id);
      setSelectedProduct(productData);
      setShowModal({ show: true, type: action, id });
    }

    if (action === "Delete") {
      const productData = products.products.find((item) => item.id === id);
      setSelectedProduct(productData);
      setShowModal({ show: true, type: action, id });
    }
  };

  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      <div className="col-span-full mb-4 flex justify-between">
        <h3>Products</h3>
        <Button
          isButton
          isPrimary
          className=" flex items-center gap-2"
          onClick={() => handleShowModal("Add")}
        >
          <FaPlus /> Add Product
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
                Product Name
              </th>
              <th scope="col" className="p-3">
                Category
              </th>
              <th scope="col" className="p-3">
                Price
              </th>
              <th scope="col" className="p-3">
                Image
              </th>
              <th scope="col" className="p-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.products.map((item, index) => (
              <tr
                key={index}
                className="cursor-pointer duration-300 odd:bg-slate-200/70 even:bg-slate-100 hover:bg-primary/30 dark:odd:bg-slate-700 dark:even:bg-slate-800 dark:hover:bg-primary/70"
                onClick={() => handleShowModal("Details", item.id)}
              >
                <th
                  scope="row"
                  className="text-gray-900 whitespace-nowrap p-3 font-medium dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.category.name}</td>
                <td className="p-3">IDR {formatNumber(item.price)}</td>
                <td className="p-3">
                  <div className="aspect-[4/3] w-10">
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                </td>
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
          title={`${showModal.type} Product`}
          closeModal={() => handleCloseModal()}
        >
          <InputProduct />
        </Modal>
      )}

      {showModal.show && showModal.type === "Details" && (
        <Modal
          showModal={showModal}
          title={`${showModal.type} Product ${showModal.id}`}
          closeModal={() => handleCloseModal()}
        ></Modal>
      )}

      {showModal.show && showModal.type === "Edit" && (
        <Modal
          showModal={showModal}
          title={`${showModal.type} Product ${showModal.id}`}
          closeModal={() => handleCloseModal()}
        >
          <InputProduct productData={selectedProduct} />
        </Modal>
      )}

      {showModal.show && showModal.type === "Delete" && (
        <Modal
          showModal={showModal}
          title={`${showModal.type} Product ${showModal.id}`}
          closeModal={() => handleCloseModal()}
        ></Modal>
      )}
    </>
  );
}
