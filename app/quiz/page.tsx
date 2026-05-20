"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QuizOption } from "@/components/QuizOption";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { questions } from "@/lib/data";
import { useQuizStore } from "@/store/useQuizStore";

export default function QuizPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const { answers, setAnswer, calculateResult } = useQuizStore();
  const question = questions[index];
  const selectedIndex = answers[index]?.answerIndex;
  const progress = useMemo(
    () => ((index + 1) / questions.length) * 100,
    [index],
  );

  const goNext = () => {
    if (selectedIndex === undefined) return;
    if (index === questions.length - 1) {
      calculateResult();
      router.push("/result");
      return;
    }
    setIndex((value) => value + 1);
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-6 md:py-14 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link href="/" className="text-sm font-bold text-slate-500 hover:text-[#1D9E75] dark:text-slate-400">
          Kembali
        </Link>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-[#1D9E75] dark:bg-teal-400/10 dark:text-teal-300">
          Soal {index + 1}/{questions.length}
        </span>
      </div>

      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="space-y-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1D9E75]">
              Kuis Rekomendasi
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              Jawab jujur, bukan sempurna.
            </h1>
          </div>
          <ProgressBar value={progress} showLabel />
        </aside>

        <div key={question.id} className="animate-fade-slide rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-teal-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 sm:p-7">
          <h2 className="text-xl font-black leading-8 sm:text-2xl">
            {question.text}
          </h2>

          <div className="mt-6 grid gap-3">
            {question.options.map((option, optionIndex) => (
              <QuizOption
                key={option.label}
                option={option}
                selected={selectedIndex === optionIndex}
                onSelect={() => setAnswer(index, optionIndex)}
              />
            ))}
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <Button
              variant="ghost"
              disabled={index === 0}
              onClick={() => setIndex((value) => Math.max(0, value - 1))}
            >
              Kembali
            </Button>
            <Button disabled={selectedIndex === undefined} onClick={goNext}>
              {index === questions.length - 1 ? "Lihat Hasil" : "Lanjut"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
