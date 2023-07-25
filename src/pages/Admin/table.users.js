import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import InputUser from "./input.user";
import DetailUser from "./detail.user";

import {
  getCashierInfo,
  changeCashierStatus,
} from "../../store/slices/cashierManagement/slices";

export default function UsersTable() {
  const dispatch = useDispatch();

  const {
    isGetCashierLoading,
    curentCashierPage,
    totalCashierPage,
    allCashier,
  } = useSelector((state) => {
    return {
      isGetCashierLoading: state.cashierManagement.isGetCashierLoading,
      curentCashierPage: state.cashierManagement.curentCashierPage,
      totalCashierPage: state.cashierManagement.totalCashierPage,
      allCashier: state.cashierManagement.allCashier,
    };
  });
  const [userId, setUserId] = useState();
  const [fullName, setFullName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [status, setStatus] = useState();
  const [profileImg, setProfileImg] = useState();

  const statusLabels = {
    0: "Unverified",
    1: "Active",
    2: "Inactive",
  };

  useEffect(() => {
    dispatch(
      getCashierInfo({ status: 1, sort: "ASC", page: curentCashierPage })
    );
  }, [curentCashierPage]);

  const [showAddModal, setShowAddModal] = useState(false);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleShowUpdateModal = (
    id,
    fullName,
    username,
    email,
    phone,
    status,
    profileImg
  ) => {
    setShowUpdateModal(true);
    setUserId(id);
    setFullName(fullName);
    setUsername(username);
    setEmail(email);
    setPhone(phone);
    setStatus(status);
    setProfileImg(profileImg);
  };

  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = (id, username) => {
    setShowDeleteModal(true);
    setUserId(id);
    setUsername(username);
  };
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const confirmDeleteCashier = (id) => {
    dispatch(changeCashierStatus({ id: id, status: 2 }));
    setShowDeleteModal(false);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <>
      <div className='col-span-full mb-4 flex justify-between'>
        <h3>Cashier</h3>
        <Button
          isButton
          isPrimary
          className=' flex items-center gap-2'
          onClick={() => handleShowAddModal("Add")}
        >
          <FaPlus /> Add Cashier
        </Button>
      </div>

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='text-gray-500 dark:text-gray-400 w-full text-left text-sm'>
          <thead className='text-gray-700 dark:bg-gray-700 dark:text-gray-400 bg-slate-100 text-sm uppercase dark:bg-slate-800'>
            <tr>
              <th scope='col' className='p-3'>
                #
              </th>
              <th scope='col' className='p-3'>
                Full Name
              </th>
              <th scope='col' className='p-3'>
                Username
              </th>
              <th scope='col' className='p-3'>
                Email
              </th>
              <th scope='col' className='p-3'>
                Phone
              </th>
              <th scope='col' className='p-3'>
                Status
              </th>
              <th scope='col' className='p-3'>
                Image
              </th>
              <th scope='col' className='p-3'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allCashier.map((item, index) => (
              <tr
                key={index}
                className='cursor-pointer duration-300 odd:bg-slate-200/70 even:bg-slate-100 hover:bg-primary/30 dark:odd:bg-slate-700 dark:even:bg-slate-800 dark:hover:bg-primary/70'
                onClick={() =>
                  handleShowUpdateModal(
                    item.id,
                    item.fullName,
                    item.username,
                    item.email,
                    item.phone,
                    item.status,
                    item.profileImg
                  )
                }
              >
                <th
                  scope='row'
                  className='text-gray-900 whitespace-nowrap p-3 font-medium dark:text-white'
                >
                  {index + 1}
                </th>
                <td className='p-3'>{item.fullName}</td>
                <td className='p-3'>{item.username}</td>
                <td className='p-3'>{item.email}</td>
                <td className='p-3'>{item.phone}</td>
                <td className='p-3'>{statusLabels[item.status]}</td>
                <td className='p-3'>
                  <div className='aspect-[4/3] w-10'>
                    <img
                      src={"http://localhost:5000/" + item.profileImg}
                      alt=''
                      className='h-full w-full object-cover'
                    />
                  </div>
                </td>
                <td className='flex gap-2 p-3'>
                  <Button
                    isSmall
                    isWarning
                    onClick={() =>
                      handleShowUpdateModal(
                        item.id,
                        item.fullName,
                        item.username,
                        item.email,
                        item.phone,
                        item.status,
                        item.profileImg
                      )
                    }
                  >
                    <HiOutlinePencilSquare className='text-lg' />
                  </Button>
                  <Button isSmall isDanger>
                    <HiOutlineTrash
                      className='text-lg'
                      onClick={() =>
                        handleShowDeleteModal(item.id, item.username)
                      }
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        showModal={showAddModal}
        title='Add Cashier'
        closeModal={handleCloseAddModal}
      >
        <InputUser onCloseInputModal={handleCloseAddModal} />
      </Modal>

      <Modal
        showModal={showDeleteModal}
        title='Delete Cashier'
        closeModal={handleCloseDeleteModal}
      >
        <div className='flex flex-col items-center'>
          <h1 className='text-lg font-semibold'>
            {`Are you sure you want to delete ${username} account?`}
          </h1>

          <div className='flex gap-x-1'>
            <Button
              isButton
              isDanger
              className='mt-4'
              title='Delete'
              onClick={() => confirmDeleteCashier(userId)}
            />
            <Button
              isButton
              isPrimary
              className='mt-4'
              title='Cancel'
              onClick={handleCloseDeleteModal}
            />
          </div>
        </div>
      </Modal>

      <Modal
        showModal={showUpdateModal}
        title='Update Cashier'
        closeModal={handleCloseUpdateModal}
      >
        <DetailUser
          userId={userId}
          fullName={fullName}
          username={username}
          email={email}
          phone={phone}
          status={status}
          profileImg={profileImg}
          onCloseUpdateModal={handleCloseUpdateModal}
        />
      </Modal>
    </>
  );
}
