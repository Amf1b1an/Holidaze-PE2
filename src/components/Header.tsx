import { useNavigate, Link } from "react-router-dom";
import { User } from "lucide-react";
import Hamburger from "./Hamburger";

interface HeaderProps {
  subtitle?: string;
}

export default function Header({
  subtitle = "BOOK YOUR HOLIDAY NOW",
}: HeaderProps) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("name");

  return (
    <header className="mb-12 mt-24 flex flex-row items-center justify-between w-full gap-24">
      <div className="hidden md:flex justify-start md:flex-1">
        <Hamburger />
      </div>

      <div className="flex flex-col text-center flex-grow">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-semibold text-[#FFF04D] tracking-[6.40px] md:[text-shadow:_3px_5px_0px_rgb(0_0_0_/_0.25)] [text-shadow:_2px_3px_0px_rgb(0_0_0_/_0.25)] mb-4 uppercase">
          <a href="/"> HOLIDAZE</a>
        </h1>
        <h2 className="text-[#FFF04D] text-3xl md:text-4xl font-semibold tracking-[4px] [text-shadow:_2px_2px_0px_rgb(0_0_0_/_0.25)] uppercase break-words">
          {subtitle}
        </h2>
      </div>
      <div className="hidden md:flex items-center md:flex-1 justify-end">
        {token ? (
          <Link
            to="/profile"
            className="p-3 rounded-full border-2 border-[#FFF04D] text-[#FFF04D] hover:bg-[#007878] transition-all flex items-center gap-2 group shadow-[_3px_3px_0px_rgb(0_0_0_/_0.25)]"
            title={`Logged in as ${username}`}
          >
            <User size={24} />
          </Link>
        ) : (
          <div className="flex gap-4 flex-col lg:flex-row lg:gap-2">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-[#FFF04D] font-bold border-b-2 border-transparent hover:border-[#FFF04D] transition-all"
            >
              LOGIN
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 bg-[#FFF04D] text-[#007878] font-bold rounded-full hover:bg-white transition-all shadow-md"
            >
              REGISTER
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
