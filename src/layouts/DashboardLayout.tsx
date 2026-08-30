import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Navbar, Sidebar, UserMenu, type SidebarItem } from "@mansi-manhas/navigation-ui";
import { useAuth } from "../auth/AuthContext";

const NAV_ITEMS: { id: string; label: string; path: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", path: "/", icon: <span aria-hidden="true">📊</span> },
  { id: "profile", label: "Profile", path: "/profile", icon: <span aria-hidden="true">👤</span> },
  { id: "settings", label: "Settings", path: "/settings", icon: <span aria-hidden="true">⚙️</span> },
];

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const sidebarItems: SidebarItem[] = useMemo(
    () =>
      NAV_ITEMS.map((item) => ({
        id: item.id,
        label: item.label,
        icon: item.icon,
        active: location.pathname === item.path,
        onClick: () => navigate(item.path),
      })),
    [location.pathname, navigate],
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar
        logo={
          <Typography variant="h6" sx={{ fontWeight: 700, color: "inherit" }}>
            Northwind
          </Typography>
        }
        userActions={
          <UserMenu
            name={user.name}
            email={user.email}
            avatarUrl={user.avatarUrl}
            items={[
              { id: "profile", label: "View profile", onClick: () => navigate("/profile") },
              { id: "settings", label: "Settings", onClick: () => navigate("/settings") },
              { id: "logout", label: "Log out", divider: true, destructive: true, onClick: logout },
            ]}
          />
        }
      />
      <Box sx={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar
          items={sidebarItems}
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed((prev) => !prev)}
          width={240}
          collapsedWidth={72}
        />
        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            p: { xs: 2, sm: 3, md: 4 },
            bgcolor: "background.default",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
