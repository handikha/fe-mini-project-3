import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/auth/slices";

import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineCog6Tooth,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";
import NavBrand from "./nav.brand";

export default function NavMenu({
  setIsLogin,
  setIsScrolled,
  setIsNavActive,
  isNavActive,
  user,
}) {

  // SCROLL AND RESIZE HANDLER
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 40);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => {
      setIsNavActive(false);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", () => {
        setIsNavActive(false);
      });
    };
  }, [setIsNavActive, setIsScrolled]);

  // NAV MENU HANDLER
  const openNavMenu = () => {
    setIsNavActive(true);
  };

  const closeNavMenu = () => {
    setIsNavActive(false);
  };

  useEffect(() => {
    if (isNavActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isNavActive]);

  // PROFILE MENU HANDLER
  const [isProfileActive, setIsProfileActive] = useState(false);
  const openProfileMenu = () => {
    setIsProfileActive(true);
  };
  const closeProfileMenu = () => {
    setIsProfileActive(false);
  };

  const handleOutsideClick = (e) => {
    const navProfileImg = document.querySelector(".nav-profile-img");

    if (navProfileImg && !navProfileImg.contains(e.target)) {
      setIsProfileActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  //@Logout
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("theme")
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <AnimatePresence>
        {isNavActive && (
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sidebar-bg"
            onClick={closeNavMenu}
          />
        )}
      </AnimatePresence>

      <div className={`${isNavActive ? "left-0" : "-left-full"} nav-menu`}>
        <AnimatePresence>
          {isNavActive && (
            <motion.div
              initial={{
                opacity: 0,
                translateX: -50,
              }}
              transition={{
                duration: 0.3,
                delay: 0.3,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              exit={{ opacity: 0, delay: 0.3 }}
              className="mb-4 h-fit select-none tracking-tighter text-yellow-500 md:hidden"
            >
              <NavBrand />
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          path={user?.role === 1 ? "/admin/dashboard" : "/cashier"}
          className={`nav-menu-item flex items-center gap-3`}
          isLink
          onClick={closeNavMenu}
        >
          <HiOutlineSquares2X2 className="text-xl md:hidden" />
          {user?.role === 1 ? "Dashboard" : "Products"}
        </Button>
      </div>

      <div className={`flex items-center gap-6`}>
        <div className="profile-img-wrapper relative row-start-2 flex w-full items-center gap-4">
          <div
            className={`nav-profile-img aspect-square w-8 cursor-pointer self-center overflow-hidden rounded-full bg-primary md:mb-0 md:block ${
              isNavActive && "-z-10"
            }`}
            onClick={() => {
              closeNavMenu();
              if (isProfileActive) {
                return closeProfileMenu();
              }
              openProfileMenu();
            }}
          >
            <img
              src={"http://127.0.0.1:5000/" + user?.profileImg}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <AnimatePresence>
            {isProfileActive && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0,
                  originY: 0,
                  originX: 1,
                }}
                transition={{
                  duration: 0.2,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  originY: 0,
                  originX: 1,
                }}
                className="profile-menu"
              >
                <div className="flex select-none flex-col gap-2">
                  <Button
                    className="flex cursor-pointer items-center gap-4 py-1 duration-300 hover:pl-2"
                    onClick={() => {
                      setIsProfileActive(false);
                    }}
                    isLink
                    path={
                      user?.role === 1
                        ? "/admin/account-setting/password"
                        : "/cashier/account-setting/password"
                    }
                  >
                    <HiOutlineCog6Tooth className="text-xl" />
                    Account Setting
                  </Button>

                  <Button
                    className="flex cursor-pointer items-center gap-4 py-1 duration-300 hover:pl-2"
                    onClick={() => {
                      setIsLogin(false);
                      setIsProfileActive(false);
                      handleLogout();
                    }}
                    isLink
                    path=""
                  >
                    <HiOutlineArrowRightOnRectangle className="text-xl" />
                    Logout
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="sidebar-button">
          {isNavActive ? (
            <span onClick={closeNavMenu} className="text-light">
              <HiX />
            </span>
          ) : (
            <span
              onClick={() => {
                openNavMenu();
                closeProfileMenu();
              }}
            >
              <HiMenu />
            </span>
          )}
        </div>
      </div>
    </>
  );
}
