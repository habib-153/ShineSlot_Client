import PastBookings from "../pages/user/PastBookings";
import UpcomingBookings from "../pages/user/UpcomingBookings";

export const userPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: "User Dashboard",
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