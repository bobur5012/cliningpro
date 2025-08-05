'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { BeforeAfterSection } from '@/components/BeforeAfterSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { VideoWorksSection } from '@/components/VideoWorksSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { Footer } from '@/components/Footer';
import { OrderConstructor } from '@/components/OrderConstructor';
import { ContactForm } from '@/components/ContactForm';
import { MobilePanel } from '@/components/MobilePanel';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function Home() {
  const [isConstructorOpen, setIsConstructorOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>();
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setIsConstructorOpen(true);
  };

  const handleOrderComplete = (data: any) => {
    setOrderData(data);
    setIsConstructorOpen(false);
    setIsContactFormOpen(true);
  };

  const handleConstructorOpen = () => {
    setSelectedServiceId(undefined);
    setIsConstructorOpen(true);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <HeroSection onCalculateClick={handleConstructorOpen} />
      
      <ServicesSection onServiceSelect={handleServiceSelect} />
      
      <BeforeAfterSection />
      
      <PortfolioSection />
      
      <VideoWorksSection />
      
      <ReviewsSection />
      
      <Footer />
      
      <MobilePanel onConstructorClick={handleConstructorOpen} />
      
      {/* Order Constructor Modal */}
      <OrderConstructor
        isOpen={isConstructorOpen}
        onClose={() => setIsConstructorOpen(false)}
        onOrderComplete={handleOrderComplete}
        selectedServiceId={selectedServiceId}
      />
      
      {/* Contact Form Modal */}
      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        orderData={orderData}
      />
    </main>
  );
}