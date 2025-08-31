import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import workerImage from '@/assets/worker-applying-coating.jpg';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-background">
      <div className="container mx-auto px-4 min-h-screen">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* Left Half - Worker Image */}
          <div className="flex items-center justify-center lg:order-1 order-2">
            <div className="w-full h-full lg:h-[600px] relative overflow-hidden rounded-lg shadow-hero">
              <img 
                src={workerImage} 
                alt="Professional worker applying floor coating"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Half - Content */}
          <div className="flex items-center justify-center lg:order-2 order-1 py-12 lg:py-0">
            <div className={`text-center lg:text-left max-w-lg transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground">
                Transform Your Floors with{' '}
                <span className="text-primary">
                  Professional Coatings
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl font-light mb-8 text-muted-foreground leading-relaxed">
                Durable, beautiful, and long-lasting floor solutions for residential and commercial spaces
              </p>

              {/* Professional Tagline */}
              <p className="text-lg font-medium mb-12 text-primary">
                "Professional Floor Coatings That Last"
              </p>

              {/* CTA Buttons - Stacked Vertically */}
              <div className="flex flex-col gap-4 max-w-sm mx-auto lg:mx-0">
                <Button 
                  variant="hero" 
                  size="xl" 
                  onClick={() => scrollToSection('#contact')}
                  className="w-full font-bold text-lg"
                >
                  GET FREE QUOTE
                  <ArrowRight className="w-5 h-5" />
                </Button>
                
                <Button 
                  variant="professional" 
                  size="xl" 
                  onClick={() => scrollToSection('#portfolio')}
                  className="w-full font-bold text-lg"
                >
                  <PlayCircle className="w-5 h-5" />
                  VIEW OUR WORK
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;