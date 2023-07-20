import { useState } from "react";
import Button from "../../components/Button";
import { FaPlus } from "react-icons/fa6";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

export default function UsersTable({ users }) {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="col-span-full mb-4 flex justify-between">
        <h3>Users</h3>
        <Button
          isButton
          isPrimary
          className=" flex items-center gap-2"
          onClick={handleShowModal}
        >
          <FaPlus /> Add User
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
                Username
              </th>
              <th scope="col" className="p-3">
                Email
              </th>
              <th scope="col" className="p-3">
                Phone
              </th>
              <th scope="col" className="p-3">
                Status
              </th>
              {/* <th scope="col" className="p-3">
                Role
              </th> */}
              <th scope="col" className="p-3">
                Full Name
              </th>
              {/* <th scope="col" className="p-3">
                Image
              </th> */}
              <th scope="col" className="p-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr
                key={index}
                className="cursor-pointer duration-300 odd:bg-slate-200/70 even:bg-slate-100 hover:bg-primary/30 dark:odd:bg-slate-700 dark:even:bg-slate-800 dark:hover:bg-primary/70"
                onClick={() => window.alert(`User id: ${item.id}`)}
              >
                <th
                  scope="row"
                  className="text-gray-900 whitespace-nowrap p-3 font-medium dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="p-3">{item.username}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.phone}</td>
                <td className="p-3">{item.status}</td>
                {/* <td className="p-3">{item.role}</td> */}
                <td className="p-3">{item.fullName}</td>
                {/* <td className="p-3">
                  <div className="aspect-[4/3] w-10">
                    <img
                      src={item.profileImg}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                </td> */}
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
        title="Add User"
        closeModal={handleCloseModal}
      >
        <form className="flex flex-col gap-3">
          <Input type="text" placeholder="Username" name="username" autoFocus />
          <Input type="email" placeholder="Email" name="email" />
          <Input type="text" placeholder="Phone" name="phone" />
          <Input type="text" placeholder="Full Name" name="fullName" />
          <Button
            isButton
            isPrimary
            title="Add User"
            // onClick={handleShowModal}
          />
        </form>
      </Modal>
    </>
  );
}
