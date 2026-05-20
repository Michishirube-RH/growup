export default function ChallengesLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-5 py-8 sm:px-6 md:py-14 lg:px-8">
      <div className="h-28 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-36 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
        ))}
      </div>
    </div>
  );
}
