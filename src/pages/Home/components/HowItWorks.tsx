import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package2, CreditCard, Truck, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Package2 className="h-12 w-12" />,
      title: "Book Your Delivery",
      description: "Enter pickup and delivery details through our simple online form or mobile app.",
      color: "text-primary"
    },
    {
      icon: <CreditCard className="h-12 w-12" />,
      title: "Choose Payment Method",
      description: "Select from multiple payment options including instant payment or cash on delivery.",
      color: "text-accent"
    },
    {
      icon: <Truck className="h-12 w-12" />,
      title: "Track Your Package",
      description: "Monitor your delivery in real-time with GPS tracking and receive status updates.",
      color: "text-primary"
    },
    {
      icon: <CheckCircle className="h-12 w-12" />,
      title: "Delivery Confirmation",
      description: "Get instant confirmation when your package is successfully delivered to the recipient.",
      color: "text-accent"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Send your packages in just 4 simple steps. Fast, reliable, and hassle-free delivery process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="text-center hover-lift transition-smooth animate-slide-up border-0 shadow-elevated"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8">
                <div className="relative mb-6">
                  <div className={`${step.color} mx-auto mb-4`}>
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <Button size="lg" className="gradient-accent hover-glow text-lg px-8 py-6">
            Start Your First Delivery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;