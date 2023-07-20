import { useState } from "react";
import formatNumber from "../../utils/formatNumber";
import { FaPlus } from "react-icons/fa6";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";

import categories from "../../json/categories.json";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

export default function ProductsTable({ products }) {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      <div className="col-span-full mb-4 flex justify-between">
        <h3>Products</h3>
        <Button
          isButton
          isPrimary
          className=" flex items-center gap-2"
          onClick={handleShowModal}
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
                onClick={() => window.alert(`Product id: ${item.id}`)}
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
        title="Add Product"
        closeModal={() => handleCloseModal()}
      >
        <form className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="Product Name"
            name="productName"
            autoFocus
          />
          <select className="w-full rounded-lg border border-primary/50 bg-inherit px-1 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary">
            <option value="" className="text-light-gray">
              Select Category
            </option>
            {categories.categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <Input type="text" placeholder="Price" name="price" />
          <Button
            isButton
            isPrimary
            title="Add Product"
            // onClick={handleShowModal}
          />
        </form>
      </Modal>
    </>
  );
}
