import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, Package, X } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router"
import { useLogoutMutation, authApi } from "@/redux/features/auth/auth.api"
import { useGetProfileQuery } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/redux/store"

// Separate pages
const pageLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
]

// Landing page sections
const sectionLinks = [
  { path: "#services", label: "Services" },
  { path: "#how-it-works", label: "How It Works" },
  { path: "#pricing", label: "Pricing" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [logout] = useLogoutMutation()
  const { data: profileData, isLoading, refetch } = useGetProfileQuery(undefined,{
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })

  // Only show section links if we are on the home page
  const isHomePage = location.pathname === "/"

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      toast.success("Logged out successfully!")
      // Reset the auth API state to clear cached data
      dispatch(authApi.util.resetApiState())
      navigate('/')
    } catch (err) {
      toast.error("Logout failed!")
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Package className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
            SwiftShip
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {pageLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-foreground hover:text-primary transition-smooth"
            >
              {link.label}
            </Link>
          ))}

          {isHomePage &&
            sectionLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="text-foreground hover:text-primary transition-smooth"
              >
                {link.label}
              </a>
            ))}
        </nav>

        {/* Buttons */}
        <div className="flex items-center space-x-3">
          {profileData ? (
            <>
              <Button variant="ghost" className="hidden md:inline-flex" onClick={handleLogout}>
                Logout
              </Button>
              <Link to={`/dashboard/${profileData?.data?.role}`}><Button className="gradient-hero hover-glow">Dashboard</Button></Link>
            </>
          ) : (
            <>
              <Button variant="ghost" className="hidden md:inline-flex" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button className="gradient-hero hover-glow" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </>
          )}

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t">
          <nav className="flex flex-col space-y-4 px-4 py-6">
            {pageLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {isHomePage &&
              sectionLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className="text-foreground hover:text-primary transition-smooth"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}

            {profileData ? (
              <>
                <Button variant="ghost" className="w-full" onClick={handleLogout}>
                  Logout
                </Button>
                <Link to={`/dashboard/${profileData?.data?.role}`}>
                  <Button className="gradient-hero hover-glow w-full">
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button variant="ghost" className="w-full" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button className="gradient-hero hover-glow w-full" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
