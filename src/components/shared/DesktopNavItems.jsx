import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const DesktopNavItems = ({ items, user, isLoading }) => {
  return (
    <nav className="hidden lg:block">
      <ul className="hidden items-center gap-x-6 text-[15px] font-medium md:flex">
        {items.map((item) => (
          <li key={item.title}>
            <NavLink
              to={item.path}
              activeclassname="active"
              className="[&.active]:text-blue"
            >
              {item.title}
            </NavLink>
          </li>
        ))}
        <li>
          {!isLoading ? (
            <NavLink
              to={user ? `/dashboard/${user.role}` : "/login"}
              activeclassname="active"
              className="[&.active]:text-blue"
            >
              {user ? "Dashboard" : "Login"}
            </NavLink>
          ) : (
            <Skeleton className="h-6 w-20" />
          )}
        </li>
        <li>
          <NavLink
            className={cn(
              buttonVariants({ variant: "outline" }),
              "[&.active]:border-blue/50 [&.active]:text-blue",
            )}
            to="/doctors"
            variant="outline"
          >
            Find Doctor
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNavItems;
