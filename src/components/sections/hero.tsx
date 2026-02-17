'use client';
import Image from 'next/image';
import { HERO_BG } from '@/lib/constants';

export const Hero = () => {
  const scrollToVitrine = () => {
    document.getElementById('vitrine')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full h-[85vh] md:h-screen overflow-hidden">
      <Image 
        src={HERO_BG}
        alt="Elegant cake background"
        fill
        className="object-cover"
        quality={80}
        priority
        data-ai-hint="cake detail"
      />
      <div className="absolute inset-0 bg-primary/30 z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-20"></div>
      <div className="relative z-20 flex flex-col items-center justify-end h-full pb-32 md:pb-40">
        <button 
          onClick={scrollToVitrine} 
          className="px-16 py-4 bg-white/90 backdrop-blur rounded-full uppercase tracking-[0.4em] text-[10px] font-medium text-primary hover:bg-primary hover:text-white transition-all shadow-xl font-sans"
        >
          Explorar Vitrine
        </button>
      </div>
    </section>
  );
};
