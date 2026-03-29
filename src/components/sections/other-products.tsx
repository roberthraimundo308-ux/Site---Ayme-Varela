'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionTitle } from '@/components/ui/section-title';
import { OTHER_PRODUCTS } from '@/lib/constants';
import { ProductCard } from '@/components/product-card';

type OtherProductsProps = {
  className?: string;
};

export const OtherProducts = ({ className }: OtherProductsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carouselProducts = OTHER_PRODUCTS;

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (!isMobile) return;

    const track = trackRef.current;
    const carousel = scrollRef.current;
    if (!track || !carousel) return;

    const onScroll = () => {
      const trackRect = track.getBoundingClientRect();
      const scrolled = -trackRect.top;
      const maxTrackScroll = track.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / maxTrackScroll));
      const maxCarouselScroll = carousel.scrollWidth - carousel.clientWidth;
      carousel.scrollLeft = progress * maxCarouselScroll;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="outros-produtos" className={`relative z-20 bg-background ${className ?? ''}`}>
      {/* Mobile: Carrossel sticky */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          style={{ height: `${Math.max(carouselProducts.length * 70, 100)}vh` }}
        >
          <div className="sticky top-0 h-screen flex flex-col justify-center bg-background py-8">
            <div className="px-4 mb-6">
              <SectionTitle title="Outras Delícias" subtitle="Sabores que dão água na boca" />
            </div>
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-hidden pb-4 px-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {carouselProducts.map((p) => (
                <Link
                  key={`other-snap-${p.id}`}
                  href={`/produto/${p.id}`}
                  className="shrink-0 w-[82vw] rounded-2xl overflow-hidden shadow-md active:scale-[0.98] transition-transform duration-200"
                >
                  <div className="relative w-full aspect-square">
                    <Image
                      src={p.image}
                      alt={p.shortDesc}
                      fill
                      sizes="82vw"
                      quality={80}
                      loading="lazy"
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  <div className="py-3 px-2">
                    <h3 className="font-headline text-lg text-primary leading-tight tracking-wide text-center">
                      {p.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Link
                href="/produtos"
                className="text-primary/50 text-[10px] font-sans font-medium uppercase tracking-[0.3em] hover:text-primary transition-colors underline underline-offset-4"
              >
                Ver mais
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Outras Delícias" subtitle="Sabores que dão água na boca" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-10">
            {OTHER_PRODUCTS.map((p) => (
              <ProductCard key={`other-card-${p.id}`} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
