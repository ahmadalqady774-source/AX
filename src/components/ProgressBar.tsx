import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

interface ProgressBarProps {
  progress: number;
  label?: string;
  className?: string;
  colorClass?: string;
}

export default function ProgressBar({ progress, label, className, colorClass = "bg-emerald-500" }: ProgressBarProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <div className="flex justify-between text-[11px] font-medium text-slate-500">
          <span>{label}</span>
          <span>{progress}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className={cn("h-full rounded-full", colorClass)}
        />
      </div>
    </div>
  );
}
