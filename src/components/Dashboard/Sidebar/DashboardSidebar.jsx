import Loader from "@/components/shared/Loader";
import useMenuItems from "@/hooks/useMenuItems";
import { useStore } from "@/store";
import { useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import MenuLink from "./MenuLink";

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const user = useStore((state) => state.user);
  const menuItems = useMenuItems();

  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  return (
    <div
      className={`group invisible fixed left-0 top-0 z-50 h-full w-full bg-black/10 opacity-0 backdrop-blur-[2px] duration-300 lg:visible lg:static lg:opacity-100 [&.active]:visible [&.active]:opacity-100 [&.active]:duration-100 ${
        sidebarOpen ? "active" : ""
      }`}
      onClick={(e) => e.target.classList.contains("group") && closeSidebar()}
    >
      <aside className="sidebar h-full w-64 -translate-x-full bg-white duration-300 group-[&.active]:-translate-x-0 lg:w-full lg:-translate-x-0 lg:border-r lg:border-[#eee]/70">
        <div className="flex h-16 items-center overflow-hidden border-b border-[#eee]/70 px-8 sm:h-20">
          <NavLink to="/">
            <img className="h-7" src="/logo.png" alt="Patientoo" />
          </NavLink>
        </div>
        <div className="sidebarContent h-[calc(100vh-64px)] overflow-y-auto pb-5 sm:h-[calc(100vh-80px)] sm:pb-10">
          {user && (
            <>
              <p className="px-8 py-4 text-xs font-medium uppercase text-blue">
                Menu
              </p>
              <nav className="flex flex-col gap-1 sm:gap-1.5">
                {menuItems[user.role].map(({ title, path, icon }, index) => (
                  <MenuLink path={path} title={title} icon={icon} key={index} />
                ))}
                <hr className="border-gray-200/70" />
                <MenuLink path="profile" title="Profile" icon={<FiUser />} />
                <LogoutButton />
              </nav>
            </>
          )}
          {!user && (
            <div className="flex h-full items-center justify-center">
              <Loader />
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default DashboardSidebar;
