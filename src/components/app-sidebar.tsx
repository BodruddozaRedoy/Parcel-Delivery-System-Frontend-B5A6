import * as React from "react"


import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Package } from "lucide-react"
import { Link } from "react-router"
import { data } from "@/pages/Dashboard/utils"
// import { data } from "@/pages/Dashboard/utils"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to={"/"}>
                {/* Logo */}
                <div className="flex items-center space-x-2">
                  <Package className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
                    SwiftShip
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data().navMain} />
        {/* <NavDocuments items={data().documents} /> */}
        <NavSecondary items={data().navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data().user} />
      </SidebarFooter>
    </Sidebar>
  )
}
