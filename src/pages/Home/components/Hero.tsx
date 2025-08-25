import { Button } from '@/components/ui/button'
import { ArrowRight, Clock, Globe, Shield } from 'lucide-react'
import TrackParcelModal from './TrackParcelModal'
// import heroImage from "@/assets/hero-delivery.jpg";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center gradient-subtle overflow-hidden">
            {/* Floating elements */}
            <div className="absolute top-20 right-10 w-20 h-20 bg-primary/10 rounded-full animate-float" />
            <div className="absolute top-40 left-10 w-16 h-16 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-20 right-1/4 w-12 h-12 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '2s' }} />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="animate-fade-in">
                    <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Shield className="w-4 h-4 mr-2" />
                        Trusted by 10,000+ businesses
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        <span className="gradient-hero bg-clip-text text-transparent">Fast & Reliable</span>
                        <br />
                        Parcel Delivery
                    </h1>

                    <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        Experience seamless delivery solutions with real-time tracking,
                        guaranteed delivery times, and worldwide coverage. Your packages,
                        delivered with precision.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <Button size="lg" className="gradient-hero hover-glow text-lg px-8 py-6">
                            Start Shipping Today
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <TrackParcelModal/>
                    </div>

                    <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-primary" />
                            24/7 Support
                        </div>
                        <div className="flex items-center">
                            <Globe className="h-5 w-5 mr-2 text-primary" />
                            190+ Countries
                        </div>
                    </div>
                </div>

                <div className="lg:animate-slide-up">
                    <div className="relative">
                        <img
                            src={"https://static.vecteezy.com/system/resources/previews/008/555/076/non_2x/food-delivery-man-with-scooter-holding-fast-food-box-on-mobile-phone-background-fast-food-delivery-service-in-cartoon-design-concept-illustration-vector.jpg"}
                            alt="Modern parcel delivery service"
                            className="rounded-2xl shadow-elevated w-full hover-lift"
                        />
                        <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-accent font-semibold">
                            📦 99.9% On-Time
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-card text-card-foreground px-4 py-2 rounded-lg shadow-elevated font-semibold">
                            ⚡ Express Delivery
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
