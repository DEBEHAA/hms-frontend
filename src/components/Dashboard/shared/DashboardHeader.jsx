import { useStore } from "@/store";
import { RiMenu3Line } from "react-icons/ri";
import { Link, useOutletContext } from "react-router-dom";

const DashboardHeader = ({ title, desc }) => {
  const [_sidebarOpen, setSidebarOpen] = useOutletContext();
  const {
    name,
    profile: { photo },
  } = useStore((state) => state.user);

  const toggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <div className="flex h-16 items-center gap-2 border-b border-[#eee]/70 bg-white px-3 sm:h-20 sm:gap-3 sm:px-5 xl:px-10">
      <button
        className="flex aspect-square w-9 items-center justify-center rounded-md border border-primary/10 bg-[#e2f0fe] text-primary sm:w-10 lg:hidden"
        onClick={toggleSidebar}
      >
        <span className="text-2xl">
          <RiMenu3Line />
        </span>
      </button>
      <div>
        <h1 className="mb-0.5 text-lg font-semibold text-[#1d1d1d] sm:text-xl">
          {title}
        </h1>
        <p className="hidden text-sm font-light leading-tight text-gray-400 sm:block">
          {desc}
        </p>
      </div>

      <Link to="../profile" className="group ml-auto flex items-center gap-2">
        <div className="aspect-square w-10 overflow-hidden rounded-full bg-gray-100 sm:w-11">
          <img
            src={
              photo
                ? photo
                : "https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png"
            }
            className="h-full w-full object-cover"
            alt={name}
          />
        </div>
        <div className="hidden flex-col sm:flex">
          <h4 className="font-medium leading-tight text-[#1d1d1d]">
            {name.split(" ")[0]}
          </h4>
          <p className="text-xs text-primary group-hover:underline">
            Visit Profile
          </p>
        </div>
      </Link>
    </div>
  );
};

export default DashboardHeader;
