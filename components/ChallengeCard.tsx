import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Challenge } from "@/types";

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <Link href={`/challenge/${challenge.id}`}>
      <Card className="group">
        <div className="flex items-center gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-xl font-black"
            style={{
              color: challenge.color,
              backgroundColor: challenge.bgColor,
            }}
          >
            {challenge.icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-black text-slate-950 dark:text-slate-50">
                  {challenge.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-500 dark:text-slate-400">
                  {challenge.sub}
                </p>
              </div>
              <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#1D9E75] dark:text-slate-600">
                &gt;
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>{challenge.days} hari</span>
              <span>/</span>
              <span>{challenge.level}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
