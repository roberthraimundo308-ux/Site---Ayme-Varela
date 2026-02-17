'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { LOGO_URL, SMALL_LOGO_URL, MENU_ITEMS, WHATSAPP_NUMBER } from '@/lib/constants';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 180);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleMenuClick = (id: string) => {
    scrollTo(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 flex flex-col items-center">
      <div className={cn("py-12 transition-all duration-500", scrolled ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100")}>
        <Image
          src={LOGO_URL}
          alt="Ayme Varela"
          width={512}
          height={512}
          className="h-40 md:h-52 w-auto object-contain brightness-0 invert drop-shadow-md"
          priority
          quality={100}
          sizes="512px"
        />
      </div>
      <nav className={cn("w-full transition-all duration-500 ease-in-out border-b z-50", scrolled ? "fixed top-0 left-0 bg-white/20 backdrop-blur-lg border-stone-200/30 shadow-sm py-4" : "relative bg-transparent border-transparent py-6")}>
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-center relative min-h-[40px]">
          <div className={cn("md:absolute md:left-6 md:top-1/2 md:-translate-y-1/2 transition-all duration-500", scrolled ? "opacity-100" : "opacity-0 pointer-events-none")}>
            <Image
              src={SMALL_LOGO_URL}
              alt="Logo"
              width={128}
              height={128}
              className="h-10 md:h-12 w-auto object-contain"
              quality={100}
              sizes="128px"
            />
          </div>

          {/* Desktop Menu */}
          <div className={cn("hidden md:flex items-center gap-10 text-[10px] tracking-[0.5em] font-medium uppercase transition-colors duration-300 font-sans", scrolled ? "text-primary" : "text-white opacity-95")}>
            {MENU_ITEMS.map((item) => (
              <button key={`nav-${item.id}`} onClick={() => scrollTo(item.id)} className="relative hover:text-accent transition-colors">{item.label}</button>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden absolute right-6 top-1/2 -translate-y-1/2">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                    <button className={cn("p-2 transition-colors duration-300 rounded-md -mr-2", scrolled ? "text-primary hover:bg-black/5" : "text-white hover:bg-white/10")}>
                        <Menu size={24} />
                        <span className="sr-only">Abrir menu</span>
                    </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-white p-0 w-[80vw] max-w-sm">
                    <div className="flex flex-col h-full">
                        <div className="p-6 border-b border-stone-100">
                            <Image
                                src={SMALL_LOGO_URL}
                                alt="Logo"
                                width={128}
                                height={128}
                                className="h-10 w-auto object-contain"
                                quality={100}
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center flex-grow gap-8 text-sm tracking-[0.3em] font-medium uppercase text-primary font-sans">
                            {MENU_ITEMS.map((item) => (
                                <button key={`mobile-nav-${item.id}`} onClick={() => handleMenuClick(item.id)} className="relative hover:text-accent transition-colors">
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <div className="p-6 text-center border-t border-stone-100">
                             <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-primary text-xs font-sans transition-colors">
                                Fale conosco pelo WhatsApp
                            </a>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
          </div>

        </div>
      </nav>
    </header>
  );
};