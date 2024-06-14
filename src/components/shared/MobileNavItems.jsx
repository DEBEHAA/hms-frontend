import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CgClose, CgMenu } from "react-icons/cg";
import { Link, NavLink } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const MobileNavItems = ({ user, items, showMenu, setShowMenu, isLoading }) => {
  return (
    <div className="lg:hidden">
      <Sheet open={showMenu} onOpenChange={setShowMenu}>
        <SheetTrigger className="flex items-center justify-center">
          <span className="text-[32px] text-blue lg:hidden">
            {showMenu ? <CgClose /> : <CgMenu />}
          </span>
        </SheetTrigger>
        <SheetContent
          className="p-0 lg:hidden"
          overlayClassName="lg:hidden"
          side="left"
        >
          <SheetHeader>
            <Link className="flex h-[64px] items-center border-b px-6" to="/">
              <img className="h-8 pt-1.5" src="/logo.png" alt="Patientoo" />
            </Link>
          </SheetHeader>
          <div className="px-6 py-5">
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li key={item.title}>
                  <NavLink
                    to={item.path}
                    activeclassname="active"
                    className="block rounded-sm px-2.5 py-2 text-[15px] [&.active]:bg-[#E2F0FE] [&.active]:text-blue"
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
                    className="block rounded-sm px-2.5 py-2 text-[15px] [&.active]:bg-[#E2F0FE] [&.active]:text-blue"
                  >
                    {user ? "Dashboard" : "Login"}
                  </NavLink>
                ) : (
                  <Skeleton className="h-6 w-20" />
                )}
              </li>
              <li className="mt-1.5 px-2.5">
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
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavItems;
