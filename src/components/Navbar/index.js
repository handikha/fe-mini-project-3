import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

// import ToTop from "../ToTop";
import Modal from "../Modal";
import NavBrand from "./nav.brand";
import ThemeButton from "./theme.button";
import NavMenu from "./nav.menu";

export default function Navbar({ user }) {
  // LOGIN HANDLER
  const [isLogin, setIsLogin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavActive, setIsNavActive] = useState(false);

  // MODAL HANDLER
  const [showModal, setShowModal] = useState({ show: false, context: "" });
  const handleShowModal = (context) => {
    setShowModal({ show: true, context });

    document.body.style.overflow = "hidden";
  };
  const handleCloseModal = () => {
    setShowModal({ show: false, context: "" });

    document.body.style.overflow = "auto";
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ translateY: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          animate={{ translateY: 0, opacity: 1 }}
          className={`nav ${
            isScrolled ? "border-b-[1px] dark:shadow-slate-800" : null
          }`}
        >
          <div className="navbar container">
            <NavBrand />

            <div className="nav-menu-wrapper">
              <ThemeButton />

              <NavMenu
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                handleShowModal={handleShowModal}
                setIsScrolled={setIsScrolled}
                setIsNavActive={setIsNavActive}
                isNavActive={isNavActive}
                user={user}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* <ToTop
        className={
          isScrolled && !isNavActive ? "translate-y-0" : "translate-y-[150%]"
        }
      /> */}

      <Modal
        showModal={showModal.show}
        closeModal={handleCloseModal}
        title={showModal.context === "login" ? "Login" : "Register"}
      >
        
      </Modal>
    </>
  );
}
