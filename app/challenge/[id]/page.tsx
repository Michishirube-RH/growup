import { notFound } from "next/navigation";
import { ChallengeDetail } from "@/components/ChallengeDetail";
import { challenges } from "@/lib/data";

// ✅ TAMBAHKAN INI - untuk generate semua halaman statis
export async function generateStaticParams() {
  return challenges.map((challenge) => ({
    id: challenge.id,
  }));
}

export default async function ChallengePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const challenge = challenges.find((item) => item.id === id);

  if (!challenge) {
    notFound();
  }

  return <ChallengeDetail challenge={challenge} />;
}