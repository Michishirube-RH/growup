import { QuestionOption } from "@/types";

interface QuizOptionProps {
  option: QuestionOption;
  selected: boolean;
  onSelect: () => void;
}

export function QuizOption({ option, selected, onSelect }: QuizOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={[
        "flex w-full items-start gap-3 rounded-lg border p-4 text-left transition",
        selected
          ? "border-[#1D9E75] bg-teal-50 shadow-sm dark:bg-teal-400/10"
          : "border-slate-200 bg-white hover:border-teal-200 hover:bg-teal-50/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black",
          selected
            ? "bg-[#1D9E75] text-white"
            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
        ].join(" ")}
      >
        {option.label}
      </span>
      <span className="pt-1 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">
        {option.text}
      </span>
    </button>
  );
}
