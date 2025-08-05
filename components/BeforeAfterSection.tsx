'use client';

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { siteData } from '@/config/site-data';
import { Button } from './ui/button';

export function BeforeAfterSection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const beforeAfterItems = siteData.portfolio.filter(item => item.before && item.after);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % beforeAfterItems.length);
    setSliderPosition(50);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + beforeAfterItems.length) % beforeAfterItems.length);
    setSliderPosition(50);
  };

  if (beforeAfterItems.length === 0) {
    return null;
  }

  const currentItem = beforeAfterItems[currentIndex];

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const startX = e.clientX;
    const startPosition = sliderPosition;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaPercent = (deltaX / rect.width) * 100;
      const newPosition = Math.max(0, Math.min(100, startPosition + deltaPercent));
      setSliderPosition(newPosition);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const startX = e.touches[0].clientX;
    const startPosition = sliderPosition;

    const handleTouchMove = (e: TouchEvent) => {
      const deltaX = e.touches[0].clientX - startX;
      const deltaPercent = (deltaX / rect.width) * 100;
      const newPosition = Math.max(0, Math.min(100, startPosition + deltaPercent));
      setSliderPosition(newPosition);
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('beforeafter.title')}
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            {t('beforeafter.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
            {/* Before/After Slider */}
            <div 
              className="relative h-[500px] overflow-hidden cursor-ew-resize select-none"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              {/* Before Image */}
              <div className="absolute inset-0">
                <img
                  src={currentItem.before}
                  alt={t('beforeafter.before')}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {t('beforeafter.before')}
                </div>
              </div>

              {/* After Image */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={currentItem.after}
                  alt={t('beforeafter.after')}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {t('beforeafter.after')}
                </div>
              </div>

              {/* Slider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-auto cursor-ew-resize">
                  <div className="w-1 h-4 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            {beforeAfterItems.length > 1 && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                <Button
                  onClick={prevSlide}
                  variant="outline"
                  size="icon"
                  className="bg-white/90 hover:bg-white border-gray-200 pointer-events-auto"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  onClick={nextSlide}
                  variant="outline"
                  size="icon"
                  className="bg-white/90 hover:bg-white border-gray-200 pointer-events-auto"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* Dots Indicator */}
            {beforeAfterItems.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {beforeAfterItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setSliderPosition(50);
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'bg-white shadow-lg' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-gray-600">
              Перетащите белую линию, чтобы увидеть результат до и после
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}