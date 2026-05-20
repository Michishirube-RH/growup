import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  icon?: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-[#1D9E75] text-white shadow-lg shadow-teal-700/20 hover:bg-[#178863]",
  ghost: "border border-teal-200 bg-white text-[#1D9E75] hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-900 dark:text-teal-300 dark:hover:bg-slate-800",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

export function Button({
  children,
  variant = "primary",
  fullWidth,
  icon,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
