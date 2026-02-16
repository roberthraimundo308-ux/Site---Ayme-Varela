'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Cake, Check, Clock, MessageCircle, User } from 'lucide-react';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ORDER_BG, WHATSAPP_NUMBER } from '@/lib/constants';
import { SectionTitle } from '../ui/section-title';
import { StandardButton } from '../ui/standard-button';
import { CustomCalendar } from '../custom-calendar';
import { Input } from '../ui/input';

export const OrderFormSection = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    tamanho: '30 pedaços',
    massa: 'Branca',
    recheioSuperior: '',
    recheioInferior: '',
    topper: false,
    glitter: false,
    data: new Date(),
    horario: 'Tarde (13h - 18h)',
  });

  const handleFinalize = () => {
    const dataFormatada = formData.data.toLocaleDateString('pt-BR');
    const message = `🧁 *Novo Pedido Personalizado* %0A%0A` +
      `👤 *Cliente:* ${formData.nome || 'Não informado'}%0A` +
      `📏 *Tamanho:* ${formData.tamanho}%0A` +
      `🍰 *Massa:* ${formData.massa}%0A` +
      `✨ *Recheios:* ${formData.recheioSuperior || '?'} / ${formData.recheioInferior || '?'}%0A` +
      `🎨 *Adicionais:* ${[formData.topper ? 'Topper' : '', formData.glitter ? 'Glitter' : ''].filter(Boolean).join(', ') || 'Nenhum'}%0A%0A` +
      `📅 *Agendamento:* ${dataFormatada} (${formData.horario})`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const commonInputClass = "w-full py-3 px-6 rounded-full border border-stone-200 bg-white/50 focus:border-primary focus:ring-primary outline-none text-[10px] font-bold uppercase tracking-widest font-sans transition-all placeholder:font-medium placeholder:tracking-[0.5em]";

  return (
    <section id="pedido" className="relative py-24 overflow-hidden bg-white border-y border-stone-100">
      <Image
        src={ORDER_BG}
        alt="Cake decoration background"
        fill
        className="object-cover z-0 opacity-45"
        quality={70}
        data-ai-hint="cake decoration"
      />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-[1]"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-[1]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title="Faça seu pedido" subtitle={step === 1 ? "Personalize o seu momento doce" : "Escolha a data da celebração"} />
        <motion.div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-xl p-8 md:p-12 shadow-2xl border border-stone-100/50">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 font-sans"><CalendarIcon size={14} /> Escolha o tamanho</h4>
                    <div className="flex flex-wrap gap-2">
                      {['30 pedaços', '40 pedaços', '50 pedaços'].map(size => (
                        <StandardButton key={size} onClick={() => setFormData({...formData, tamanho: size})} active={formData.tamanho === size} isNarrow>{size}</StandardButton>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 font-sans"><Cake size={14} /> Escolha a massa</h4>
                    <div className="flex gap-2">
                      {['Branca', 'Preta'].map(massa => (
                        <StandardButton key={massa} onClick={() => setFormData({...formData, massa: massa})} active={formData.massa === massa} className="flex-1" isNarrow>
                          <div className={cn("w-2 h-2 rounded-full border border-stone-100", massa === 'Branca' ? "bg-amber-50" : "bg-stone-800")} /> {massa}
                        </StandardButton>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] font-sans">Recheios Irresistíveis</h4>
                    <div className="space-y-3">
                      <Input type="text" placeholder="Recheio Superior" className={commonInputClass} value={formData.recheioSuperior} onChange={(e) => setFormData({...formData, recheioSuperior: e.target.value})} />
                      <Input type="text" placeholder="Recheio Inferior" className={commonInputClass} value={formData.recheioInferior} onChange={(e) => setFormData({...formData, recheioInferior: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] font-sans">Adicionais Especiais</h4>
                    <div className="flex gap-2">
                      <StandardButton onClick={() => setFormData({...formData, topper: !formData.topper})} active={formData.topper} className="flex-1" icon={formData.topper ? Check : undefined} isNarrow>Topper</StandardButton>
                      <StandardButton onClick={() => setFormData({...formData, glitter: !formData.glitter})} active={formData.glitter} className="flex-1" icon={formData.glitter ? Check : undefined} isNarrow>Glitter</StandardButton>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 font-sans"><CalendarIcon size={14} /> Dia da Celebração</h4>
                  <CustomCalendar selectedDate={formData.data} onSelect={(d) => setFormData({...formData, data: d})} />
                </div>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 font-sans"><Clock size={14} /> Preferência de Horário</h4>
                    <div className="flex flex-col gap-2">
                      {['Manhã (09h - 12h)', 'Tarde (13h - 18h)', 'Noite (19h - 21h)'].map(time => (
                        <button key={time} onClick={() => setFormData({...formData, horario: time})} className={cn("w-full py-3 px-5 rounded-full text-left transition-all border flex items-center justify-between font-sans font-bold uppercase tracking-[0.2em] text-[10px]", formData.horario === time ? "bg-primary text-white border-primary shadow-lg" : "bg-white text-stone-500 border-stone-200 hover:border-primary")}>
                          <span>{time}</span>
                          {formData.horario === time && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-stone-100">
                    <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 font-sans"><User size={14} /> Seu Nome</h4>
                    <Input type="text" className={commonInputClass} value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
                  </div>
                  <div className="p-5 bg-amber-50/50 rounded-2xl border border-accent/20">
                    <p className="text-sm text-primary leading-relaxed font-body font-medium italic">
                      ✨ Já tem uma foto de modelo? Após finalizar, você poderá enviá-la diretamente pelo nosso WhatsApp para referência!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-12 flex items-center gap-4">
            {step === 2 && <button onClick={() => setStep(1)} className="p-4 text-stone-400 hover:text-primary transition-colors" aria-label="Go back"><ArrowLeft size={24} /></button>}
            <button onClick={step === 1 ? () => setStep(2) : handleFinalize} className="flex-1 py-4 bg-primary text-white rounded-full font-bold uppercase tracking-[0.4em] text-[10px] shadow-xl hover:bg-opacity-90 transition-all flex items-center justify-center gap-3 font-sans">
              {step === 1 ? <>Selecionar Data <ArrowRight size={14} /></> : <>Finalizar Pedido <MessageCircle size={14} /></>}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
