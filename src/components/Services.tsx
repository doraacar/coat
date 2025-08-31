import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, Shield, Sparkles, Factory, ArrowRight } from 'lucide-react';
import epoxyImage from '@/assets/epoxy-residential.jpg';
import industrialImage from '@/assets/industrial-warehouse.jpg';
import decorativeImage from '@/assets/decorative-concrete.jpg';
import commercialImage from '@/assets/commercial-showroom.jpg';

const Services = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    {
      icon: Layers,
      title: "Epoxy Floor Coatings",
      description: "Perfect for garage floors, warehouses, and showrooms. Durable, chemical-resistant, and available in multiple colors and finishes.",
      image: epoxyImage,
      features: ["Chemical Resistant", "Easy to Clean", "Long-Lasting", "Multiple Colors"],
    },
    {
      icon: Shield,
      title: "Polyurethane Coatings",
      description: "Heavy-duty protection for high-traffic commercial areas. Superior durability and UV resistance for lasting performance.",
      image: commercialImage,
      features: ["UV Resistant", "High Traffic", "Commercial Grade", "Professional Finish"],
    },
    {
      icon: Sparkles,
      title: "Decorative Concrete",
      description: "Beautiful stamped and stained finishes that transform ordinary concrete into stunning decorative surfaces.",
      image: decorativeImage,
      features: ["Custom Patterns", "Stained Colors", "Artistic Design", "Weather Resistant"],
    },
    {
      icon: Factory,
      title: "Industrial Coatings",
      description: "Heavy-duty protection for factories and industrial facilities. Built to withstand the toughest conditions.",
      image: industrialImage,
      features: ["Heavy Duty", "Chemical Proof", "Anti-Slip Options", "Industrial Grade"],
    },
  ];

  useEffect(() => {
    const observers = cardRefs.current.map((card, index) => {
      if (!card) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 200); // Stagger animation
          }
        },
        { threshold: 0.2 }
      );
      
      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Professional Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We specialize in premium floor coating solutions that combine durability, 
            beauty, and performance for every type of space.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                ref={el => cardRefs.current[index] = el}
                className={`group overflow-hidden border-0 shadow-card hover:shadow-hero transition-all duration-500 transform ${
                  visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Service Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-overlay opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-primary group-hover:text-primary-dark transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button 
                    variant="professional" 
                    className="w-full group"
                    onClick={scrollToContact}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to transform your floors with professional coatings?
          </p>
          <Button variant="hero" size="xl" onClick={scrollToContact}>
            Get Your Free Estimate Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;