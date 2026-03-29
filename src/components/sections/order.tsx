'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Cake, Check, Clock, MessageCircle } from 'lucide-react';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ORDER_BG } from '@/lib/constants';
import { SectionTitle } from '../ui/section-title';
import { StandardButton } from '../ui/standard-button';
import { CustomCalendar } from '../custom-calendar';
import { Checkbox } from '../ui/checkbox';

const WHATSAPP = '5547992861817';

/* ── Scroll Wheel Picker (estilo MIUI/Xiaomi) ── */
const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;
const PADDING_ITEMS = Math.floor(VISIBLE_ITEMS / 2);

function ScrollWheelPicker({ items, value, onChange }: { items: string[]; value: string; onChange: (v: string) => void }) {
  const listRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout>>();
  const programmaticScroll = useRef(false);
  const valueRef = useRef(value);
  valueRef.current = value;

  const scrollToIndex = useCallback((index: number, smooth: boolean) => {
    const el = listRef.current;
    if (!el) return;
    programmaticScroll.current = true;
    el.scrollTo({ top: index * ITEM_HEIGHT, behavior: smooth ? 'smooth' : 'auto' });
    // Reset flag after animation
    setTimeout(() => { programmaticScroll.current = false; }, smooth ? 300 : 50);
  }, []);

  // Initial position + sync when value changes externally
  useEffect(() => {
    const idx = items.indexOf(value);
    if (idx >= 0) scrollToIndex(idx, false);
  }, [value, items, scrollToIndex]);

  const handleScroll = useCallback(() => {
    if (programmaticScroll.current) return;

    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const el = listRef.current;
      if (!el) return;

      const rawIndex = el.scrollTop / ITEM_HEIGHT;
      const snappedIndex = Math.max(0, Math.min(items.length - 1, Math.round(rawIndex)));

      // Snap to nearest item
      programmaticScroll.current = true;
      el.scrollTo({ top: snappedIndex * ITEM_HEIGHT, behavior: 'smooth' });
      setTimeout(() => { programmaticScroll.current = false; }, 300);

      const newValue = items[snappedIndex];
      if (newValue !== valueRef.current) {
        onChange(newValue);
      }
    }, 120);
  }, [items, onChange]);

  const handleClick = useCallback((index: number) => {
    onChange(items[index]);
    scrollToIndex(index, true);
  }, [items, onChange, scrollToIndex]);

  const selectedIndex = items.indexOf(value);

  return (
    <div className="relative overflow-hidden rounded-xl" style={{ height: ITEM_HEIGHT * VISIBLE_ITEMS, width: 72 }}>
      {/* Selection highlight */}
      <div
        className="absolute left-0 right-0 pointer-events-none border-y border-primary/20 bg-primary/5 z-10"
        style={{ top: ITEM_HEIGHT * PADDING_ITEMS, height: ITEM_HEIGHT }}
      />
      {/* Fade edges */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />
      <div
        ref={listRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto overscroll-contain"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {/* Top spacer */}
        <div style={{ height: ITEM_HEIGHT * PADDING_ITEMS }} />
        {items.map((item, i) => (
          <div
            key={item}
            onClick={() => handleClick(i)}
            className={cn(
              "flex items-center justify-center cursor-pointer select-none transition-all duration-150",
              i === selectedIndex ? "text-primary font-bold text-xl" : "text-stone-300 text-lg"
            )}
            style={{ height: ITEM_HEIGHT }}
          >
            {item}
          </div>
        ))}
        {/* Bottom spacer */}
        <div style={{ height: ITEM_HEIGHT * PADDING_ITEMS }} />
      </div>
    </div>
  );
}

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

const hours = Array.from({ length: 13 }, (_, i) => String(i + 9).padStart(2, '0'));
const minutes = ['00', '15', '30', '45'];

const stepSubtitles: Record<number, string> = {
  1: 'personalize o seu momento',
  2: 'escolha os sabores',
  3: 'escolha a data da celebração',
  4: 'finalize seu pedido',
};

export const OrderFormSection = ({ className }: { className?: string }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tamanho: '',
    massa: '',
    recheios: [] as string[],
    topper: false,
    glitter: false,
    data: new Date(),
    hora: '14',
    minuto: '00',
  });

  const handleFillingChange = (filling: string) => {
    const current = formData.recheios;
    if (current.includes(filling)) {
      setFormData({ ...formData, recheios: current.filter((f) => f !== filling) });
    } else if (current.length < 2) {
      setFormData({ ...formData, recheios: [...current, filling] });
    }
  };

  const handleFinalize = () => {
    const dataFormatada = formData.data.toLocaleDateString('pt-BR');
    const message = `🧁 *Novo Pedido Personalizado* %0A%0A` +
      `📏 *Tamanho:* ${formData.tamanho || 'Não informado'}%0A` +
      `🍰 *Massa:* ${formData.massa || 'Não informada'}%0A` +
      `✨ *Recheios:* ${formData.recheios.join(', ') || 'Nenhum'}%0A` +
      `🎨 *Adicionais:* ${[formData.topper ? 'Topper' : '', formData.glitter ? 'Glitter' : ''].filter(Boolean).join(', ') || 'Nenhum'}%0A` +
      `%0A📅 *Agendamento:* ${dataFormatada} às ${formData.hora}:${formData.minuto}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${message}`, '_blank');
  };

  const goNext = () => setStep((s) => Math.min(s + 1, 4));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));
  const isNextDisabled = step === 2 && formData.recheios.length < 2;

  return (
    <section id="pedido" className={`relative min-h-screen md:min-h-0 py-10 md:py-24 overflow-hidden bg-white border-y border-stone-100 flex flex-col justify-center ${className ?? ''}`}>
      <Image
        src={ORDER_BG}
        alt="Cake decoration background"
        fill
        className="object-cover object-right z-0 opacity-45"
        quality={70}
        data-ai-hint="cake decoration"
      />
      <div className="absolute top-0 left-0 w-full h-16 md:h-32 bg-gradient-to-b from-background to-transparent z-[1]"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 md:h-32 bg-gradient-to-t from-background to-transparent z-[1]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title="Faça seu pedido" subtitle={stepSubtitles[step]} />
        <motion.div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-xl p-4 md:p-12 shadow-2xl border border-stone-100/50 h-[480px] md:h-auto md:min-h-[420px] flex flex-col">
          <AnimatePresence mode="wait">
            {/* flex-grow to push navigation to bottom */}
            {/* STEP 1 — Tamanho, Massa, Adicionais */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-5">
                <div className="space-y-3">
                  <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 font-sans"><CalendarIcon size={14} /> Escolha o tamanho</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['20 pedaços', '30 pedaços', '40 pedaços', '50 pedaços'].map(size => (
                      <StandardButton key={size} onClick={() => setFormData({ ...formData, tamanho: size })} active={formData.tamanho === size} className="w-full" isNarrow>{size}</StandardButton>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 font-sans"><Cake size={14} /> Escolha a massa</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['Branca', 'Preta'].map(massa => (
                      <StandardButton key={massa} onClick={() => setFormData({ ...formData, massa })} active={formData.massa === massa} className="w-full" isNarrow>
                        <div className={cn("w-2 h-2 rounded-full border border-stone-100", massa === 'Branca' ? "bg-amber-50" : "bg-stone-800")} /> {massa}
                      </StandardButton>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] font-sans">Adicionais Especiais</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <StandardButton onClick={() => setFormData({ ...formData, topper: !formData.topper })} active={formData.topper} className="w-full" icon={formData.topper ? Check : undefined} isNarrow>Topper</StandardButton>
                    <StandardButton onClick={() => setFormData({ ...formData, glitter: !formData.glitter })} active={formData.glitter} className="w-full" icon={formData.glitter ? Check : undefined} isNarrow>Glitter</StandardButton>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Recheios */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] font-sans">Recheios Irresistíveis</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {fillings.map(filling => (
                    <div key={filling} className="flex items-center space-x-3">
                      <Checkbox
                        id={`filling-${filling}`}
                        checked={formData.recheios.includes(filling)}
                        onCheckedChange={() => handleFillingChange(filling)}
                        disabled={formData.recheios.length >= 2 && !formData.recheios.includes(filling)}
                        className="w-4 h-4 rounded-full"
                      />
                      <label
                        htmlFor={`filling-${filling}`}
                        className="text-sm font-sans font-medium text-stone-600 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-none"
                      >
                        {filling}
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3 — Calendário */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 font-sans"><CalendarIcon size={14} /> Dia da Celebração</h4>
                <div className="flex justify-center">
                  <CustomCalendar selectedDate={formData.data} onSelect={(d) => setFormData({ ...formData, data: d })} />
                </div>
              </motion.div>
            )}

            {/* STEP 4 — Horário + Mensagem */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center justify-center flex-1 gap-6">
                <div className="space-y-3 w-full">
                  <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 font-sans"><Clock size={14} /> Horário de Retirada</h4>
                  <div className="flex items-center justify-center gap-2">
                    <ScrollWheelPicker
                      items={hours}
                      value={formData.hora}
                      onChange={(v) => setFormData({ ...formData, hora: v })}
                    />
                    <span className="text-2xl font-bold text-primary">:</span>
                    <ScrollWheelPicker
                      items={minutes}
                      value={formData.minuto}
                      onChange={(v) => setFormData({ ...formData, minuto: v })}
                    />
                  </div>
                </div>
                <p className="text-primary text-sm font-sans text-center leading-relaxed font-medium px-4">
                  Envie uma imagem de referência pelo WhatsApp para personalizarmos seu pedido.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-auto pt-6 md:pt-12 flex items-center gap-4">
            {step > 1 && (
              <button onClick={goBack} className="p-4 text-stone-400 hover:text-primary transition-colors" aria-label="Voltar">
                <ArrowLeft size={24} />
              </button>
            )}
            <button
              onClick={step < 4 ? goNext : handleFinalize}
              disabled={isNextDisabled}
              className={cn(
                "flex-1 py-3 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl transition-all flex items-center justify-center gap-3 font-sans",
                isNextDisabled
                  ? "bg-stone-300 text-white cursor-not-allowed"
                  : "bg-primary text-white hover:bg-opacity-90"
              )}
            >
              {step < 4 ? <>Próximo <ArrowRight size={14} /></> : <>Finalizar Pedido <MessageCircle size={14} /></>}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
