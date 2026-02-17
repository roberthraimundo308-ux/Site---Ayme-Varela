'use client';
import Image from 'next/image';
import type { Product } from '@/lib/constants';
import { StandardButton } from '@/components/ui/standard-button';

type ProductCardProps = {
  product: Product;
  onSelect: (product: Product) => void;
};

export const ProductCard = ({ product, onSelect }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-primary/10 hover:border-primary hover:shadow-2xl transition-all duration-500 flex flex-col text-left h-full select-none group overflow-hidden">
      <div className="w-full aspect-square bg-stone-50">
        <Image 
          src={product.image} 
          alt={product.name} 
          width={400} 
          height={400} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>
      <div className="p-4 pb-6 w-full flex flex-col flex-grow">
        <h3 className="font-headline text-xl sm:text-2xl lg:text-3xl text-primary mb-2 leading-tight tracking-wide">{product.name}</h3>
        <p className="text-primary/60 text-xs font-body mb-6 md:mb-10 leading-relaxed line-clamp-2">{product.shortDesc}</p>
        <div className="mt-auto w-full flex justify-center">
          <StandardButton 
            onClick={() => onSelect(product)} 
            className="w-full text-[8px] tracking-[0.2em] py-3 px-2 sm:text-[9px] sm:tracking-[0.1em] sm:py-2 sm:px-4 md:text-[10px] md:tracking-[0.2em] md:py-3 md:px-10"
          >
            VER DETALHES
          </StandardButton>
        </div>
      </div>
    </div>
  );
};
