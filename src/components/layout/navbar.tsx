'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { LOGO_URL, SMALL_LOGO_URL, MENU_ITEMS } from '@/lib/constants';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 180);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 flex flex-col items-center">
      <div className={cn("py-12 transition-all duration-500", scrolled ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100")}>
        <Image 
          src={LOGO_URL} 
          alt="Ayme Varela" 
          width={208} 
          height={208} 
          className="h-40 md:h-52 w-auto object-contain brightness-0 invert drop-shadow-md" 
          priority
          quality={100}
        />
      </div>
      <nav className={cn("w-full transition-all duration-500 ease-in-out border-b z-50", scrolled ? "fixed top-0 left-0 bg-white/20 backdrop-blur-lg border-stone-200/30 shadow-sm py-4" : "relative bg-transparent border-transparent py-6")}>
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-center relative min-h-[40px]">
          <div className={cn("absolute left-6 top-1/2 -translate-y-1/2 transition-all duration-500", scrolled ? "opacity-100" : "opacity-0 pointer-events-none")}>
            <Image 
              src={SMALL_LOGO_URL} 
              alt="Logo" 
              width={48} 
              height={48} 
              className="h-10 md:h-12 w-auto object-contain" 
              quality={100}
            />
          </div>
          <div className={cn("hidden md:flex items-center gap-10 text-[10px] tracking-[0.5em] font-medium uppercase transition-colors duration-300 font-sans", scrolled ? "text-primary" : "text-white opacity-95")}>
            {MENU_ITEMS.map((item) => (
              <button key={`nav-${item.id}`} onClick={() => scrollTo(item.id)} className="relative hover:text-accent transition-colors">{item.label}</button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};
