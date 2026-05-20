"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BadgeDisplay } from "@/components/BadgeDisplay";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { addBadge, loadProgress, saveProgress } from "@/lib/storage";
import type { Challenge, UserProgress } from "@/types";

function createProgress(challengeId: string): UserProgress {
  return {
    activeChallengeId: challengeId,
    currentDay: 1,
    completedDays: [],
    journals: {},
    badges: [],
  };
}

function badgesFor(completed: number, total: number) {
  const percent = (completed / total) * 100;
  return [
    completed >= 1 ? "first-step" : null,
    completed >= Math.ceil(total * 0.5) ? "halfway" : null,
    completed >= 7 ? "consistent" : null,
    percent >= 80 ? "almost" : null,
    percent >= 100 ? "finished" : null,
  ].filter(Boolean) as string[];
}

export function ChallengeDetail({ challenge }: { challenge: Challenge }) {
  const [progress, setProgress] = useState<UserProgress>(() =>
    createProgress(challenge.id),
  );
  const [doneToday, setDoneToday] = useState(false);
  const [journal, setJournal] = useState("");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const stored = loadProgress();
      const next =
        stored?.activeChallengeId === challenge.id
          ? stored
          : createProgress(challenge.id);
      setProgress(next);
      setDoneToday(next.completedDays.includes(next.currentDay));
      setJournal(next.journals[next.currentDay] ?? "");
    });
    return () => cancelAnimationFrame(frame);
  }, [challenge.id]);

  const task = challenge.tasks[progress.currentDay - 1] ?? challenge.tasks[0];
  const percent = useMemo(
    () => (progress.completedDays.length / challenge.days) * 100,
    [challenge.days, progress.completedDays.length],
  );

  const persist = (next: UserProgress) => {
    setProgress(next);
    saveProgress(next);
  };

  const toggleDone = () => {
    const completed = progress.completedDays.includes(progress.currentDay)
      ? progress.completedDays.filter((day) => day !== progress.currentDay)
      : [...progress.completedDays, progress.currentDay].sort((a, b) => a - b);
    const unlocked = badgesFor(completed.length, challenge.days);
    unlocked.forEach(addBadge);
    persist({ ...progress, completedDays: completed, badges: unlocked });
    setDoneToday(completed.includes(progress.currentDay));
  };

  const saveAndNext = () => {
    const completed = progress.completedDays.includes(progress.currentDay)
      ? progress.completedDays
      : [...progress.completedDays, progress.currentDay].sort((a, b) => a - b);
    const nextDay = Math.min(challenge.days, progress.currentDay + 1);
    const unlocked = badgesFor(completed.length, challenge.days);
    unlocked.forEach(addBadge);
    const next = {
      ...progress,
      currentDay: nextDay,
      completedDays: completed,
      journals: { ...progress.journals, [progress.currentDay]: journal },
      badges: unlocked,
    };
    persist(next);
    setDoneToday(completed.includes(nextDay));
    setJournal(next.journals[nextDay] ?? "");
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-5 py-8 sm:px-6 md:py-14 lg:px-8">
      <Link href="/challenges" className="text-sm font-bold text-slate-500 hover:text-[#1D9E75] dark:text-slate-400">
        Kembali ke tantangan
      </Link>

      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-xl font-black dark:bg-[#0B1220]"
              style={{ color: challenge.color }}
            >
              {challenge.icon}
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1D9E75]">
                Hari {progress.currentDay} dari {challenge.days}
              </p>
              <h1 className="mt-2 text-3xl font-black leading-tight sm:text-5xl">
                {challenge.title}
              </h1>
              <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">{challenge.description}</p>
            </div>
          </div>

          <ProgressBar value={percent} showLabel color={challenge.color} />

          <Card className="space-y-5">
            <div>
              <p className="text-sm font-bold text-[#1D9E75]">Tugas hari ini</p>
              <h2 className="mt-2 text-2xl font-black">{task.title}</h2>
              <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{task.detail}</p>
            </div>

            <button
              onClick={toggleDone}
              className={[
                "flex w-full items-center justify-center gap-3 rounded-lg border px-5 py-4 text-sm font-black transition active:scale-95",
                doneToday
                  ? "border-[#1D9E75] bg-teal-50 text-[#1D9E75] dark:bg-teal-400/15 dark:text-teal-300"
                  : "border-slate-200 bg-white text-slate-600 hover:border-teal-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300",
              ].join(" ")}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border">
                {doneToday ? "OK" : ""}
              </span>
              Sudah selesai
            </button>

            <label className="block space-y-2">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Jurnal refleksi opsional</span>
              <textarea
                value={journal}
                onChange={(event) => setJournal(event.target.value)}
                rows={5}
                className="w-full resize-none rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 outline-none transition focus:border-[#1D9E75] focus:ring-4 focus:ring-teal-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-teal-400/10"
                placeholder="Apa yang kamu sadari hari ini?"
              />
            </label>

            <Button fullWidth onClick={saveAndNext}>
              Simpan & Lanjut ke Hari Berikutnya
            </Button>
          </Card>
        </div>

        <aside className="space-y-4">
          <h2 className="text-2xl font-black">Lencana</h2>
          <BadgeDisplay />
        </aside>
      </section>
    </div>
  );
}
