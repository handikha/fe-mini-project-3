import React from "react";
import Modal from "../../../components/Modal";
import InputCategory from "./input.category";
import SuccessMessage from "../../../components/SuccessMessage";
import Button from "../../../components/Button";

export default function RenderCategoryModals({
  showModal,
  type,
  handleCloseModal,
  selectedCategory,
  success,
  handleDeleteCategory,
  isDeleteCategoryLoading,
}) {
  return (
    <>
      {showModal && type === "Add" && (
        <Modal
          showModal={showModal}
          title={`${type} Category`}
          closeModal={() => handleCloseModal()}
        >
          {success ? (
            <SuccessMessage message="Category created successfully" />
          ) : (
            <InputCategory />
          )}
        </Modal>
      )}

      {showModal && type === "Edit" && (
        <Modal
          showModal={showModal}
          title={`${type} Category`}
          closeModal={() => handleCloseModal()}
        >
          {success ? (
            <SuccessMessage message="Category updated successfully" />
          ) : (
            <InputCategory categoryData={selectedCategory} />
          )}
        </Modal>
      )}

      {showModal && type === "Delete" && (
        <Modal
          showModal={showModal}
          title={`${type} Category`}
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
                <p className="modal-text">
                  You won't be able to undo the changes after deleting.
                </p>
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
