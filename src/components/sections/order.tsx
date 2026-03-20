'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Cake, Check, Clock, MessageCircle, User, Upload } from 'lucide-react';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ORDER_BG, WHATSAPP_NUMBER } from '@/lib/constants';
import { SectionTitle } from '../ui/section-title';
import { StandardButton } from '../ui/standard-button';
import { CustomCalendar } from '../custom-calendar';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const fillings = [
  'Ninho com Morango',
  'Prestígio',
  '4 leites com morango',
  'Brigadeiro',
  'Strogonoff de Nozes',
  'Ouro Branco',
  '4 leites com crocante de amendoim',
  'Sonho de Valsa',
  'Maracujá',
  'Coco com Abacaxi',
  'Mousse de Coco',
  'Pudim com Mousse de Doce de Leite'
];

export const OrderFormSection = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    tamanho: '20 pedaços',
    massa: 'Branca',
    recheio: fillings[0],
    topper: false,
    glitter: false,
    data: new Date(),
    horario: 'Tarde (13h - 18h)',
    referenceImage: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setFormData({ ...formData, referenceImage: file });
        setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const removeImage = () => {
    setFormData({ ...formData, referenceImage: null });
    if(imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
  }

  const handleFinalize = () => {
    const dataFormatada = formData.data.toLocaleDateString('pt-BR');
    let message = `🧁 *Novo Pedido Personalizado* %0A%0A` +
      `👤 *Cliente:* ${formData.nome || 'Não informado'}%0A` +
      `📏 *Tamanho:* ${formData.tamanho}%0A` +
      `🍰 *Massa:* ${formData.massa}%0A` +
      `✨ *Recheio:* ${formData.recheio}%0A` +
      `🎨 *Adicionais:* ${[formData.topper ? 'Topper' : '', formData.glitter ? 'Glitter' : ''].filter(Boolean).join(', ') || 'Nenhum'}%0A`;

    if (formData.referenceImage) {
      message += `🖼️ *Imagem de referência:* Sim (anexada no formulário)%0A`;
    }

    message += `%0A📅 *Agendamento:* ${dataFormatada} (${formData.horario})`;
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
        <SectionTitle title="Faça seu pedido" subtitle={step === 1 ? "personalize o seu momento" : "Escolha a data da celebração"} />
        <motion.div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-xl p-8 md:p-12 shadow-2xl border border-stone-100/50">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 font-sans"><CalendarIcon size={14} /> Escolha o tamanho</h4>
                    <div className="flex flex-wrap gap-2">
                      {['20 pedaços', '30 pedaços', '40 pedaços', '50 pedaços'].map(size => (
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
                    <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] font-sans">Recheio Irresistível</h4>
                    <Select value={formData.recheio} onValueChange={(value) => setFormData({ ...formData, recheio: value })}>
                      <SelectTrigger className={cn(commonInputClass, "h-auto justify-between")}>
                        <SelectValue placeholder="Escolha um recheio" />
                      </SelectTrigger>
                      <SelectContent>
                        {fillings.map(filling => (
                          <SelectItem key={filling} value={filling}>{filling}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                <div className="flex flex-col gap-6">
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
                  <div className="space-y-2">
                      <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 font-sans"><Upload size={14} /> Imagem de Referência</h4>
                      <label htmlFor="reference-upload" className="relative w-full h-32 border-2 border-dashed border-stone-200 rounded-xl flex items-center justify-center text-center p-2 cursor-pointer hover:border-primary transition-colors">
                          <input type="file" id="reference-upload" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} accept="image/*" />
                          {imagePreview ? (
                              <Image src={imagePreview} alt="Pré-visualização da imagem de referência" fill className="object-contain rounded-lg p-1" />
                          ) : (
                              <span className="text-stone-500 text-xs font-sans font-medium">Clique para adicionar uma imagem</span>
                          )}
                      </label>
                      {imagePreview && (
                          <StandardButton onClick={removeImage} isNarrow className="w-full text-xs !bg-destructive/10 !text-destructive hover:!bg-destructive hover:!text-white border-destructive/20">Remover Imagem</StandardButton>
                      )}
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
