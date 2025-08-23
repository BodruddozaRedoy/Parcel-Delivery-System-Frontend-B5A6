import MainLayout from "@/layouts/MainLayout";
import AboutPage from "@/pages/About/AboutPage";
import ContactPage from "@/pages/Contact/ContactPage";
import DashboardPage from "@/pages/Dashboard/DasboardPage";
import ReceiverParcel from "@/pages/Dashboard/Receiver/ReceiverParcel";
import SenderParcel from "@/pages/Dashboard/Sender/SenderParcel";
import HomePage from "@/pages/Home/HomePage";
import LoginPage from "@/pages/Login/LoginPage";
import RegisterPage from "@/pages/Register/RegisterPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: "/about",
                Component: AboutPage
            },
            {
                path: "/contact",
                Component: ContactPage
            }
        ]
    },
    {
        path: "/login",
        Component: LoginPage
    },
    {
        path: "/register",
        Component: RegisterPage
    },
    {
        path: "/dashboard",
        Component: DashboardPage,
        children: [
            {
                path: "sender",
                index: true
            },
            {
                path: "receiver",
                index: true
            },
            {
                path: "admin",
                index: true
            },
            {
                path: 'parcel/sender',
                Component: SenderParcel
            },
            {
                path: "parcel/receiver",
                Component: ReceiverParcel
            }
        ]
    }
])