'use client';
import { useMemo } from 'react';
import Image from 'next/image';
import { ALL_GALLERY_IMAGES } from '@/lib/constants';
import { SectionTitle } from '../ui/section-title';

export const Gallery = () => {
  const shuffledGallery = useMemo(() => {
    const shuffled = [...ALL_GALLERY_IMAGES];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  return (
    <section id="galeria" className="py-24 bg-background">
      <SectionTitle title="Galeria de Sonhos" subtitle="Siga-nos @ayme_varela" />
      <div className="w-full overflow-hidden">
        <div className="flex gap-6 animate-scroll-horizontal">
          {[...shuffledGallery, ...shuffledGallery].map((img, i) => (
            <div key={`gal-img-${i}`} className="flex-shrink-0 w-72 h-72 rounded-xl overflow-hidden shadow-lg border border-stone-100 bg-white group relative">
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
      </div>
    </section>
  );
};
