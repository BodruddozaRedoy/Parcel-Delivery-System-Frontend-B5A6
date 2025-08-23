import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useGetProfileQuery } from "@/redux/features/auth/auth.api"
import LoadingScreen from "@/components/common/LoadingScreen"
import { Outlet } from "react-router"


export default function DashboardLayout() {
    const { isLoading } = useGetProfileQuery()
    return (
        <>
            {
                isLoading ? <LoadingScreen /> : <SidebarProvider
                    style={
                        {
                            "--sidebar-width": "calc(var(--spacing) * 72)",
                            "--header-height": "calc(var(--spacing) * 12)",
                        } as React.CSSProperties
                    }
                >
                    <AppSidebar variant="inset" />
                    <SidebarInset>
                        <SiteHeader/>
                        <div className="">
                            <Outlet/>
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            }
        </>
    )
}
