'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { HERO_BG, HERO_BG_MOBILE, LOGO_URL } from '@/lib/constants';

export const Hero = ({ className }: { className?: string }) => {
  const [scale, setScale] = useState(1);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const progress = Math.min(scrollY / vh, 1);
    setScale(1 + progress * 0.15);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToVitrine = () => {
    document.getElementById('vitrine')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className={`relative w-full h-screen overflow-hidden ${className ?? ''}`}>
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `scale(${scale})` }}
      >
        <Image
          src={HERO_BG}
          alt="Elegant cake background"
          fill
          className="object-cover object-left md:object-center hidden md:block"
          quality={75}
          priority
          sizes="100vw"
          data-ai-hint="cake detail"
        />
        <Image
          src={HERO_BG_MOBILE}
          alt="Elegant cake background"
          fill
          className="object-cover object-center block md:hidden"
          quality={75}
          priority
          sizes="100vw"
          data-ai-hint="cake vertical"
        />
      </div>
      <div className="absolute inset-0 bg-primary/30 z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-20"></div>
      <div className="absolute inset-0 z-30 md:hidden flex items-center justify-center -translate-y-[2cm]">
        <Image
          src={LOGO_URL}
          alt="Ayme Varela"
          width={1920}
          height={1300}
          className="h-56 w-auto object-contain drop-shadow-md"
          priority
          quality={90}
          sizes="256px"
        />
      </div>
      <div className="relative z-20 flex flex-col items-center justify-end h-full pb-32 md:pb-40">
        <button
          onClick={scrollToVitrine}
          className="hidden md:block px-16 py-4 bg-white/90 backdrop-blur rounded-full uppercase tracking-[0.4em] text-[10px] font-medium text-primary hover:bg-primary hover:text-white transition-all shadow-xl font-sans"
        >
          Explorar Vitrine
        </button>
      </div>
    </section>
  );
};

    