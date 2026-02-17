'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Cake } from 'lucide-react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/constants';

type ProductDetailModalProps = {
  product: Product;
  onClose: () => void;
};

export const ProductDetailModal = ({ product, onClose }: ProductDetailModalProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % product.gallery.length);
  };
  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + product.gallery.length) % product.gallery.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      aria-modal="true"
      role="dialog"
    >
      <div className="fixed inset-0 bg-primary/60 backdrop-blur-md" onClick={onClose}></div>
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col md:flex-row md:overflow-hidden border border-white/20 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X size={24} className="text-primary" />
        </button>
        <div className="w-full md:w-1/2 relative bg-stone-100 flex items-center">
          <Image
            src={product.gallery[currentIdx]}
            alt={`${product.name} - image ${currentIdx + 1}`}
            width={600}
            height={600}
            className="w-full h-auto object-contain"
            key={currentIdx}
            sizes="50vw"
            quality={100}
          />
          <button
            onClick={prevImg}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImg}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all"
            aria-label="Next image"
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
              ></div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="font-script text-5xl md:text-7xl text-primary mb-6 leading-none">
            {product.name}
          </h2>
          <div className="space-y-6">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 font-sans">
                Descrição do Trabalho
              </h4>
              <p className="text-primary/80 leading-relaxed text-sm italic font-body">
                "{product.fullDesc}"
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-stone-100 pt-6">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-1 font-sans flex items-center gap-1.5">
                  <CalendarIcon size={12} /> Tamanho
                </h4>
                <p className="text-primary font-medium text-sm font-sans">{product.sizes}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-1 font-sans flex items-center gap-1.5">
                  <Cake size={12} /> Massa
                </h4>
                <p className="text-primary font-medium text-sm font-sans">{product.doughs}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
