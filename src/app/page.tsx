'use client';

import { Navbar } from '@/components/layout/navbar';
import { Hero } from '@/components/sections/hero';
import { Vitrine } from '@/components/sections/vitrine';
import { OtherProducts } from '@/components/sections/other-products';
import { Gallery } from '@/components/sections/gallery';
import { OrderFormSection } from '@/components/sections/order';
import { Testimonials } from '@/components/sections/testimonials';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <main className="flex flex-col md:block">
        <Hero className="order-1" />
        <Vitrine className="order-2" />
        <OrderFormSection className="order-3 md:!order-none" />
        <OtherProducts className="order-4 md:!order-none" />
        <Gallery className="order-5 md:!order-none" />
        <Testimonials className="order-6" />
      </main>
      <Footer />
    </div>
  );
}
