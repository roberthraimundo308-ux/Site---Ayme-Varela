'use client';
import { useRef, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionTitle } from '@/components/ui/section-title';
import { PRODUCTS } from '@/lib/constants';
import { ProductCard } from '@/components/product-card';
import { StandardButton } from '@/components/ui/standard-button';

type VitrineProps = {
  className?: string;
};

export const Vitrine = ({ className }: VitrineProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carouselProducts = PRODUCTS.slice(0, 4);

  const handleCarouselScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / carouselProducts.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(index);
  }, [carouselProducts.length]);

  // Sticky + scroll-driven horizontal carousel for mobile
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
    <section id="vitrine" className={`relative z-20 bg-background ${className ?? ''}`}>
      {/* Mobile: Sticky carousel driven by vertical scroll */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          style={{ height: `${carouselProducts.length * 70}vh` }}
        >
          <div className="sticky top-0 h-screen flex flex-col justify-center bg-background py-8">
            <div className="px-4 mb-6">
              <SectionTitle title="Últimos Pedidos" subtitle="Inspirações de trabalhos recentes" />
            </div>
            <div
              ref={scrollRef}
              onScroll={handleCarouselScroll}
              className="flex gap-4 overflow-x-hidden pb-4 px-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {carouselProducts.map((p) => (
                <Link
                  key={`vit-snap-${p.id}`}
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
            <div className="flex justify-center mt-6">
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

      {/* Desktop: layout original */}
      <div className="hidden md:block py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Vitrine de Pedidos" subtitle="Inspirações de trabalhos recentes" />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10">
            {PRODUCTS.slice(0, 6).map((p) => (
              <ProductCard key={`vit-card-${p.id}`} product={p} />
            ))}
          </div>
          {PRODUCTS.length > 6 && (
            <div className="text-center mt-12">
              <Link href="/produtos">
                <StandardButton>
                  Ver mais
                </StandardButton>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
