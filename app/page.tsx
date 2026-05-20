import Link from "next/link";
import { ChallengeCard } from "@/components/ChallengeCard";
import { Button } from "@/components/ui/Button";
import { challenges } from "@/lib/data";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-5 py-8 sm:px-6 md:py-14 lg:px-8">
      <section className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#1D9E75] text-2xl font-black text-white shadow-lg shadow-teal-700/20 md:hidden">
              G
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1D9E75]">
                Grow Up Hub
              </p>
              <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-slate-950 dark:text-slate-50 sm:text-5xl lg:text-6xl">
                Tumbuh pelan, konsisten, dan terasa mungkin.
              </h1>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              Temukan tantangan paling pas lewat kuis 5 menit, lalu jalani aksi
              kecil harian sampai kebiasaan baru terasa nyata.
            </p>
          </div>

          <div className="grid gap-3 sm:flex">
          <Link href="/quiz" className="sm:w-auto">
            <Button fullWidth className="sm:w-auto">
              Mulai Kuis
            </Button>
          </Link>
          <Link href="/challenges" className="sm:w-auto">
            <Button variant="ghost" fullWidth className="sm:w-auto">
              Lihat Semua Tantangan
            </Button>
          </Link>
          </div>
        </div>

        <div className="rounded-lg border border-teal-100 bg-white p-5 shadow-xl shadow-teal-900/10 dark:border-teal-400/15 dark:bg-[#0B1220] dark:shadow-teal-950/40">
          <div className="grid gap-3">
            {challenges.slice(0, 3).map((challenge) => (
              <div
                key={challenge.id}
                className="flex items-center gap-4 rounded-lg border border-transparent bg-slate-50 p-4 dark:border-teal-400/10 dark:bg-[#101A2C]"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-xl font-black dark:bg-[#02040A]"
                  style={{ color: challenge.color }}
                >
                  {challenge.icon}
                </span>
                <div>
                  <h3 className="font-black">{challenge.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {challenge.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {[
          ["7", "tantangan"],
          ["5", "menit kuis"],
          ["21", "hari max"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="rounded-lg bg-teal-50 p-4 text-center dark:bg-teal-400/10"
          >
            <div className="text-2xl font-black text-[#1D9E75]">{value}</div>
            <div className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {label}
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-black">Preview Tantangan</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
            Pilih langsung atau biarkan kuis memandu.
            </p>
          </div>
          <Link href="/challenges" className="text-sm font-black text-[#1D9E75]">
            Lihat semua
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </section>
    </div>
  );
}
