import React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link, useLocation } from "react-router"

const PATH_TITLES: Record<string, string> = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/dashboard/parcel/sender": "Sender Parcels",
  "/dashboard/parcel/receiver": "Receiver Parcels",
  "/dashboard/parcel/admin": "Admin Parcels",
  "/dashboard/sender": "Sender",
  "/dashboard/receiver": "Receiver",
  "/dashboard/admin": "Admin",
  "/dashboard/user": "Users",
  "/dashboard/deliver-history": "Delivery History",
  "/about": "About",
  "/contact": "Contact",
  "/login": "Login",
  "/register": "Register",
}

const NAVIGABLE_PATHS = new Set<string>([
  "/",
  "/dashboard",
  "/dashboard/parcel/sender",
  "/dashboard/parcel/receiver",
  "/dashboard/parcel/admin",
  "/dashboard/sender",
  "/dashboard/receiver",
  "/dashboard/admin",
  "/dashboard/user",
  "/dashboard/deliver-history",
  "/about",
  "/contact",
  "/login",
  "/register",
])

function toTitle(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function SiteHeader() {
  const location = useLocation()

  const segments = location.pathname
    .split("/")
    .filter(Boolean)

  const crumbs = ["/", ...segments.map((_, i) => "/" + segments.slice(0, i + 1).join("/"))]

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />

        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((path, idx) => {
              const isLast = idx === crumbs.length - 1
              const lastSegment = path.split("/").filter(Boolean).pop() || "Home"
              const label = PATH_TITLES[path] ?? toTitle(lastSegment)

              return (
                <React.Fragment key={path}>
                  <BreadcrumbItem>
                    {isLast || !NAVIGABLE_PATHS.has(path) ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={path}>{label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
