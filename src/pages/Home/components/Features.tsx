import { Card, CardContent } from "@/components/ui/card";
import { 
  Truck, 
  MapPin, 
  Shield, 
  Clock, 
  Package, 
  CreditCard 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Fast Delivery",
      description: "Express shipping with guaranteed delivery times. Same-day and next-day options available."
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Real-time Tracking",
      description: "Track your packages in real-time with GPS precision and receive instant notifications."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Safe",
      description: "Your packages are protected with comprehensive insurance and secure handling protocols."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you with any delivery concerns or questions."
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "Smart Packaging",
      description: "Eco-friendly packaging solutions that protect your items while caring for the environment."
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Flexible Payment",
      description: "Multiple payment options including cash on delivery, card payments, and digital wallets."
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            Why Choose <span className="gradient-hero bg-clip-text text-transparent">SwiftShip</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We provide comprehensive delivery solutions with cutting-edge technology 
            and unmatched customer service.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover-lift transition-smooth animate-scale-in border-0 shadow-elevated"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;