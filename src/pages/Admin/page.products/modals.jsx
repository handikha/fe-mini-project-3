import React from "react";
import Modal from "../../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  updateProduct,
} from "../../../store/slices/products/slices";
import Button from "../../../components/Button";
import SuccessMessage from "../../../components/SuccessMessage";
import InputProduct from "./input.product";
import formatNumber from "../../../utils/formatNumber";

export default function RenderProductModals({
  showModal,
  type,
  selectedProduct,
  handleCloseModal,
  category,
}) {
  const dispatch = useDispatch();
  const {
    categories,
    success,
    isDeleteProductLoading,
    isSubmitProductLoading,
  } = useSelector((state) => {
    return {
      categories: state.categories.data,
      success: state.products.success,
      current_page: state.products.current_page,
      total_pages: state.products.total_pages,
      isDeleteProductLoading: state.products.isDeleteProductLoading,
      isSubmitProductLoading: state.products.isSubmitProductLoading,
    };
  });

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

  return (
    <>
      {showModal && type === "Add" && (
        <Modal
          showModal={showModal}
          title={`${type} Product`}
          closeModal={() => handleCloseModal()}
        >
          {success ? (
            <SuccessMessage message={`Product added successfully`} />
          ) : (
            <InputProduct categories={categories} />
          )}
        </Modal>
      )}

      {showModal && type === "Details" && (
        <Modal
          showModal={showModal}
          title={`${type} Product`}
          closeModal={() => handleCloseModal()}
        >
          <div className="flex flex-col">
            <div className="aspect-[5/3] w-full overflow-hidden rounded-lg">
              <img
                src={process.env.REACT_APP_PRODUCT_IMAGE_URL + selectedProduct.image}
                alt={`${selectedProduct.name}`}
                className="h-full w-full object-cover "
              />
            </div>
            <h3 className="title mt-4">{selectedProduct.name}</h3>
            <p>{category}</p>
            <p className="card-price mt-2">
              IDR {formatNumber(selectedProduct.price)}
            </p>
            <p className="mt-4">{selectedProduct.description}</p>
          </div>
        </Modal>
      )}

      {showModal && type === "Edit" && (
        <Modal
          showModal={showModal}
          title={`${type} Product`}
          closeModal={() => handleCloseModal()}
        >
          {success ? (
            <SuccessMessage
              message={`Product ${selectedProduct.name} updated successfully`}
            />
          ) : (
            <InputProduct
              productData={selectedProduct}
              categories={categories}
            />
          )}
        </Modal>
      )}

      {showModal && type === "Delete" && (
        <Modal
          showModal={showModal}
          title={`${type} Product`}
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
                <span className="font-bold">{selectedProduct.name}</span>?{" "}
                <p className="modal-text">
                  You won't be able to undo the changes after deleting.
                </p>
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

      {showModal && type === "Change Status" && (
        <Modal
          showModal={showModal}
          title={`${type} Product`}
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
                  isPrimary={selectedProduct.status === 0}
                  isDanger={selectedProduct.status === 1}
                  isLoading={isSubmitProductLoading}
                  onClick={() =>
                    handleUpdateStatus(selectedProduct.id, () => {
                      if (selectedProduct.status === 1) {
                        return 0;
                      }

                      return 1;
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
