'use client';
import { useState } from 'react';
import { SectionTitle } from '@/components/ui/section-title';
import { PRODUCTS, type Product } from '@/lib/constants';
import { ProductCard } from '@/components/product-card';
import { StandardButton } from '@/components/ui/standard-button';

type VitrineProps = {
  onProductSelect: (product: Product) => void;
};

export const Vitrine = ({ onProductSelect }: VitrineProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedProducts = showAll ? PRODUCTS : PRODUCTS.slice(0, 6);

  return (
    <section id="vitrine" className="py-32 relative z-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Vitrine de Pedidos" subtitle="Inspirações de trabalhos recentes" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10">
          {displayedProducts.map((p) => (
            <ProductCard key={`vit-card-${p.id}`} product={p} onSelect={onProductSelect} />
          ))}
        </div>
        {!showAll && PRODUCTS.length > 6 && (
          <div className="text-center mt-12">
            <StandardButton onClick={() => setShowAll(true)}>
              Ver mais
            </StandardButton>
          </div>
        )}
      </div>
    </section>
  );
};
