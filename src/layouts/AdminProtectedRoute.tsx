import AdminSideBar from "@/components/Admin/AdminSideBar";
import { useAdminAuthStore } from "@/stores/adminAuthStore";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminTopNav from "@/components/Admin/AdminTopNav";

const AdminProtectedRoute = () => {
  const { admin } = useAdminAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!admin) {
      navigate("/admin/login");
    }
  }, [admin, navigate]);

  return (
    <div className="flex flex-row">
      <SidebarProvider>
        <AdminSideBar />
        <div className="flex flex-col flex-1">
          <AdminTopNav />
          <Outlet />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminProtectedRoute;
