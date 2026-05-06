import { useMenu } from "../context/MenuContext";

export default function Hamburger() {
  const { isOpen, toggleMenu } = useMenu();

  return (
    <button
      onClick={toggleMenu}
      className={`flex flex-col justify-center items-center w-10 h-10 space-y-1.5 z-[100] transition-all duration-300 ease-in-out ${
        isOpen ? "fixed left-[82vw] md:left-[470px]" : "relative left-0"
      }`}
      aria-label="Toggle Menu"
    >
      <span
        className={`shadow-[_2px_2px_0px_rgb(0_0_0_/_0.25)] block w-8 h-1 bg-[#FFF04D] transition-all duration-100 ${
          isOpen ? "shadow-none rotate-45 translate-y-2.5 bg-[#FFF04D]" : ""
        }`}
      ></span>
      <span
        className={`shadow-[_2px_2px_0px_rgb(0_0_0_/_0.25)] block w-8 h-1 bg-[#FFF04D] transition-opacity duration-100 ${
          isOpen ? "opacity-0" : ""
        }`}
      ></span>
      <span
        className={`shadow-[_2px_2px_0px_rgb(0_0_0_/_0.25)] block w-8 h-1 bg-[#FFF04D] transition-all duration-100 ${
          isOpen ? "shadow-none -rotate-45 -translate-y-2.5 bg-[#FFF04D]" : ""
        }`}
      ></span>
    </button>
  );
}

/* fixed the closing logic, so that the close X isnt hidden behind the menu */
