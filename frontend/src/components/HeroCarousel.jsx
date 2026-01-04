import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../data/mockData';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
      {/* Slides */}
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-xl">
                    <h2
                      className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 transition-all duration-700 delay-200 ${
                        index === currentSlide
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-10 opacity-0'
                      }`}
                    >
                      {slide.title}
                    </h2>
                    <p
                      className={`text-lg sm:text-xl text-white/90 mb-6 transition-all duration-700 delay-300 ${
                        index === currentSlide
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-10 opacity-0'
                      }`}
                    >
                      {slide.subtitle}
                    </p>
                    <button
                      className={`px-8 py-3 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 ${
                        index === currentSlide
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-10 opacity-0'
                      }`}
                      style={{ transitionDelay: '400ms' }}
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
      >
        <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
      >
        <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => !isTransitioning && setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 h-3 bg-gradient-to-r from-emerald-400 to-green-500'
                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
