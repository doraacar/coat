import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Shield, Star, Clock } from 'lucide-react';

const Statistics = () => {
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      icon: Award,
      value: 500,
      suffix: '+',
      label: 'Projects Completed',
      description: 'Successfully finished installations'
    },
    {
      icon: Clock,
      value: 15,
      suffix: '+',
      label: 'Years Experience',
      description: 'Serving satisfied customers'
    },
    {
      icon: Star,
      value: 100,
      suffix: '%',
      label: 'Customer Satisfaction',
      description: 'Guaranteed quality work'
    },
    {
      icon: Shield,
      value: 10,
      suffix: ' Year',
      label: 'Warranty',
      description: 'On all floor coatings'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Licensed & Insured',
      description: 'Fully licensed contractors with comprehensive insurance coverage'
    },
    {
      icon: Star,
      title: 'Free Estimates',
      description: 'No-obligation quotes with detailed project breakdowns'
    },
    {
      icon: Award,
      title: 'Quality Materials',
      description: 'Premium coatings from industry-leading manufacturers'
    },
    {
      icon: Clock,
      title: 'Expert Installation',
      description: 'Professional installation by certified technicians'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      let current = 0;
      const increment = stat.value / 50; // Animation duration
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, 40);
    });
  };

  return (
    <section id="about" className="py-20 bg-accent text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose A&R Epoxy Coating?
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            With years of experience and thousands of satisfied customers, we're the trusted choice 
            for professional floor coating solutions.
          </p>
        </div>

        {/* Statistics */}
        <div 
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-center group hover:bg-white/20 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2 text-primary">
                    {counters[index]}{stat.suffix}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {stat.label}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
                className={`text-center group animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-white/10 rounded-full p-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-white group-hover:text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Licensed & Bonded</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Industry Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <span>5-Star Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;