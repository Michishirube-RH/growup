import type { UserProgress } from "@/types";

const PROGRESS_KEY = "grow-up-hub:progress";
const BADGES_KEY = "grow-up-hub:badges";

const isBrowser = () => typeof window !== "undefined";

export function saveProgress(data: UserProgress) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
    localStorage.setItem(BADGES_KEY, JSON.stringify(data.badges));
  } catch {
    return;
  }
}

export function loadProgress(): UserProgress | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? (JSON.parse(raw) as UserProgress) : null;
  } catch {
    return null;
  }
}

export function saveJournal(day: number, text: string) {
  const progress = loadProgress();
  if (!progress) return;
  saveProgress({
    ...progress,
    journals: { ...progress.journals, [day]: text },
  });
}

export function loadJournal(day: number): string {
  return loadProgress()?.journals?.[day] ?? "";
}

export function addBadge(badgeId: string) {
  if (!isBrowser()) return;
  const progress = loadProgress();
  const badges = getBadges();
  const nextBadges = badges.includes(badgeId) ? badges : [...badges, badgeId];
  try {
    localStorage.setItem(BADGES_KEY, JSON.stringify(nextBadges));
  } catch {
    return;
  }
  if (progress) {
    saveProgress({ ...progress, badges: nextBadges });
  }
}

export function getBadges(): string[] {
  if (!isBrowser()) return [];
  try {
    const progressBadges = loadProgress()?.badges;
    if (progressBadges) return progressBadges;
    const raw = localStorage.getItem(BADGES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function clearProgress() {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(BADGES_KEY);
  } catch {
    return;
  }
}
