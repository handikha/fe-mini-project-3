import { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi";

export default function ThemeButton() {
  // THEME HANDLER
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const element = document.documentElement;

  const toggleDarkMode = (theme) => {
    setTheme(theme);
  };

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", theme);
        break;

      case "light":
        element.classList.remove("dark");
        localStorage.removeItem("theme");
        break;

      default:
        element.classList.remove("dark");
        localStorage.removeItem("theme");
        break;
    }
  }, [theme, element.classList]);

  useEffect(() => {
    if (localStorage.theme === "dark") {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, [element.classList]);

  return theme === "light" ? (
    <div className={`theme-button`} onClick={() => toggleDarkMode("dark")}>
      <HiSun />
    </div>
  ) : (
    <div className={`theme-button`} onClick={() => toggleDarkMode("light")}>
      <HiMoon />
    </div>
  );
}
