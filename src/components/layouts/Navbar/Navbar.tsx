import { Button } from '@/components/ui/button'
import { Menu, Package } from 'lucide-react'
import React from 'react'

export default function Navbar() {
    return (
        <div>
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Package className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
                            SwiftShip
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-6">
                        <a href="#services" className="text-foreground hover:text-primary transition-smooth">
                            Services
                        </a>
                        <a href="#how-it-works" className="text-foreground hover:text-primary transition-smooth">
                            How It Works
                        </a>
                        <a href="#pricing" className="text-foreground hover:text-primary transition-smooth">
                            Pricing
                        </a>
                        <a href="#contact" className="text-foreground hover:text-primary transition-smooth">
                            Contact
                        </a>
                    </nav>

                    <div className="flex items-center space-x-3">
                        <Button variant="ghost" className="hidden md:inline-flex">
                            Sign In
                        </Button>
                        <Button className="gradient-hero hover-glow">
                            Get Started
                        </Button>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </header>
        </div>
    )
}
