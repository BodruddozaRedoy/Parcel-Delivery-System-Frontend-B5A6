import MainLayout from "@/layouts/MainLayout";
import AboutPage from "@/pages/About/AboutPage";
import animation from "@/pages/animation";
import ContactPage from "@/pages/Contact/ContactPage";
import DashboardPage from "@/pages/Dashboard/components/DashboardPage";
import DashboardLayout from "@/layouts/DashboardLayout";
import ReceiverParcel from "@/pages/Dashboard/Receiver/ReceiverParcel";
import SenderParcel from "@/pages/Dashboard/Sender/SenderParcel";
import HomePage from "@/pages/Home/HomePage";
import LoginPage from "@/pages/Login/LoginPage";
import RegisterPage from "@/pages/Register/RegisterPage";
import { createBrowserRouter } from "react-router";
import AdminParcel from "@/pages/Dashboard/Admin/AdminParcel";
import UserPage from "@/pages/Dashboard/Admin/UserPage";
import DeliveryHistory from "@/pages/Dashboard/Receiver/DeliveryHistory";
import demo from "@/pages/demo";

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
        Component: DashboardLayout,
        children: [
            {
                path: "sender",
                Component: DashboardPage
            },
            {
                path: "receiver",
                Component: DashboardPage
            },
            {
                path: "admin",
                Component: DashboardPage
            },
            {
                path: 'parcel/sender',
                Component: SenderParcel
            },
            {
                path: "parcel/receiver",
                Component: ReceiverParcel
            },
            {
                path: "parcel/admin",
                Component: AdminParcel
            },
            {
                path: "user",
                Component: UserPage
            },
            {
                path: "deliver-history",
                Component: DeliveryHistory
            }
        ]
    },
    {
        path: "/animation",
        Component: animation
    },
    {
        path: "/demo",
        Component: demo
    }
])