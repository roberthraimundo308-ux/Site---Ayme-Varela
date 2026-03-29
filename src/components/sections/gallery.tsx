'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { GALLERY_CAROUSEL_IMAGES } from '@/lib/constants';
import { SectionTitle } from '../ui/section-title';

const CARD_SIZE = 'w-52 h-52 md:w-72 md:h-72';

export const Gallery = ({ className }: { className?: string }) => {
  const [shuffledGallery, setShuffledGallery] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const activeRowRef = useRef<'row1' | 'row2' | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const shuffled = [...GALLERY_CAROUSEL_IMAGES].sort(() => Math.random() - 0.5);
    setShuffledGallery(shuffled);
  }, []);

  const galleryImages = isMounted ? shuffledGallery : GALLERY_CAROUSEL_IMAGES;
  const halfwayIndex = Math.ceil(galleryImages.length / 2);
  const firstRow = galleryImages.slice(0, halfwayIndex);
  const secondRow = galleryImages.slice(halfwayIndex);

  // Row 2 starts at the end (opposite direction)
  useEffect(() => {
    if (row2Ref.current && secondRow.length > 0) {
      row2Ref.current.scrollLeft = row2Ref.current.scrollWidth - row2Ref.current.clientWidth;
    }
  }, [secondRow]);

  const syncOpposite = useCallback((sourceRow: 'row1' | 'row2') => {
    const source = sourceRow === 'row1' ? row1Ref.current : row2Ref.current;
    const target = sourceRow === 'row1' ? row2Ref.current : row1Ref.current;
    if (!source || !target) return;

    // Only the row the user is actively touching should drive sync
    if (activeRowRef.current !== null && activeRowRef.current !== sourceRow) return;

    const maxSource = source.scrollWidth - source.clientWidth;
    const maxTarget = target.scrollWidth - target.clientWidth;
    if (maxSource <= 0 || maxTarget <= 0) return;

    const progress = source.scrollLeft / maxSource;
    target.scrollLeft = (1 - progress) * maxTarget;
  }, []);

  const handleTouchStart = useCallback((row: 'row1' | 'row2') => {
    activeRowRef.current = row;
  }, []);

  const handleTouchEnd = useCallback(() => {
    activeRowRef.current = null;
  }, []);

  const scrollStyle = {
    scrollbarWidth: 'none' as const,
    msOverflowStyle: 'none' as const,
    WebkitOverflowScrolling: 'touch' as const,
  };

  return (
    <section id="galeria" className={`relative z-30 bg-background min-h-screen md:min-h-0 md:py-24 flex flex-col justify-center ${className ?? ''}`}>
      <div className="py-10">
        <SectionTitle title="Galeria de Sonhos" subtitle="Siga-nos @ayme_varela" className="mb-6 md:mb-16" />
        <div className="w-full overflow-hidden flex flex-col gap-3 md:gap-6">
        <div
          ref={row1Ref}
          onScroll={() => syncOpposite('row1')}
          onTouchStart={() => handleTouchStart('row1')}
          onTouchEnd={handleTouchEnd}
          onMouseDown={() => handleTouchStart('row1')}
          onMouseUp={handleTouchEnd}
          className="flex gap-3 md:gap-6 overflow-x-auto px-4"
          style={scrollStyle}
        >
          {firstRow.map((img, i) => (
            <div key={`gal-1-${i}`} className={`flex-shrink-0 ${CARD_SIZE} rounded-2xl overflow-hidden shadow-md border border-primary/10 bg-white`}>
              <Image
                src={img}
                width={288}
                height={288}
                quality={60}
                sizes="(max-width: 768px) 208px, 288px"
                loading="lazy"
                className="w-full h-full object-cover"
                alt={`Galeria de bolos ${i + 1}`}
              />
            </div>
          ))}
        </div>
        <div
          ref={row2Ref}
          onScroll={() => syncOpposite('row2')}
          onTouchStart={() => handleTouchStart('row2')}
          onTouchEnd={handleTouchEnd}
          onMouseDown={() => handleTouchStart('row2')}
          onMouseUp={handleTouchEnd}
          className="flex gap-3 md:gap-6 overflow-x-auto px-4"
          style={scrollStyle}
        >
          {secondRow.map((img, i) => (
            <div key={`gal-2-${i}`} className={`flex-shrink-0 ${CARD_SIZE} rounded-2xl overflow-hidden shadow-md border border-primary/10 bg-white`}>
              <Image
                src={img}
                width={288}
                height={288}
                quality={60}
                sizes="(max-width: 768px) 208px, 288px"
                loading="lazy"
                className="w-full h-full object-cover"
                alt={`Galeria de bolos ${i + firstRow.length + 1}`}
              />
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};
