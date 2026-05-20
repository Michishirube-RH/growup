interface BadgeProps {
  icon: string;
  label: string;
  locked?: boolean;
}

export function Badge({ icon, label, locked }: BadgeProps) {
  return (
    <div
      className={[
        "flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold",
        locked
          ? "border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500"
          : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-400/10 dark:text-amber-300",
      ].join(" ")}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] dark:bg-slate-950">
        {locked ? "🔒" : icon}
      </span>
      {label}
    </div>
  );
}
