'use client';
import { SectionTitle } from '@/components/ui/section-title';
import { PRODUCTS, type Product } from '@/lib/constants';
import { ProductCard } from '@/components/product-card';

type VitrineProps = {
  onProductSelect: (product: Product) => void;
};

export const Vitrine = ({ onProductSelect }: VitrineProps) => {
  return (
    <section id="vitrine" className="py-32 relative z-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Vitrine de Pedidos" subtitle="Inspirações de trabalhos recentes" />
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10">
          {PRODUCTS.map((p) => (
            <ProductCard key={`vit-card-${p.id}`} product={p} onSelect={onProductSelect} />
          ))}
        </div>
      </div>
    </section>
  );
};
