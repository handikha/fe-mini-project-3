import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { HiXMark } from "react-icons/hi2";

export default function Modal({ showModal, closeModal, children, title }) {
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });
  }, [closeModal]);

  return (
    <AnimatePresence>
      {showModal && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-20 bg-black/70 backdrop-blur-sm dark:bg-slate-400/50"
          />
          <motion.div
            initial={{ translateY: -20, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ translateY: -20, opacity: 0 }}
            className="fixed inset-0 z-20 m-auto h-fit w-4/5 rounded-lg bg-slate-100 p-6 shadow-lg dark:bg-slate-800 md:w-1/2 lg:w-1/3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl">{title}</h3>
              <span className="cursor-pointer" onClick={closeModal}>
                <HiXMark className="text-3xl" />
              </span>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
