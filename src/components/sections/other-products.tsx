'use client';
import { SectionTitle } from '@/components/ui/section-title';
import { OTHER_PRODUCTS, type Product } from '@/lib/constants';
import { ProductCard } from '@/components/product-card';

type OtherProductsProps = {
  onProductSelect: (product: Product) => void;
};

export const OtherProducts = ({ onProductSelect }: OtherProductsProps) => {
  return (
    <section id="outros-produtos" className="pb-32 relative z-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Para mais produtos" subtitle="Outras delícias que adoçam a vida" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-10">
          {OTHER_PRODUCTS.map((p) => (
            <ProductCard key={`other-card-${p.id}`} product={p} onSelect={onProductSelect} />
          ))}
        </div>
      </div>
    </section>
  );
};
