import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register.jsx";
import Error404 from "../Pages/Shared/Error404.jsx";
import ForgotPassword from "../Pages/Auth/ForgotPassword.jsx";
import Contact from "../Pages/Contact.jsx";
import About from "../Pages/About.jsx";
import WhyChooseUs from "../Pages/WhyChooseUs.jsx";
import AllTickets from "../Pages/All Tickets/AllTickets.jsx";
import TicketDetails from "../Pages/All Tickets/TicketDetails.jsx";
import PrivateRoute from "../Pages/Private/PrivateRoute.jsx";
import DashboardLayout from "../Layouts/DashboardLayout.jsx";
import UserProfile from "../Pages/Dashboard/User/UserProfile.jsx";
import MyBookedTickets from "../Pages/Dashboard/User/MyBookedTickets.jsx";
import TransactionHistory from "../Pages/Dashboard/User/TransactionHistory.jsx";
import VendorProfile from "../Pages/Dashboard/Vendor/VendorProfile.jsx";
import AddTicket from "../Pages/Dashboard/Vendor/AddTicket.jsx";
import MyAddedTickets from "../Pages/Dashboard/Vendor/MyAddedTickets.jsx";
import RequestedBookings from "../Pages/Dashboard/Vendor/RequestedBookings.jsx";
import RevenueOverview from "../Pages/Dashboard/Vendor/RevenueOverview.jsx";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile.jsx";
import ManageTickets from "../Pages/Dashboard/Admin/ManageTickets.jsx";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers.jsx";
import AdvertiseTickets from "../Pages/Dashboard/Admin/AdvertiseTickets.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "login",
                Component: Login,
            },
            {
                path: "register",
                Component: Register
            },
            {
                path: 'login/forgot-password',
                Component: ForgotPassword
            },
            {
                path: 'contact',
                Component: Contact
            },
            {
                path: 'about',
                Component: About
            },
            {
                path: 'why-choose-us',
                Component: WhyChooseUs
            },
            {
                path: 'all-tickets',
                element: <PrivateRoute>
                    <AllTickets />
                </PrivateRoute>
            },
            {
                path: 'tickets/:id',
                element: <PrivateRoute>
                    <TicketDetails />
                </PrivateRoute>
            },

            {
                path: "*",
                Component: Error404
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>,
        errorElement: <Error404 />,
        children: [
            // user routes
            {
                path: '/dashboard/user/profile',
                element: <PrivateRoute>
                    <UserProfile />
                </PrivateRoute>
            },
            {
                path: '/dashboard/user/bookings',
                element: <PrivateRoute>
                    <MyBookedTickets />
                </PrivateRoute>
            },
            {
                path: '/dashboard/user/transactions',
                element: <PrivateRoute>
                    <TransactionHistory />
                </PrivateRoute>
            },
            // Vendor Routes
            {
                path: "/dashboard/vendor/profile",
                element: <PrivateRoute>
                    <VendorProfile />
                </PrivateRoute>
            },
            {
                path: "/dashboard/vendor/add-ticket",
                element: <PrivateRoute>
                    <AddTicket />
                </PrivateRoute>
            },
            {
                path: "/dashboard/vendor/my-tickets",
                element: <PrivateRoute>
                    <MyAddedTickets />
                </PrivateRoute>
            },

            {
                path: "/dashboard/vendor/requests",
                element: <PrivateRoute>
                    <RequestedBookings />
                </PrivateRoute>
            },

            {
                path: "/dashboard/vendor/revenue",
                element: <PrivateRoute>
                    <RevenueOverview />
                </PrivateRoute>
            },

            //Admin Routes 
            {
                path: "/dashboard/admin/profile",
                element: <PrivateRoute>
                    <AdminProfile />
                </PrivateRoute>
            },

            {
                path: "/dashboard/admin/manage-tickets",
                element: <PrivateRoute>
                    <ManageTickets />
                </PrivateRoute>
            },

            {
                path: "/dashboard/admin/manage-users",
                element: <PrivateRoute>
                    <ManageUsers />
                </PrivateRoute>
            },

            {
                path: "/dashboard/admin/advertise",
                element: <PrivateRoute>
                    <AdvertiseTickets />
                </PrivateRoute>
            },




        ]
    }
])