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
        className={`block w-8 h-1 bg-[#FFF04D] transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2.5" : ""}`}
      ></span>
      <span
        className={`block w-8 h-1 bg-[#FFF04D] transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}
      ></span>
      <span
        className={`block w-8 h-1 bg-[#FFF04D] transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
      ></span>
    </button>
  );
}
