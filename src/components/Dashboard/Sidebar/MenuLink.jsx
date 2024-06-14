import { NavLink } from "react-router-dom";

const MenuLink = ({ path, title, icon }) => (
  <NavLink
    to={`${path}`}
    className={
      "dashboardMenu flex items-center gap-3 border-white px-8 py-3 font-light text-[#808080] duration-300 hover:bg-[#e2f0fe] hover:text-blue sm:py-3.5 sm:text-base [&.active]:border-r-4 [&.active]:border-blue [&.active]:bg-[#e2f0fe] [&.active]:text-blue"
    }
  >
    <span className="text-lg sm:text-xl">{icon}</span>
    <span className="text-xs sm:text-sm">{title}</span>
  </NavLink>
);

export default MenuLink;
