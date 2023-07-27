import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import formatNumber from "../../utils/formatNumber";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import InputProduct from "./input.product";
import {
  deleteProduct,
  getProducts,
  resetSuccessProduct,
  updateProduct,
} from "../../store/slices/products/slices";
import { getCategories } from "../../store/slices/categories/slices";
import { useDispatch, useSelector } from "react-redux";
import SuccessMessage from "../../components/SuccessMessage";
import { motion } from "framer-motion";

export default function ProductsTable() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    categories,
    success,
    isDeleteProductLoading,
    isSubmitProductLoading,
    isGetProductsLoading,
  } = useSelector((state) => {
    return {
      categories: state.categories.data,
      success: state.products.success,
      isDeleteProductLoading: state.products.isDeleteProductLoading,
      isSubmitProductLoading: state.products.isSubmitProductLoading,
      isGetProductsLoading: state.products.isGetProductsLoading,
    };
  });

  const getCategoryByName = (id) => {
    const category = categories.find((item) => item.id === id);
    return category?.name;
  };

  const { products } = useSelector((state) => {
    return {
      products: state.products.data,
    };
  });

  const handleShowModal = (action, id) => {
    if (action === "Add") setShowModal({ show: true, type: action });

    if (action === "Details") {
      const productData = products.find((item) => item.id === id);
      setSelectedProduct(productData);
      setShowModal({ show: true, type: action, id });
    }

    if (action === "Edit") {
      const productData = products.find((item) => item.id === id);

      setSelectedProduct(productData);
      setShowModal({ show: true, type: action, id });
    }

    if (action === "Delete") {
      const productData = products.find((item) => item.id === id);
      setSelectedProduct(productData);
      setShowModal({ show: true, type: action, id });
    }

    if (action === "Change Status") {
      const productData = products.find((item) => item.id === id);
      setSelectedProduct(productData);
      setShowModal({ show: true, type: action, id });
    }
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleUpdateStatus = (id, status) => {
    const inputProductData = {
      status: status(),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(inputProductData));
    dispatch(updateProduct({ id, formData }));
  };

  useEffect(() => {
    dispatch(getProducts({ category_id: "", page: 1, sort: "", limit: 9 }));
    dispatch(getCategories());
  }, [isDeleteProductLoading, isSubmitProductLoading]);

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(resetSuccessProduct());
  };
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
              <th className="p-3">#</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Image</th>
              <th className="p-3">Satus</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isGetProductsLoading ? (
              <tr className="text-center">
                <td colSpan={6} className="p-3">
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr className="text-center">
                <td colSpan={6} className="p-3">
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
                    {index + 1}
                  </th>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{getCategoryByName(item.categoryId)}</td>
                  <td className="p-3">IDR {formatNumber(item.price)}</td>
                  <td className="p-3">
                    <div className="aspect-[4/3] w-10">
                      <img
                        src={"http://127.0.0.1:5000/" + item.image}
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
                        onClick={() =>
                          handleShowModal("Change Status", item.id)
                        }
                      >
                        Active
                      </Button>
                    ) : (
                      <Button
                        isSmall
                        isDanger
                        onClick={() =>
                          handleShowModal("Change Status", item.id)
                        }
                      >
                        Inactive
                      </Button>
                    )}
                  </td>

                  <td className="flex gap-2 p-3">
                    <Button
                      isSmall
                      isWarning
                      onClick={() => handleShowModal("Edit", item?.id)}
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal.show && showModal.type === "Add" && (
        <Modal
          showModal={showModal}
          title={`${showModal.type} Product`}
          closeModal={() => handleCloseModal()}
        >
          {success ? (
            <SuccessMessage message={`Product added successfully`} />
          ) : (
            <InputProduct categories={categories} />
          )}
        </Modal>
      )}

      {showModal.show && showModal.type === "Details" && (
        <Modal
          showModal={showModal}
          title={`${showModal.type} Product`}
          closeModal={() => handleCloseModal()}
        >
          <div className="flex flex-col">
            <div className="aspect-[2/1] w-full overflow-hidden rounded-lg">
              <img
                src={selectedProduct.image}
                alt={`${selectedProduct.name}`}
                className="h-full w-full object-cover "
              />
            </div>
            <h3 className="title mt-4">{selectedProduct.name}</h3>
            <p>{getCategoryByName(selectedProduct.categoryId)}</p>
            <p className="card-price mt-2">
              IDR {formatNumber(selectedProduct.price)}
            </p>
            <p className="mt-4">{selectedProduct.description}</p>
          </div>
        </Modal>
      )}

      {showModal.show && showModal.type === "Edit" && (
        <Modal
          showModal={showModal}
          title={`${showModal.type} Product ${showModal.id}`}
          closeModal={() => handleCloseModal()}
        >
          {success ? (
            <SuccessMessage
              message={`Product ${selectedProduct.name} deleted successfully`}
            />
          ) : (
            <InputProduct
              productData={selectedProduct}
              categories={categories}
            />
          )}
        </Modal>
      )}

      {showModal.show && showModal.type === "Delete" && (
        <Modal
          showModal={showModal}
          title={`${showModal.type} Product`}
          closeModal={() => handleCloseModal()}
        >
          {success ? (
            <SuccessMessage
              message={`Product ${selectedProduct.name} deleted successfully`}
            />
          ) : (
            <>
              <p className="modal-text">
                Are you sure to delete{" "}
                <span className="font-bold">{selectedProduct.name}</span>?
              </p>

              <div className="mt-4 flex justify-end gap-2">
                {!isDeleteProductLoading && (
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
                  isLoading={isDeleteProductLoading}
                  onClick={() => handleDeleteProduct(selectedProduct.id)}
                />
              </div>
            </>
          )}
        </Modal>
      )}

      {showModal.show && showModal.type === "Change Status" && (
        <Modal
          showModal={showModal}
          title={`${showModal.type} Product`}
          closeModal={() => handleCloseModal()}
        >
          {success ? (
            <SuccessMessage
              message={`${selectedProduct.name} status changed successfully`}
            />
          ) : (
            <>
              <p className="modal-text">
                Are you sure to
                {selectedProduct.status === 1 ? (
                  <span className="text-red-500"> deactive </span>
                ) : (
                  <span className="text-primary"> activate </span>
                )}
                <span className="font-bold">{selectedProduct.name}</span>?
              </p>

              <div className="mt-4 flex justify-end gap-2">
                {!isSubmitProductLoading && (
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
                  isPrimary={selectedProduct.status === 2}
                  isDanger={selectedProduct.status === 1}
                  isLoading={isSubmitProductLoading}
                  onClick={() =>
                    handleUpdateStatus(selectedProduct.id, () => {
                      if (selectedProduct.status === 2) {
                        return 1;
                      }

                      return 2;
                    })
                  }
                />
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  );
}
