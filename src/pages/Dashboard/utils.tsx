import { useGetProfileQuery } from "@/redux/features/auth/auth.api"
import {
  IconDashboard,
  IconDatabase,
  IconFileWord,
  IconHelp,
  IconReport,
  IconSearch,
  IconSettings,
  IconWebhook,
} from "@tabler/icons-react"
import { Package, User } from "lucide-react"

export const data = () => {
  const { data: user } = useGetProfileQuery()
  const role = user?.data?.role

  // Role wise navigation
  const navLinks: Record<string, any[]> = {
    admin: [
      {
        title: "Dashboard",
        url: "/dashboard/admin",
        icon: IconDashboard,
      },
      {
        title: "Parcel",
        url: "/dashboard/parcel/admin",
        icon: Package,
      },
      {
        title: "User",
        url: "/dashboard/user",
        icon: User,
      },
      // {
      //   title: "Delivery History",
      //   url: "/dashboard/deliver-history",
      //   icon: Package,
      // },
      {
        title: "Visit Site",
        url: "/",
        icon: IconWebhook,
      },
    ],
    sender: [
      {
        title: "Dashboard",
        url: "/dashboard/sender",
        icon: IconDashboard,
      },
      {
        title: "Send Parcel",
        url: "/dashboard/parcel/sender",
        icon: Package,
      },
      // {
      //   title: "Delivery History",
      //   url: "/dashboard/deliver-history",
      //   icon: Package,
      // },
      {
        title: "Visit Site",
        url: "/",
        icon: IconWebhook,
      },
    ],
    receiver: [
      {
        title: "Dashboard",
        url: "/dashboard/receiver",
        icon: IconDashboard,
      },
      {
        title: "My Parcels",
        url: "/dashboard/parcel/receiver",
        icon: Package,
      },
      {
        title: "Delivery History",
        url: "/dashboard/deliver-history",
        icon: Package,
      },
      {
        title: "Visit Site",
        url: "/",
        icon: IconWebhook,
      },
    ],
  }

  return {
    user: {
      name: user?.data?.fullName,
      email: user?.data?.email,
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: navLinks[role || ""] || [],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
      },
      {
        title: "Get Help",
        url: "#",
        icon: IconHelp,
      },
      {
        title: "Search",
        url: "#",
        icon: IconSearch,
      },
    ],
    documents: [
      {
        name: "Data Library",
        url: "#",
        icon: IconDatabase,
      },
      {
        name: "Reports",
        url: "#",
        icon: IconReport,
      },
      {
        name: "Word Assistant",
        url: "#",
        icon: IconFileWord,
      },
    ],
  }
}
