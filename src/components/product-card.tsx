'use client';
import Image from 'next/image';
import type { Product } from '@/lib/constants';
import { StandardButton } from '@/components/ui/standard-button';

type ProductCardProps = {
  product: Product;
  onSelect: (product: Product) => void;
};

export const ProductCard = ({ product, onSelect }: ProductCardProps) => (
  <div className="bg-white rounded-xl p-2 pb-6 md:pb-8 border border-primary hover:shadow-2xl transition-all duration-500 flex flex-col items-start text-left h-full select-none">
    <div className="w-full aspect-square mb-4 md:mb-6 overflow-hidden rounded-lg bg-stone-50 border border-stone-100">
      <Image 
        src={product.image} 
        alt={product.name} 
        width={400} 
        height={400} 
        className="w-full h-full object-cover" 
      />
    </div>
    <div className="px-3 md:px-5 w-full flex flex-col flex-grow">
      <h3 className="font-headline text-2xl md:text-3xl text-primary mb-2 leading-tight tracking-wide">{product.name}</h3>
      <p className="text-primary/60 text-xs font-body mb-6 md:mb-10 leading-relaxed line-clamp-2">{product.shortDesc}</p>
      <div className="mt-auto w-full flex justify-center">
        <StandardButton onClick={() => onSelect(product)} className="w-full py-2 px-6 md:py-3 md:px-10">
          VER DETALHES
        </StandardButton>
      </div>
    </div>
  </div>
);
