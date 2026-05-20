"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { badges, challenges } from "@/lib/data";
import { getBadges, loadProgress } from "@/lib/storage";

function readUnlockedBadges() {
  const progress = loadProgress();
  const stored = getBadges();
  const computed = new Set(stored);

  if (progress) {
    const total = progress.completedDays.length;
    const challengeDays =
      challenges.find((challenge) => challenge.id === progress.activeChallengeId)
        ?.days ?? 1;
    const percent = (total / challengeDays) * 100;
    if (total >= 1) computed.add("first-step");
    if (total >= 7) computed.add("consistent");
    if (percent >= 50) computed.add("halfway");
    if (percent >= 80) computed.add("almost");
    if (percent >= 100) computed.add("finished");
  }

  return [...computed];
}

export function BadgeDisplay() {
  const [unlocked, setUnlocked] = useState<string[]>([]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setUnlocked(readUnlockedBadges());
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="grid gap-2">
      {badges.map((badge) => (
        <Badge
          key={badge.id}
          icon={badge.icon}
          label={badge.label}
          locked={!unlocked.includes(badge.id)}
        />
      ))}
    </div>
  );
}
