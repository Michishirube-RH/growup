"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChallengeCard } from "@/components/ChallengeCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { challenges } from "@/lib/data";
import { calculateQuizResult } from "@/lib/scoring";
import { useQuizStore } from "@/store/useQuizStore";

export default function ResultPage() {
  const router = useRouter();
  const { answers, result } = useQuizStore();
  const finalResult = result ?? (answers.length ? calculateQuizResult(answers) : null);
  const primary = challenges.find(
    (challenge) => challenge.id === finalResult?.primaryChallengeId,
  );
  const alternatives = challenges.filter((challenge) =>
    finalResult?.alternativeChallengeIds.includes(challenge.id),
  );

  useEffect(() => {
    if (!answers.length) {
      router.replace("/quiz");
    }
  }, [answers.length, router]);

  if (!primary) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-12">
        <div className="h-40 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-5 py-8 sm:px-6 md:py-14 lg:px-8">
      <div>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#1D9E75] dark:bg-teal-400/10 dark:text-teal-300">
          Rekomendasi untukmu
        </span>
        <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
          Mulai dari {primary.title}.
        </h1>
      </div>

      <Card className="overflow-hidden p-0">
        <div
          className="grid gap-6 bg-teal-50 p-6 dark:bg-[#0B1220] md:grid-cols-[0.8fr_1.2fr] md:p-8"
        >
          <div className="flex h-28 w-28 items-center justify-center rounded-lg bg-white text-3xl font-black shadow-sm dark:bg-[#02040A]" style={{ color: primary.color }}>
            {primary.icon}
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-black">{primary.title}</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{primary.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
              <span>{primary.days} hari</span>
              <span>/</span>
              <span>{primary.level}</span>
            </div>
            <Link href={`/challenge/${primary.id}`}>
              <Button>Mulai Tantangan Ini</Button>
            </Link>
          </div>
        </div>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-black">Alternatif lain</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {alternatives.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </section>
    </div>
  );
}
