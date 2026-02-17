'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ALL_GALLERY_IMAGES } from '@/lib/constants';
import { SectionTitle } from '../ui/section-title';

export const Gallery = () => {
  const [shuffledGallery, setShuffledGallery] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Shuffle only on the client
    const shuffled = [...ALL_GALLERY_IMAGES].sort(() => Math.random() - 0.5);
    setShuffledGallery(shuffled);
  }, []);

  const galleryImages = isMounted ? shuffledGallery : ALL_GALLERY_IMAGES;
  const halfwayIndex = Math.ceil(galleryImages.length / 2);
  const firstRow = galleryImages.slice(0, halfwayIndex);
  const secondRow = galleryImages.slice(halfwayIndex);

  return (
    <section id="galeria" className="py-24 bg-background">
      <SectionTitle title="Galeria de Sonhos" subtitle="Siga-nos @ayme_varela" />
      <div className="w-full overflow-hidden flex flex-col gap-6">
        <div className="flex gap-6 animate-scroll-horizontal">
          {[...firstRow, ...firstRow].map((img, i) => (
            <div key={`gal-img-1-${i}`} className="flex-shrink-0 w-72 h-72 rounded-xl overflow-hidden shadow-lg border border-stone-100 bg-white group relative">
               <Image 
                 src={img} 
                 width={288} 
                 height={288} 
                 className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
                 alt={`Galeria de bolos ${i + 1}`}
                 data-ai-hint="cake dessert" 
                />
               <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all"></div>
            </div>
          ))}
        </div>
        <div className="flex gap-6 animate-scroll-horizontal-reverse">
          {[...secondRow, ...secondRow].map((img, i) => (
            <div key={`gal-img-2-${i}`} className="flex-shrink-0 w-72 h-72 rounded-xl overflow-hidden shadow-lg border border-stone-100 bg-white group relative">
               <Image 
                 src={img} 
                 width={288} 
                 height={288} 
                 className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
                 alt={`Galeria de bolos ${i + firstRow.length + 1}`}
                 data-ai-hint="cake dessert" 
                />
               <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
