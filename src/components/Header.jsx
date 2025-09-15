import { Menu } from "lucide-react";
import Logo from "./Logo";

function Header() {
  return (
    <nav className="relative flex items-center justify-center -mb-32">
      <div className="logo ">
        <Logo
          width="130"
          height="130"
          fill="#3c2f2f"
          className="cursor-pointer"
        />
      </div>
    </nav>
  );
}

export default Header;
