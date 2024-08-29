import ServiceManagement from "../pages/admin/ServiceManagemnet";
import SlotManagement from "../pages/admin/SlotManagement";
import UserManagement from "../pages/admin/userManagement";

export const adminPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: "Admin Dashboard",
    },
    {
        name: "Service Management",
        path: "service-management",
        element: <ServiceManagement />,
    },
    {
        name: "Slot Management",
        path: "slot-management",
        element: <SlotManagement />,
    }, 
    {
        name: "User Management",
        path: "user-management",
        element: <UserManagement />,
    }, 
]