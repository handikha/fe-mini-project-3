import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";

export default function Login() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-300/60">
      <div className="flex h-2/3 w-4/5 overflow-hidden rounded-xl shadow-md sm:w-1/2 lg:w-1/2">
        <div className="relative hidden w-full overflow-hidden bg-primary lg:block">
          <img
            src="https://source.unsplash.com/400x600?food"
            className="h-full w-full object-cover"
            alt=""
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-6 text-white">
            <h4 className="text-2xl font-medium">Welcome Back!</h4>
            <p className="mt-4 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              laboriosam.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center bg-slate-200 px-6 py-8">
          <h3 className="text-dark mb-4 text-center text-xl font-bold tracking-tight">
            Login
          </h3>

          <form className="flex w-full flex-col gap-2 text-sm">
            <Input
              required
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              autoFocus
            />

            <Input
              required
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />

            <Button
              isButton
              isPrimary
              title="Login"
              className=" mt-4 w-full select-none shadow-md"
              type="button"
            />

            <Button
              title="Forgot Password"
              className="h-4 cursor-pointer text-sm font-medium text-primary  hover:underline"
              onClick={handleShowModal}
            />
          </form>
        </div>
      </div>
      <Modal
        showModal={showModal}
        closeModal={handleCloseModal}
        title="Forgot Password"
      >
        <div className="">
          <Input
            type="email"
            placeholder="Insert your email"
            id="email"
            name="email"
            autoFocus
          />

          <Button
            isButton
            isPrimary
            isBLock
            className="mt-4"
            title="Reset Password"
            onClick={handleShowModal}
          />
        </div>
      </Modal>
    </div>
  );
}
