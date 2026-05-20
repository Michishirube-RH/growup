"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BadgeDisplay } from "@/components/BadgeDisplay";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { challenges } from "@/lib/data";
import { clearProgress, loadProgress } from "@/lib/storage";
import type { UserProgress } from "@/types";

export default function ProfilePage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setProgress(loadProgress()));
    return () => cancelAnimationFrame(frame);
  }, []);

  const challenge = challenges.find(
    (item) => item.id === progress?.activeChallengeId,
  );
  const percent =
    challenge && progress
      ? (progress.completedDays.length / challenge.days) * 100
      : 0;

  const reset = () => {
    clearProgress();
    setProgress(null);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-5 py-8 sm:px-6 md:py-14 lg:px-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1D9E75]">
          Profil
        </p>
        <h1 className="mt-3 text-3xl font-black sm:text-5xl">Progress kamu</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="space-y-5">
          {challenge && progress ? (
            <>
              <div>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Tantangan aktif</p>
                <h2 className="mt-2 text-2xl font-black">{challenge.title}</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  Hari {progress.currentDay} dari {challenge.days}
                </p>
              </div>
              <ProgressBar value={percent} showLabel color={challenge.color} />
              <div className="flex flex-wrap gap-3">
                <Link href={`/challenge/${challenge.id}`}>
                  <Button>Lanjutkan</Button>
                </Link>
                <Button variant="danger" onClick={reset}>
                  Reset Progress
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-black">Belum ada tantangan aktif.</h2>
              <p className="text-slate-600 dark:text-slate-300">
                Mulai dari kuis atau pilih tantangan yang paling cocok.
              </p>
              <Link href="/quiz">
                <Button>Mulai Kuis</Button>
              </Link>
            </div>
          )}
        </Card>

        <Card className="space-y-4">
          <h2 className="text-2xl font-black">Lencana</h2>
          <BadgeDisplay />
        </Card>
      </div>
    </div>
  );
}
