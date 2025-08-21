import { Package, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Package className="h-8 w-8" />
              <span className="text-2xl font-bold">SwiftShip</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Your trusted partner for fast, reliable, and secure parcel delivery 
              services worldwide. Connecting businesses and people globally.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-smooth">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-primary-foreground/80 hover:text-accent transition-smooth">Services</a></li>
              <li><a href="#how-it-works" className="text-primary-foreground/80 hover:text-accent transition-smooth">How It Works</a></li>
              <li><a href="#pricing" className="text-primary-foreground/80 hover:text-accent transition-smooth">Pricing</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-smooth">Track Package</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-smooth">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-accent" />
                <span className="text-primary-foreground/80">123 Delivery St, City, State 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-accent" />
                <span className="text-primary-foreground/80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-accent" />
                <span className="text-primary-foreground/80">support@swiftship.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm mb-4 md:mb-0">
            © 2024 SwiftShip. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-smooth">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-smooth">
              Terms of Service
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-smooth">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;