import { cn } from "@/lib/utils"

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export const SectionTitle = ({ title, subtitle, className }: SectionTitleProps) => (
  <div className={cn("text-center mb-16 px-4", className)}>
    <h2 className="font-script text-7xl text-primary mb-4 drop-shadow-sm select-none">{title}</h2>
    {subtitle && (
      <p className="text-primary text-[10px] tracking-[0.5em] uppercase font-medium font-sans select-none">{subtitle}</p>
    )}
  </div>
);
