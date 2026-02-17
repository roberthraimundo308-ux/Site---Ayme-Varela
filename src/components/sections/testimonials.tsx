'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TESTIMONIALS_IMAGES } from '@/lib/constants';
import { SectionTitle } from '../ui/section-title';
import { cn } from '@/lib/utils';

const TestimonialsColumn = ({ images, duration = 15, className }: { images: string[]; duration?: number; className?: string }) => (
  <div className={className}>
    <motion.div
      animate={{ translateY: "-50%" }}
      transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      className="flex flex-col gap-8 pb-8 bg-transparent"
    >
      {[...images, ...images].map((img, i) => (
        <div key={`testi-${i}`} className="rounded-2xl border border-stone-100 bg-white shadow-lg shadow-primary/5 overflow-hidden w-full">
          <Image 
            src={img} 
            alt="WhatsApp testimonial screenshot" 
            width={320} 
            height={600}
            className="w-full h-auto object-contain block"
            data-ai-hint="chat message"
          />
        </div>
      ))}
    </motion.div>
  </div>
);

export const Testimonials = () => (
  <section id="depoimentos" className="bg-[#FAF7F2] py-24 relative overflow-hidden border-y border-stone-100">
    <div className="container z-10 mx-auto px-4 text-center">
      <SectionTitle title="Depoimentos" subtitle="O que dizem sobre nós" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[850px] overflow-hidden">
        <TestimonialsColumn images={TESTIMONIALS_IMAGES.slice(0, 3)} duration={25} />
        <TestimonialsColumn images={TESTIMONIALS_IMAGES.slice(3, 7)} duration={35} />
        <TestimonialsColumn images={TESTIMONIALS_IMAGES.slice(0, 4).reverse()} className="hidden lg:block" duration={30} />
      </div>
    </div>
  </section>
);
