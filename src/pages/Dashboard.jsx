import DashboardSidebar from "@/components/Dashboard/Sidebar/DashboardSidebar";
import DashboardSkeleton from "@/components/Dashboard/shared/DashboardSkeleton";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Dashboard = ({ allowedRoles }) => {
  const { isLoading, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user && !isLoading) return <Navigate to="/login" />;

  if (!isLoading && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/" />;
  }

  if (isLoading) return <DashboardSkeleton />;

  return (
    <>
      <main className="grid h-screen grid-cols-1 bg-lightBG lg:grid-cols-[280px_1fr]">
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="h-full w-full overflow-hidden">
          <Outlet context={[sidebarOpen, setSidebarOpen]} />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
