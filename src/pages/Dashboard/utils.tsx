import { useGetProfileQuery } from "@/redux/features/auth/auth.api"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconWebhook,
} from "@tabler/icons-react"
import { Package, User } from "lucide-react"

export const data = () => {
  const { data: user } = useGetProfileQuery()
  console.log(user)

  return {
    user: {
      name: user?.data?.fullName,
      email: user?.data?.email,
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: `/dashboard/${user?.data?.role}`,
        icon: IconDashboard,
      },
      {
        title: "Parcel",
        url: `/dashboard/parcel/${user?.data?.role}`,
        icon: Package,
      },
      {
        title: "User",
        url: `/dashboard/user`,
        icon: User,
      },
      {
        title: "Delivery History",
        url: `/dashboard/deliver-history`,
        icon: Package,
      },
      {
        title: "Visit Site",
        url: "/",
        icon: IconWebhook,
      },

    ],


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