import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  PercentCircle,
  ShoppingCartIcon,
  UsersIcon,
  Shield,
  TicketIcon,
  DatabaseIcon,
  FileTextIcon,
  FileChartColumnIcon,
  LogOutIcon,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { useAdminAuthStore } from "@/stores/adminAuthStore";

const ADMIN_ROLE = "ADMIN";
const DATA_EDITOR_ROLE = "DATA_EDITOR";

const AdminSideBar = () => {
  const location = useLocation();
  const { admin, setAdmin } = useAdminAuthStore();
  const navigate = useNavigate();
  const menuItems = [
    {
      group: "Overview",
      items: [
        {
          title: "Dashboard",
          href: "/admin/dashboard",
          icon: LayoutDashboardIcon,
          role: ADMIN_ROLE,
        },
      ],
    },
    {
      group: "Management",
      items: [
        {
          title: "Passes",
          href: "/admin/passes",
          icon: TicketIcon,
          role: ADMIN_ROLE,
        },
        {
          title: "Users",
          href: "/admin/users",
          icon: UsersIcon,
          role: ADMIN_ROLE,
        },
        {
          title: "Reports",
          href: "/admin/reports",
          icon: ShoppingCartIcon,
          role: ADMIN_ROLE,
        },
        {
          title: "Transactions",
          href: "/admin/transactions",
          icon: PercentCircle,
          role: ADMIN_ROLE,
        },
        {
          title: "Database",
          href: "/admin/database",
          icon: DatabaseIcon,
          role: DATA_EDITOR_ROLE,
        },
        {
          title: "Logs",
          href: "/admin/logs",
          icon: FileTextIcon,
          role: DATA_EDITOR_ROLE,
        },
        {
          title: "PDF Report",
          href: "/admin/admin-report",
          icon: FileChartColumnIcon,
          role: DATA_EDITOR_ROLE,
        },
      ],
    },
  ];

  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      className="overflow-hidden bg-white "
    >
      <SidebarHeader className="border-b border-gray-100 bg-gray-50">
        <SidebarMenu>
          <SidebarMenuButton className="hover:bg-gray-100 data-[state=open]:bg-gray-100">
            <div className="flex items-center gap-3  py-1">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-lg">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">
                  Admin Portal
                </span>
              </div>
            </div>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        {menuItems.map((section) => (
          <SidebarGroup key={section.group} className="">
            <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">
              {section.group}
            </SidebarGroupLabel>
            <SidebarMenu>
              {section.items.map((item) => {
                const isActive = location.pathname === item.href;
                if (admin?.role !== item.role) {
                  return null;
                }
                return (
                  <SidebarMenuButton
                    key={item.href}
                    asChild
                    className={cn(
                      " rounded-md transition-colors duration-200",
                      isActive
                        ? "bg-gray-900 !text-white hover:bg-gray-800"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <Link
                      to={item.href}
                      className="flex items-center gap-3 px-3 py-2"
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuButton
            className="cursor-pointer"
            onClick={() => {
              setAdmin(null);
              navigate("/admin/login");
            }}
          >
            <LogOutIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSideBar;
