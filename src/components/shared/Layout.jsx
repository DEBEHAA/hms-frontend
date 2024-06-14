import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-[100dvh]">
      <Navbar />
      <div className="min-h-[calc(100vh-140px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
