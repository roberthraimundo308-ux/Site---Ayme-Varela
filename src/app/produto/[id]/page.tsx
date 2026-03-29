'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowLeft, MessageCircle, Cake } from 'lucide-react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRODUCTS, OTHER_PRODUCTS, WHATSAPP_NUMBER, type Product } from '@/lib/constants';
import { StandardButton } from '@/components/ui/standard-button';

const ALL_PRODUCTS = [...PRODUCTS, ...OTHER_PRODUCTS];

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);

  const product = ALL_PRODUCTS.find(p => String(p.id) === params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <p className="text-primary text-lg mb-4">Produto não encontrado</p>
        <Link href="/" className="text-primary underline underline-offset-4 text-sm">
          Voltar ao início
        </Link>
      </div>
    );
  }

  const nextImg = () => setCurrentIdx((prev) => (prev + 1) % product.gallery.length);
  const prevImg = () => setCurrentIdx((prev) => (prev - 1 + product.gallery.length) % product.gallery.length);

  const handleWhatsappOrder = () => {
    const message = `Olá! Tenho interesse no produto *${product.name || product.shortDesc}*. Gostaria de fazer uma encomenda.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Back button */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm px-4 py-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-primary/60 text-xs uppercase tracking-[0.2em] font-medium"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
        </div>

        {/* Image gallery */}
        <div className="relative w-full aspect-square bg-stone-100">
          <Image
            src={product.gallery[currentIdx]}
            alt={`${product.name || product.shortDesc} - imagem ${currentIdx + 1}`}
            fill
            sizes="100vw"
            quality={80}
            priority
            className="object-cover"
            key={currentIdx}
          />
          {product.gallery.length > 1 && (
            <>
              <button
                onClick={prevImg}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/30 backdrop-blur-sm rounded-full"
              >
                <ChevronLeft size={20} className="text-white" />
              </button>
              <button
                onClick={nextImg}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/30 backdrop-blur-sm rounded-full"
              >
                <ChevronRight size={20} className="text-white" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.gallery.map((_, i) => (
                  <div
                    key={`dot-${i}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all bg-white",
                      currentIdx === i ? "w-8" : "w-2 opacity-50"
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="px-6 py-8 flex flex-col flex-grow">
          {product.name && (
            <h1 className="font-script text-4xl text-primary mb-4 leading-tight">
              {product.name}
            </h1>
          )}
          {product.fullDesc && (
            <div className="mb-6">
              <p className="text-primary/70 text-sm italic font-body leading-relaxed">
                &ldquo;{product.fullDesc}&rdquo;
              </p>
            </div>
          )}
          {(product.sizes || product.doughs) && (
            <div className="grid grid-cols-2 gap-4 border-t border-stone-200 pt-6 mb-8">
              {product.sizes && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-1 font-sans flex items-center gap-1.5">
                    <CalendarIcon size={12} /> Tamanho
                  </h4>
                  <p className="text-primary font-medium text-sm font-sans">{product.sizes}</p>
                </div>
              )}
              {product.doughs && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-1 font-sans flex items-center gap-1.5">
                    <Cake size={12} /> Massa
                  </h4>
                  <p className="text-primary font-medium text-sm font-sans">{product.doughs}</p>
                </div>
              )}
            </div>
          )}
          <div className="mt-auto pt-4">
            <StandardButton
              onClick={handleWhatsappOrder}
              className="w-full"
              icon={MessageCircle}
            >
              Pedir Agora
            </StandardButton>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex min-h-screen items-center justify-center py-12 px-8">
        <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl flex flex-row overflow-hidden">
          {/* Image */}
          <div className="w-1/2 relative bg-stone-100">
            <Image
              src={product.gallery[currentIdx]}
              alt={`${product.name || product.shortDesc} - imagem ${currentIdx + 1}`}
              width={800}
              height={800}
              className="w-full h-auto object-contain"
              key={currentIdx}
              sizes="50vw"
              quality={75}
            />
            {product.gallery.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all"
                >
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.gallery.map((_, i) => (
                    <div
                      key={`dot-${i}`}
                      className={cn(
                        "h-1.5 rounded-full transition-all bg-white",
                        currentIdx === i ? "w-8" : "w-2 opacity-50"
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {/* Content */}
          <div className="w-1/2 p-12 flex flex-col">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1.5 text-primary/50 text-xs uppercase tracking-[0.2em] font-medium mb-8 hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              Voltar
            </button>
            {product.name && (
              <h1 className="font-script text-7xl text-primary mb-6 leading-none">
                {product.name}
              </h1>
            )}
            <div className="space-y-6">
              {product.fullDesc && (
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 font-sans">
                    Descrição do Trabalho
                  </h4>
                  <p className="text-primary/80 leading-relaxed text-sm italic font-body">
                    &ldquo;{product.fullDesc}&rdquo;
                  </p>
                </div>
              )}
              {(product.sizes || product.doughs) && (
                <div className="grid grid-cols-2 gap-4 border-t pt-6">
                  {product.sizes && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-1 font-sans flex items-center gap-1.5">
                        <CalendarIcon size={12} /> Tamanho
                      </h4>
                      <p className="text-primary font-medium text-sm font-sans">{product.sizes}</p>
                    </div>
                  )}
                  {product.doughs && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-1 font-sans flex items-center gap-1.5">
                        <Cake size={12} /> Massa
                      </h4>
                      <p className="text-primary font-medium text-sm font-sans">{product.doughs}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="mt-auto pt-8 border-t">
              <StandardButton
                onClick={handleWhatsappOrder}
                className="w-full"
                icon={MessageCircle}
              >
                Pedir Agora
              </StandardButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
