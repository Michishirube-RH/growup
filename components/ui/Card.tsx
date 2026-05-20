import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClick?: () => void;
}

export function Card({ children, className = "", onClick, ...props }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={[
        "rounded-lg border border-slate-200 bg-white p-4 transition duration-200 dark:border-teal-400/10 dark:bg-[#0B1220]",
        onClick
          ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/70 dark:hover:shadow-black/20"
          : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
