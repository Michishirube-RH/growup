import type { Challenge, Question } from "@/types";

const makeTasks = (theme: string, days: number): Challenge["tasks"] =>
  Array.from({ length: days }, (_, index) => {
    const day = index + 1;
    return {
      day,
      title: `${theme} hari ${day}`,
      detail:
        day === 1
          ? "Mulai dari aksi paling kecil selama 5 menit, lalu catat rasanya."
          : day % 7 === 0
            ? "Review progres minggu ini dan pilih satu kebiasaan yang ingin dijaga."
            : "Lakukan satu aksi sederhana hari ini, fokus pada konsistensi bukan sempurna.",
    };
  });

export const challenges: Challenge[] = [
  {
    id: "morning-reset",
    title: "Morning Reset",
    sub: "Bangun hari dengan arah jelas.",
    days: 7,
    level: "Ringan",
    icon: "MR",
    color: "#F59E0B",
    bgColor: "#FFF7ED",
    description:
      "Cocok jika pagi terasa terburu-buru, energi mudah bocor, atau hari sering dimulai tanpa niat.",
    tasks: makeTasks("Ritual pagi sadar", 7),
  },
  {
    id: "focus-flow",
    title: "Focus Flow",
    sub: "Kurangi distraksi, naikkan fokus.",
    days: 14,
    level: "Sedang",
    icon: "FF",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    description:
      "Untuk kamu yang ingin kerja/belajar lebih tenang tanpa terus kalah oleh notifikasi.",
    tasks: makeTasks("Latihan fokus", 14),
  },
  {
    id: "calm-mind",
    title: "Calm Mind",
    sub: "Latih jeda sebelum bereaksi.",
    days: 10,
    level: "Ringan",
    icon: "CM",
    color: "#14B8A6",
    bgColor: "#F0FDFA",
    description:
      "Pas ketika pikiran ramai, emosi cepat naik, atau tubuh butuh ruang bernapas.",
    tasks: makeTasks("Latihan tenang", 10),
  },
  {
    id: "body-energy",
    title: "Body Energy",
    sub: "Gerak kecil untuk energi stabil.",
    days: 14,
    level: "Sedang",
    icon: "BE",
    color: "#EF4444",
    bgColor: "#FEF2F2",
    description:
      "Bantu tubuh kembali aktif lewat gerakan pendek, hidrasi, dan tidur yang lebih rapi.",
    tasks: makeTasks("Energi tubuh", 14),
  },
  {
    id: "money-clarity",
    title: "Money Clarity",
    sub: "Rapikan relasi dengan uang.",
    days: 7,
    level: "Fokus",
    icon: "$",
    color: "#16A34A",
    bgColor: "#F0FDF4",
    description:
      "Untuk mulai sadar pola belanja, mencatat uang keluar, dan membuat keputusan lebih tenang.",
    tasks: makeTasks("Kejelasan uang", 7),
  },
  {
    id: "social-brave",
    title: "Social Brave",
    sub: "Berani hadir dan terhubung.",
    days: 10,
    level: "Sedang",
    icon: "SB",
    color: "#A855F7",
    bgColor: "#FAF5FF",
    description:
      "Latihan kecil untuk membuka percakapan, meminta bantuan, dan hadir tanpa banyak menebak.",
    tasks: makeTasks("Keberanian sosial", 10),
  },
  {
    id: "purpose-path",
    title: "Purpose Path",
    sub: "Cari arah lewat refleksi kecil.",
    days: 21,
    level: "Fokus",
    icon: "PP",
    color: "#0F766E",
    bgColor: "#ECFDF5",
    description:
      "Jika sedang merasa jalan hidup kabur, tantangan ini membantu membaca nilai dan pilihanmu.",
    tasks: makeTasks("Arah hidup", 21),
  },
];

const options = [
  { label: "A", text: "Sangat sering dan ingin segera dibantu.", score: 3 },
  { label: "B", text: "Cukup sering, tapi masih bisa dikelola.", score: 2 },
  { label: "C", text: "Kadang muncul, belum terlalu mengganggu.", score: 1 },
  { label: "D", text: "Jarang, area ini sudah cukup baik.", score: 0 },
];

export const questions: Question[] = [
  {
    id: "q-morning",
    challengeId: "morning-reset",
    text: "Seberapa sering harimu dimulai tanpa arah atau terasa buru-buru?",
    options,
  },
  {
    id: "q-focus",
    challengeId: "focus-flow",
    text: "Seberapa sering fokusmu pecah oleh distraksi digital atau pikiran lompat?",
    options,
  },
  {
    id: "q-calm",
    challengeId: "calm-mind",
    text: "Seberapa sering pikiran terasa penuh dan sulit diberi jeda?",
    options,
  },
  {
    id: "q-body",
    challengeId: "body-energy",
    text: "Seberapa sering tubuh terasa lelah, kaku, atau kurang energi?",
    options,
  },
  {
    id: "q-money",
    challengeId: "money-clarity",
    text: "Seberapa sering keputusan uang terasa kabur atau impulsif?",
    options,
  },
  {
    id: "q-social",
    challengeId: "social-brave",
    text: "Seberapa sering kamu menahan diri untuk bicara, meminta bantuan, atau terhubung?",
    options,
  },
  {
    id: "q-purpose",
    challengeId: "purpose-path",
    text: "Seberapa sering kamu merasa arah personalmu belum jelas?",
    options,
  },
];

export const badges = [
  { id: "first-step", label: "Langkah Pertama", icon: "1", threshold: 1 },
  { id: "halfway", label: "Setengah Jalan", icon: "50", threshold: 50 },
  { id: "consistent", label: "Konsisten", icon: "7", threshold: 7 },
  { id: "almost", label: "Hampir Sampai", icon: "80", threshold: 80 },
  { id: "finished", label: "Selesai!", icon: "100", threshold: 100 },
];
