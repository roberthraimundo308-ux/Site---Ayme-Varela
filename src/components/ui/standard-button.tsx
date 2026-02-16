import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type StandardButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
  icon?: LucideIcon;
  isNarrow?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export const StandardButton = ({ children, onClick, active, className, icon: Icon, isNarrow = false, type = 'button', disabled }: StandardButtonProps) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={cn(
      "rounded-full border border-primary text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
      isNarrow ? "py-2.5 px-6" : "py-3 px-10",
      active 
        ? "bg-primary text-white shadow-lg" 
        : "bg-white text-primary hover:bg-primary hover:text-white",
      className
    )}
  >
    {Icon && <Icon size={12} />}
    {children}
  </button>
);
