'use client';
import { useState } from 'react';
import type { Product } from '@/lib/constants';

import { Navbar } from '@/components/layout/navbar';
import { Hero } from '@/components/sections/hero';
import { Vitrine } from '@/components/sections/vitrine';
import { OtherProducts } from '@/components/sections/other-products';
import { Gallery } from '@/components/sections/gallery';
import { OrderFormSection } from '@/components/sections/order';
import { Testimonials } from '@/components/sections/testimonials';
import { Footer } from '@/components/layout/footer';
import { ProductDetailModal } from '@/components/product-detail-modal';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />
        <Vitrine onProductSelect={setSelectedProduct} />
        <OtherProducts onProductSelect={setSelectedProduct} />
        <Gallery />
        <OrderFormSection />
        <Testimonials />
      </main>
      <Footer />
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
