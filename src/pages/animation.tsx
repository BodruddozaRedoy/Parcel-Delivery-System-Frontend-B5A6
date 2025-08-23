import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Shield, Globe, Star, Menu, X } from 'lucide-react';

export default function Animation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initialize intersection observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    // Observe all elements with scroll-fade-in class
    const elements = document.querySelectorAll('.scroll-fade-in');
    elements.forEach((el) => observerRef.current?.observe(el));

    // Cleanup
    return () => {
      elements.forEach((el) => observerRef.current?.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-shift rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-shift">xAI</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">How It Works</a>
            <a href="#testimonials" className="text-foreground/80 hover:text-foreground transition-colors">Testimonials</a>
            <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors">Pricing</a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Button className="gradient-hero text-white hover-glow">
              Get Started
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors py-2">Features</a>
              <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors py-2">How It Works</a>
              <a href="#testimonials" className="text-foreground/80 hover:text-foreground transition-colors py-2">Testimonials</a>
              <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors py-2">Pricing</a>
              <div className="flex space-x-4 pt-4">
                <Button variant="ghost" className="flex-1">Sign In</Button>
                <Button className="flex-1 gradient-hero text-white hover-glow">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Floating elements */}
        <div className="absolute top-20 right-10 w-20 h-20 bg-primary/10 rounded-full animate-float" />
        <div className="absolute top-40 left-10 w-16 h-16 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-1/4 w-12 h-12 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="animate-fade-in">
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Intelligence
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="gradient-shift">The Future of</span>
              <br />
              Artificial Intelligence
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Experience the next generation of AI technology with our cutting-edge platform. 
              Transform your ideas into reality with unprecedented speed and precision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="gradient-hero text-white hover-glow text-lg px-8 py-6">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover-lift">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Enterprise Security
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary" />
                Global Infrastructure
              </div>
            </div>
          </div>
          
          <div className="lg:animate-slide-in-right">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
              <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
              
              <div className="relative bg-card border border-border rounded-2xl p-8 shadow-elevated">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">U</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">User</p>
                      <p className="text-muted-foreground">Can you explain quantum computing in simple terms?</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-shift rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium gradient-shift">xAI Assistant</p>
                      <p className="text-muted-foreground">
                        Quantum computing uses quantum bits (qubits) that can exist in multiple states simultaneously, 
                        allowing for exponentially faster computations than classical computers for certain problems.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">U</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">User</p>
                      <p className="text-muted-foreground">That's fascinating! How can I learn more?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-fade-in">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground">
              Our platform combines cutting-edge AI technology with intuitive design to deliver exceptional results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <Zap className="w-8 h-8" />, 
                title: "Lightning Fast", 
                description: "Process complex queries in milliseconds with our optimized AI engine." 
              },
              { 
                icon: <Shield className="w-8 h-8" />, 
                title: "Enterprise Security", 
                description: "Bank-level encryption and security protocols to protect your data." 
              },
              { 
                icon: <Globe className="w-8 h-8" />, 
                title: "Global Infrastructure", 
                description: "99.99% uptime with servers located worldwide for optimal performance." 
              },
              { 
                icon: <Star className="w-8 h-8" />, 
                title: "Precision Accuracy", 
                description: "Industry-leading accuracy rates backed by extensive testing and validation." 
              },
              { 
                icon: <Sparkles className="w-8 h-8" />, 
                title: "Intuitive Interface", 
                description: "Beautifully designed interface that makes complex tasks simple." 
              },
              { 
                icon: <ArrowRight className="w-8 h-8" />, 
                title: "Seamless Integration", 
                description: "Easily integrate with your existing tools and workflows." 
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-card border border-border rounded-2xl p-6 hover-lift scroll-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-fade-in">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Get started in minutes with our simple, streamlined process.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                step: "01", 
                title: "Create Account", 
                description: "Sign up for a free account and configure your preferences." 
              },
              { 
                step: "02", 
                title: "Connect Data", 
                description: "Securely connect your data sources or upload your documents." 
              },
              { 
                step: "03", 
                title: "Start Exploring", 
                description: "Begin asking questions and discovering insights instantly." 
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="text-center scroll-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-fade-in">
            <h2 className="text-4xl font-bold mb-4">Trusted by Innovators</h2>
            <p className="text-xl text-muted-foreground">
              Hear from industry leaders who have transformed their workflows.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "This platform has revolutionized how we approach complex problem-solving. The accuracy and speed are unmatched.",
                author: "Sarah Johnson",
                role: "CTO, Tech Innovations"
              },
              {
                quote: "Implementing xAI has saved us hundreds of hours per week. The ROI was evident within the first month.",
                author: "Michael Chen",
                role: "Product Director, Global Solutions"
              },
              {
                quote: "The intuitive interface makes it accessible to our entire team, not just technical specialists.",
                author: "Elena Rodriguez",
                role: "Head of Innovation, Future Labs"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-card border border-border rounded-2xl p-6 hover-lift scroll-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-shift rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of innovators who are already using xAI to push the boundaries of what's possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="hover-lift text-lg px-8 py-6">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8 py-6">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-shift rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-shift">xAI</span>
              </div>
              <p className="text-muted-foreground mb-4">
                The future of artificial intelligence, today.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'github', 'linkedin', 'facebook'].map((social) => (
                  <div 
                    key={social} 
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover-lift hover:bg-primary/20 transition-colors cursor-pointer"
                  >
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {[
              {
                title: "Product",
                links: ["Features", "Solutions", "Pricing", "Changelog"]
              },
              {
                title: "Resources",
                links: ["Documentation", "Tutorials", "Blog", "Support"]
              },
              {
                title: "Company",
                links: ["About", "Careers", "Contact", "Partners"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-bold text-lg mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href="#" 
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-border text-center text-muted-foreground">
            <p>© 2023 xAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
