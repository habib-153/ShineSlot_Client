import PastBookings from "../pages/user/PastBookings";
import UpcomingBookings from "../pages/user/UpcomingBookings";
import UserDashboard from "../pages/user/UserDashboard";

export const userPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <UserDashboard />
    },
    {
        name: "Past Bookings",
        path: "past-bookings",
        element: <PastBookings />
    },
    {
        name: "Upcoming Bookings",
        path: "upcoming-bookings",
        element: <UpcomingBookings />
    },  
]