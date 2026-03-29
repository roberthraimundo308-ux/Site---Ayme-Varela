'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PRODUCTS, OTHER_PRODUCTS, type Product } from '@/lib/constants';
import { SectionTitle } from '@/components/ui/section-title';

const ALL_PRODUCTS = [...PRODUCTS, ...OTHER_PRODUCTS];

export default function ProductsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile */}
      <div className="md:hidden">
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm px-4 py-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-primary/60 text-xs uppercase tracking-[0.2em] font-medium"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
        </div>
        <div className="pt-6 pb-12">
          <SectionTitle title="Nossos Produtos" subtitle="Todos os nossos trabalhos" className="mb-8" />
          <div className="grid grid-cols-2 gap-3 px-4">
            {ALL_PRODUCTS.map((product) => (
              <Link
                key={`prod-${product.id}`}
                href={`/produto/${product.id}`}
                className="rounded-2xl overflow-hidden shadow-md border border-primary/10 bg-white active:scale-[0.98] transition-transform"
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name || product.shortDesc || `Produto ${product.id}`}
                    fill
                    sizes="50vw"
                    quality={70}
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                {product.name && (
                  <div className="py-2 px-2">
                    <h3 className="font-headline text-sm text-primary leading-tight tracking-wide text-center">
                      {product.name}
                    </h3>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1.5 text-primary/50 text-xs uppercase tracking-[0.2em] font-medium hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              Voltar
            </button>
          </div>
          <SectionTitle title="Nossos Produtos" subtitle="Todos os nossos trabalhos" />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10">
            {ALL_PRODUCTS.map((product) => (
              <Link
                key={`prod-${product.id}`}
                href={`/produto/${product.id}`}
                className="bg-white rounded-2xl border border-primary/10 hover:border-primary hover:shadow-2xl transition-all duration-500 flex flex-col text-left h-full select-none group"
              >
                <div className="p-2 pb-0">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name || product.shortDesc || `Produto ${product.id}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      quality={75}
                      loading="lazy"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="px-2 pt-4 pb-6 w-full flex flex-col flex-grow">
                  {product.name && (
                    <h3 className="font-headline text-xl sm:text-2xl lg:text-3xl text-primary mb-2 leading-tight tracking-wide">
                      {product.name}
                    </h3>
                  )}
                  {product.shortDesc && (
                    <p className="text-primary/60 text-xs font-body leading-relaxed line-clamp-2">
                      {product.shortDesc}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
