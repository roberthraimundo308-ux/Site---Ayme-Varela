'use client';
import Image from 'next/image';
import { LOGO_URL, MENU_ITEMS, WHATSAPP_NUMBER } from '@/lib/constants';
import { MessageCircle, Info, Instagram } from 'lucide-react';

export const Footer = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-primary text-white font-sans min-h-screen md:min-h-0 flex flex-col">
      {/* Mobile */}
      <div className="md:hidden flex-1 flex flex-col items-center justify-center px-8 py-12 gap-10">
        <Image
          src={LOGO_URL}
          alt="Logo"
          width={1920}
          height={1300}
          className="h-44 w-auto"
          quality={90}
          sizes="320px"
        />
        <div className="flex flex-col items-center gap-6">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-white/70 transition-colors">
            <MessageCircle size={22} />
            <span className="text-sm font-bold tracking-widest">(47) 99286-1817</span>
          </a>
          <div className="flex items-center gap-4 text-white/60">
            <Info size={20} className="opacity-50" />
            <span className="text-sm font-bold tracking-widest">Mafra - SC</span>
          </div>
          <a href="https://instagram.com/ayme_varela" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity pt-4">
            <Instagram size={28} />
          </a>
        </div>
        <p className="text-white/20 text-[9px] uppercase tracking-[0.6em] font-bold text-center">
          Todos os direitos reservados {currentYear} Ayme Varela
        </p>
      </div>

      {/* Desktop */}
      <div className="hidden md:block pt-24 pb-12">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 text-center md:text-left mb-24">
            <div className="flex flex-col items-center md:items-start gap-8">
              <Image
                src={LOGO_URL}
                alt="Logo"
                width={1920}
                height={1300}
                className="h-32 w-auto"
                quality={90}
                sizes="256px"
              />
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 font-sans">Navegação</h4>
              <ul className="space-y-4">
                {MENU_ITEMS.map((item) => (
                  <li key={`foot-nav-${item.id}`}>
                    <button onClick={() => scrollTo(item.id)} className="text-white hover:text-white/60 transition-colors text-[10px] font-bold uppercase tracking-[0.3em] font-sans">
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 font-sans">Contacto</h4>
              <div className="space-y-6">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-4 hover:text-white/70 transition-colors group">
                  <MessageCircle size={22} className="text-white" />
                  <span className="text-sm font-bold tracking-widest font-sans">(47) 99286-1817</span>
                </a>
                <div className="flex items-center justify-center md:justify-start gap-4 text-white/60">
                  <Info size={20} className="opacity-50" />
                  <span className="text-sm font-bold tracking-widest font-sans">Mafra - SC</span>
                </div>
                <div className="flex justify-center md:justify-start pt-6 border-t border-white/10">
                  <a href="https://instagram.com/ayme_varela" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                    <Instagram size={28} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 text-center">
            <p className="text-white/20 text-[9px] uppercase tracking-[0.6em] font-bold font-sans">
              Todos os direitos reservados {currentYear} Ayme Varela
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
