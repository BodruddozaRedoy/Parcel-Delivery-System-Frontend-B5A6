import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Standard",
      price: "$9.99",
      period: "per delivery",
      description: "Perfect for occasional shipments",
      features: [
        "3-5 business days delivery",
        "Package tracking",
        "Standard insurance ($100)",
        "Email notifications",
        "Customer support"
      ],
      popular: false
    },
    {
      name: "Express",
      price: "$19.99",
      period: "per delivery",
      description: "Fast delivery for urgent packages",
      features: [
        "1-2 business days delivery",
        "Real-time GPS tracking",
        "Enhanced insurance ($500)",
        "SMS & email notifications",
        "Priority customer support",
        "Delivery time guarantee"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "Tailored solutions for businesses",
      features: [
        "Same-day delivery options",
        "Dedicated account manager",
        "Custom insurance coverage",
        "API integration",
        "Bulk delivery discounts",
        "24/7 phone support",
        "Custom reporting"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            Simple, <span className="gradient-hero bg-clip-text text-transparent">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your delivery needs. No hidden fees, 
            no surprise charges.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative hover-lift transition-smooth animate-scale-in ${
                plan.popular ? 'border-primary shadow-glow' : 'shadow-elevated'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="gradient-hero text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold gradient-hero bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="p-8 pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'gradient-hero hover-glow' 
                      : 'gradient-accent hover-lift'
                  }`}
                  size="lg"
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;