'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/constants';
import { StandardButton } from '@/components/ui/standard-button';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/produto/${product.id}`}
      className="bg-white rounded-2xl border border-primary/10 hover:border-primary hover:shadow-2xl transition-all duration-500 flex flex-col text-left h-full select-none group"
    >
      <div className="p-2 pb-0">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.shortDesc}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            quality={75}
            loading="lazy"
            className="object-cover"
          />
        </div>
      </div>
      <div className="px-2 pt-4 pb-6 w-full flex flex-col flex-grow">
        {product.name && <h3 className="font-headline text-xl sm:text-2xl lg:text-3xl text-primary mb-2 leading-tight tracking-wide">{product.name}</h3>}
        <p className="text-primary/60 text-xs font-body mb-6 md:mb-10 leading-relaxed line-clamp-2">{product.shortDesc}</p>
        <div className="mt-auto w-full flex justify-center">
          <StandardButton
            className="w-full"
            isNarrow
          >
            VER DETALHES
          </StandardButton>
        </div>
      </div>
    </Link>
  );
};
