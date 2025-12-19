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
                path: "*", 
                Component: Error404 
            }
        ]
    }
])