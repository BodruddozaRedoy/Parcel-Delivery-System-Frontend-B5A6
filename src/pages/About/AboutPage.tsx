import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Package } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6 text-center">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-hero bg-clip-text text-transparent">
          About SwiftShip
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          We’re on a mission to make parcel delivery fast, reliable, and effortless.  
          SwiftShip is built for businesses and individuals who value time and trust.  
        </p>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
          <div className="text-left">
            <h2 className="text-3xl font-semibold mb-4 text-primary">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              At SwiftShip, our mission is simple: 
              <span className="font-semibold text-foreground"> connect people and businesses through seamless delivery.</span>  
              We believe shipping should be transparent, fast, and affordable without compromising reliability.  
            </p>
          </div>
          <div className="flex justify-center">
            <Target className="h-40 w-40 text-primary animate-pulse" />
          </div>
        </div>

        {/* Values Section */}
        <h2 className="text-3xl font-semibold mb-8">What We Stand For</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="shadow-md hover:shadow-lg transition rounded-2xl">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Package className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reliability</h3>
              <p className="text-muted-foreground">
                Your parcels are in safe hands. We ensure on-time deliveries with live tracking.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition rounded-2xl">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Target className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Efficiency</h3>
              <p className="text-muted-foreground">
                From pickup to drop-off, our system is optimized to minimize delays.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition rounded-2xl">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">
                We work hand-in-hand with local businesses and customers to build trust.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <h2 className="text-3xl font-semibold mb-8">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Ahmed", role: "Founder & CEO" },
            { name: "Michael Lee", role: "CTO" },
            { name: "Emily Johnson", role: "Operations Manager" },
          ].map((member) => (
            <Card
              key={member.name}
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <CardContent className="p-6 flex flex-col items-center">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    member.name
                  )}&background=random&size=100`}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
