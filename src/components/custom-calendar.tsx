'use client';
import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, getDaysInMonth, getDay, startOfMonth, addMonths, subMonths, isSameDay, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type CustomCalendarProps = {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
};

export const CustomCalendar = ({ selectedDate, onSelect }: CustomCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const totalDays = getDaysInMonth(currentMonth);
    const startDay = getDay(monthStart);
    const dateArray: (Date | null)[] = [];
    
    for (let i = 0; i < startDay; i++) {
      dateArray.push(null);
    }
    
    for (let i = 1; i <= totalDays; i++) {
      dateArray.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }
    
    return dateArray;
  }, [currentMonth]);

  const monthName = format(currentMonth, 'MMMM yyyy', { locale: ptBR });

  return (
    <div className="w-full bg-white rounded-xl border border-stone-100 p-6 shadow-sm font-sans">
      <div className="flex items-center justify-between mb-6 px-2">
        <button onClick={handlePrevMonth} className="p-2 hover:bg-stone-50 rounded-full text-stone-400 transition-colors" aria-label="Previous month">
          <ChevronLeft size={20} />
        </button>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary capitalize">
          {monthName}
        </span>
        <button onClick={handleNextMonth} className="p-2 hover:bg-stone-50 rounded-full text-stone-400 transition-colors" aria-label="Next month">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
          <div key={`cal-head-${i}`} className="text-center text-[10px] font-black text-stone-300 py-2">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, i) => {
          if (!date) return <div key={`cal-empty-${i}`} />;
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const isTodaysDate = isToday(date);
          return (
            <button
              key={`day-${date.getTime()}`}
              onClick={() => onSelect(date)}
              className={cn(
                "aspect-square flex items-center justify-center text-xs rounded-xl transition-all relative font-medium",
                isSelected ? "bg-primary text-white shadow-md font-bold" : "text-stone-600 hover:bg-stone-50",
                isTodaysDate && !isSelected && "border border-accent text-primary"
              )}
            >
              {date.getDate()}
              {isTodaysDate && (
                <div className={cn("absolute bottom-1.5 w-1 h-1 rounded-full", isSelected ? "bg-white" : "bg-accent")} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
