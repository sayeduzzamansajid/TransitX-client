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
                path:"register",
                Component:Register
            },
            {
                path:'login/forgot-password',
                Component:ForgotPassword
            },
            {
                path:'contact',
                Component:Contact
            },
            {
                path:'about',
                Component:About
            },
            {
                path:'why-choose-us',
                Component:WhyChooseUs
            },
            {
                path:'all-tickets',
                element:<PrivateRoute>
                    <AllTickets/>
                </PrivateRoute>
            },
            {
                path:'tickets/:id',
                element:<PrivateRoute>
                    <TicketDetails/>
                </PrivateRoute>
            },

            { 
                path: "*", 
                Component: Error404 
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute>
            <DashboardLayout/>
        </PrivateRoute>,
        errorElement:<Error404/>,
        children:[
            {
                path:'/dashboard/User-profile',
                element:<PrivateRoute>
                    <UserProfile/>
                </PrivateRoute>
            },
            {
                path:'/dashboard/my-booked-tickets',
                element:<PrivateRoute>
                    <MyBookedTickets/>
                </PrivateRoute>
            },
            {
                path:'/dashboard/transaction-history',
                element:<PrivateRoute>
                    <TransactionHistory/>
                </PrivateRoute>
            }
        ]
    }
])