'use client';
import Image from 'next/image';
import type { Product } from '@/lib/constants';
import { StandardButton } from '@/components/ui/standard-button';
import { WHATSAPP_NUMBER } from '@/lib/constants';

type ProductCardProps = {
  product: Product;
  onSelect: (product: Product) => void;
  actionType?: 'modal' | 'whatsapp';
};

export const ProductCard = ({ product, onSelect, actionType = 'modal' }: ProductCardProps) => {
  const handleWhatsappOrder = () => {
    const message = `Olá! Tenho interesse no produto *${product.name}*. Gostaria de fazer uma encomenda.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const buttonText = actionType === 'whatsapp' ? 'PEDIR AGORA' : 'VER DETALHES';
  const buttonAction = actionType === 'whatsapp' ? handleWhatsappOrder : () => onSelect(product);

  return (
    <div className="bg-white rounded-xl p-2 pb-6 md:pb-8 border border-primary/10 hover:border-primary hover:shadow-2xl transition-all duration-500 flex flex-col items-start text-left h-full select-none group">
      <div className="w-full aspect-square mb-4 md:mb-6 overflow-hidden rounded-lg bg-stone-50 border border-stone-100">
        <Image 
          src={product.image} 
          alt={product.name} 
          width={400} 
          height={400} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>
      <div className="px-3 md:px-5 w-full flex flex-col flex-grow">
        <h3 className="font-headline text-xl sm:text-2xl lg:text-3xl text-primary mb-2 leading-tight tracking-wide">{product.name}</h3>
        <p className="text-primary/60 text-xs font-body mb-6 md:mb-10 leading-relaxed line-clamp-2">{product.shortDesc}</p>
        <div className="mt-auto w-full flex justify-center">
          <StandardButton 
            onClick={buttonAction} 
            className="w-full text-[8px] tracking-[0.2em] py-3 px-2 sm:text-[9px] sm:tracking-[0.1em] sm:py-2 sm:px-4 md:text-[10px] md:tracking-[0.2em] md:py-3 md:px-10"
          >
            {buttonText}
          </StandardButton>
        </div>
      </div>
    </div>
  );
};
