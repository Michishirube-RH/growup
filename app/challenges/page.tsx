import Link from "next/link";
import { ChallengeCard } from "@/components/ChallengeCard";
import { Button } from "@/components/ui/Button";
import { challenges } from "@/lib/data";

export default function ChallengesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-5 py-8 sm:px-6 md:py-14 lg:px-8">
      <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1D9E75]">
            Semua Tantangan
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
            Pilih jalur tumbuh yang paling dekat dengan hidupmu.
          </h1>
        </div>
        <Link href="/quiz">
          <Button>Mulai Kuis</Button>
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </section>
    </div>
  );
}
