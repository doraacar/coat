import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import epoxyResidential from '@/assets/epoxy-residential.jpg';
import industrialWarehouse from '@/assets/industrial-warehouse.jpg';
import decorativeConcrete from '@/assets/decorative-concrete.jpg';
import commercialShowroom from '@/assets/commercial-showroom.jpg';
import basementEpoxy from '@/assets/basement-epoxy.jpg';
import epoxyTexture from '@/assets/epoxy-texture.jpg';
import heroGarage from '@/assets/hero-garage.jpg';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState<boolean[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filters = ['All', 'Residential', 'Commercial', 'Industrial'];

  const portfolioItems = [
    {
      image: heroGarage,
      title: "Modern Garage Epoxy",
      category: "Residential",
      description: "Premium gray epoxy coating with high-gloss finish"
    },
    {
      image: epoxyResidential,
      title: "Metallic Epoxy Floor",
      category: "Residential", 
      description: "Beautiful blue metallic swirl pattern"
    },
    {
      image: commercialShowroom,
      title: "Commercial Showroom",
      category: "Commercial",
      description: "High-traffic polyurethane coating"
    },
    {
      image: industrialWarehouse,
      title: "Industrial Warehouse",
      category: "Industrial",
      description: "Heavy-duty industrial floor coating"
    },
    {
      image: decorativeConcrete,
      title: "Decorative Concrete",
      category: "Commercial",
      description: "Stamped concrete with natural stone pattern"
    },
    {
      image: basementEpoxy,
      title: "Finished Basement",
      category: "Residential",
      description: "Charcoal epoxy with metallic flakes"
    },
    {
      image: epoxyTexture,
      title: "Premium Epoxy Detail",
      category: "Residential",
      description: "Close-up of high-quality epoxy finish"
    },
    {
      image: commercialShowroom,
      title: "Retail Space Floor",
      category: "Commercial",
      description: "Polished concrete commercial finish"
    }
  ];

  const filteredItems = activeFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  useEffect(() => {
    const observers = imageRefs.current.map((image, index) => {
      if (!image) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleImages(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 100);
          }
        },
        { threshold: 0.2 }
      );
      
      observer.observe(image);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [filteredItems]);

  const openLightbox = (image: string, index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    const nextIndex = (lightboxIndex + 1) % filteredItems.length;
    setLightboxIndex(nextIndex);
    setLightboxImage(filteredItems[nextIndex].image);
  };

  const prevImage = () => {
    const prevIndex = lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1;
    setLightboxIndex(prevIndex);
    setLightboxImage(filteredItems[prevIndex].image);
  };

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            See Our Quality Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Browse our portfolio of completed projects showcasing the highest quality 
            floor coating installations across residential, commercial, and industrial spaces.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "hero" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className="transition-all duration-300"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              ref={el => imageRefs.current[index] = el}
              className={`group cursor-pointer overflow-hidden rounded-lg shadow-card hover:shadow-hero transition-all duration-500 transform ${
                visibleImages[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              onClick={() => openLightbox(item.image, index)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-white/90">{item.description}</p>
                    <div className="mt-2 px-3 py-1 bg-primary rounded-full text-xs font-medium text-white">
                      {item.category}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <img
                src={lightboxImage}
                alt="Portfolio item"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                onClick={prevImage}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                onClick={nextImage}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-semibold">{filteredItems[lightboxIndex].title}</h3>
                <p className="text-white/80">{filteredItems[lightboxIndex].description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;