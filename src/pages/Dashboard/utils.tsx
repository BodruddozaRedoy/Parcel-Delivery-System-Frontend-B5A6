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
import { Package } from "lucide-react"

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
      // {
      //   title: "Lifecycle",
      //   url: "#",
      //   icon: IconListDetails,
      // },
      // {
      //   title: "Analytics",
      //   url: "#",
      //   icon: IconChartBar,
      // },
      // {
      //   title: "Projects",
      //   url: "#",
      //   icon: IconFolder,
      // },
      // {
      //   title: "Team",
      //   url: "#",
      //   icon: IconUsers,
      // },
      {
        title: "Visit Site",
        url: "/",
        icon: IconWebhook,
      },

    ],
    navClouds: [
      {
        title: "Capture",
        icon: IconCamera,
        isActive: true,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Proposal",
        icon: IconFileDescription,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Prompts",
        icon: IconFileAi,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
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