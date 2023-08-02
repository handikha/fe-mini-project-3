import React, { useRef, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { useDispatch } from "react-redux";
import {
  changeCashierStatus,
  updateProfile,
} from "../../../store/slices/cashierManagement/slices";

export default function DetailUser({
  userId = "",
  fullName = "",
  username = "",
  email = "",
  phone = "",
  status = "",
  profileImg,
  onCloseUpdateModal,
}) {
  const dispatch = useDispatch();

  const statusLabels = {
    0: "Unverified",
    1: "Active",
    2: "Inactive",
  };

  const [values, setValues] = useState({
    fullName: fullName,
    username: username,
    email: email,
    phone: phone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const [showConfirmUpdateModal, setShowConfirmUpdateModal] = useState(false);
  const handleUpdateStatus = () => {
    setShowConfirmUpdateModal(true);
  };
  const handleConfirmUpdate = (id, values) => {
    dispatch(
      updateProfile({ id: id, profile: JSON.parse(JSON.stringify(values)) })
    );
    setShowConfirmUpdateModal(false);
    onCloseUpdateModal();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  const handleCloseConfirmUpdateModal = () => setShowConfirmUpdateModal(false);

  const [showChangheStatusModal, setShowChangeStatusModal] = useState(false);
  const handleChangeStatus = () => {
    setShowChangeStatusModal(true);
  };

  const handleCloseChangeStatus = () => setShowChangeStatusModal(false);
  const confirmChangeStatus = (id, status) => {
    status == 1 ? (status = 2) : (status = 1);
    dispatch(changeCashierStatus({ id: id, status: status }));
    console.log(id, status);
    setShowChangeStatusModal(false);
    onCloseUpdateModal();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <>
      <form className="flex flex-col gap-3 overflow-y-auto px-2 py-2">
        <div className="flex flex-col items-center md:mb-4 md:w-auto">
          <div className="h-40 w-40 overflow-hidden">
            <img
              src={"http://127.0.0.1:5000/" + profileImg}
              alt=""
              className="h-full w-full rounded-full object-cover md:aspect-square"
            />
          </div>
        </div>
        <Input
          type="text"
          placeholder="Full Name"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
        />
        <div className="flex flex-col gap-x-1">
          <Button
            isButton
            isDanger={status === 2}
            isPrimary={status === 1}
            isWarning={status === 0}
            className="mt-4"
            title={statusLabels[status]}
            onClick={handleChangeStatus}
          />
          <Button
            isButton
            isPrimary
            className="mt-4"
            title="Update"
            onClick={handleUpdateStatus}
          />
        </div>
      </form>

      <Modal
        showModal={showChangheStatusModal}
        title={`${status === 1 ? "Deactivate" : "Activate"} User`}
        closeModal={handleCloseChangeStatus}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-semibold">
            {`Are you sure you want to ${
              status === 1 ? "deactivate" : "activate"
            } ${username} account?`}
          </h1>

          <div className="flex gap-x-1">
            <Button
              isButton
              isDanger
              className="mt-4"
              title={status === 1 ? "Deactivate" : "Activate"}
              onClick={() => confirmChangeStatus(userId, status)}
            />
            <Button
              isButton
              isPrimary
              className="mt-4"
              title="Cancel"
              onClick={handleCloseChangeStatus}
            />
          </div>
        </div>
      </Modal>

      <Modal
        showModal={showConfirmUpdateModal}
        title={`Update Profile`}
        closeModal={handleCloseConfirmUpdateModal}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-semibold">
            {`Are you sure you want to update ${username} profile?`}
          </h1>

          <div className="flex gap-x-1">
            <Button
              isButton
              isDanger
              className="mt-4"
              title="Update"
              onClick={() => handleConfirmUpdate(userId, values)}
            />
            <Button
              isButton
              isPrimary
              className="mt-4"
              title="Cancel"
              onClick={handleCloseConfirmUpdateModal}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
