interface ProgressBarProps {
  value: number;
  color?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  color = "#1D9E75",
  showLabel,
}: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className="space-y-2">
      {showLabel ? (
        <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
          <span>Progress</span>
          <span>{Math.round(safeValue)}%</span>
        </div>
      ) : null}
      <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${safeValue}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
