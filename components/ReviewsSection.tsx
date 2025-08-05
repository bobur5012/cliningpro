'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteData } from '@/config/site-data';
import { useLanguage } from '@/lib/i18n';
import { Button } from './ui/button';

export function ReviewsSection() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reviews = siteData.reviews;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
  };

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('reviews.title')}
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            {t('reviews.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 md:p-12 shadow-xl"
          >
            <div className="text-center">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-lg md:text-xl text-gray-700 italic mb-8 leading-relaxed">
                "{reviews[currentIndex].text[language]}"
              </blockquote>

              {/* Reviewer Info */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={reviews[currentIndex].image}
                  alt={reviews[currentIndex].name[language]}
                  className="w-16 h-16 rounded-full object-cover shadow-lg"
                />
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-lg">
                    {reviews[currentIndex].name[language]}
                  </div>
                  <div className="text-blue-600 font-medium">
                    {reviews[currentIndex].service[language]}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              onClick={prevReview}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextReview}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}