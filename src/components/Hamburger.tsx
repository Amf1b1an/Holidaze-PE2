import { useMenu } from "../context/MenuContext";

export default function Hamburger() {
  const { isOpen, toggleMenu } = useMenu();

  return (
    <button
      onClick={toggleMenu}
      className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 z-50 relative"
      aria-label="Toggle Menu"
    >
      <span
        className={`shadow-[_2px_2px_0px_rgb(0_0_0_/_0.25)] block w-8 h-1 bg-[#FFF04D] transition-transform duration-300 ${isOpen ? "shadow-[_0px_0px_0px_rgb(0_0_0_/_0.25)] rotate-45 translate-y-2.5" : ""}`}
      ></span>
      <span
        className={`shadow-[_2px_2px_0px_rgb(0_0_0_/_0.25)] block w-8 h-1 bg-[#FFF04D] transition-opacity duration-300 ${isOpen ? "shadow-[_0px_0px_0px_rgb(0_0_0_/_0.25)] opacity-0" : ""}`}
      ></span>
      <span
        className={`shadow-[_2px_2px_0px_rgb(0_0_0_/_0.25)] block w-8 h-1 bg-[#FFF04D] transition-transform duration-300 ${isOpen ? "shadow-[_0px_0px_0px_rgb(0_0_0_/_0.25)] -rotate-45 -translate-y-2.5" : ""}`}
      ></span>
    </button>
  );
}
