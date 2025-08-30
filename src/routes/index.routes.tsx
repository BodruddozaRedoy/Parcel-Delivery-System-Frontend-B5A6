import MainLayout from "@/layouts/MainLayout";
import AboutPage from "@/pages/About/AboutPage";
import animation from "@/pages/animation";
import ContactPage from "@/pages/Contact/ContactPage";
import ProtectedDashboardLayout from "@/layouts/ProtectedDashboardLayout";
import HomePage from "@/pages/Home/HomePage";
import LoginPage from "@/pages/Login/LoginPage";
import RegisterPage from "@/pages/Register/RegisterPage";
import { createBrowserRouter } from "react-router";
import demo from "@/pages/demo";
import {
  AdminDashboardRoute,
  ReceiverDashboardRoute,
  SenderDashboardRoute,
  AdminParcelRoute,
  SenderParcelRoute,
  ReceiverParcelRoute,
  AdminUserRoute,
  ReceiverDeliveryHistoryRoute,
} from "@/routes/role-routes";

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
        Component: ProtectedDashboardLayout,
        children: [
            { path: "sender", Component: SenderDashboardRoute },
            { path: "receiver", Component: ReceiverDashboardRoute },
            { path: "admin", Component: AdminDashboardRoute },
            { path: "parcel/sender", Component: SenderParcelRoute },
            { path: "parcel/receiver", Component: ReceiverParcelRoute },
            { path: "parcel/admin", Component: AdminParcelRoute },
            { path: "user", Component: AdminUserRoute },
            { path: "deliver-history", Component: ReceiverDeliveryHistoryRoute }
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
