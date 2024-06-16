import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DesktopNavItems from "./DesktopNavItems";
import MobileNavItems from "./MobileNavItems";

const navItems = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Blog", path: "/blogs" },
  { title: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const { isLoading, user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  return (
    <header className="bg-white py-4 md:py-5">
      <div className="container flex items-center justify-between">
        <Link to="/">
          {/* <img className="h-8 md:h-9" src="/logo1.png" alt="HMS" /> */}
        </Link>
        <DesktopNavItems items={navItems} user={user} isLoading={isLoading} />
        <MobileNavItems
          user={user}
          items={navItems}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          isLoading={isLoading}
        />
      </div>
    </header>
  );
};

export default Navbar;
