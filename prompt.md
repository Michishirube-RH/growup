# 🌱 Grow Up Hub — Prompt Guide (Next.js + Tailwind CSS)

Panduan lengkap membangun **Grow Up Hub** menggunakan Next.js App Router dan Tailwind CSS.

---

## Stack Teknologi

| Teknologi | Versi | Kegunaan |
|---|---|---|
| Next.js | 14+ (App Router) | Framework utama |
| Tailwind CSS | 3+ | Styling |
| TypeScript | 5+ | Type safety |
| Zustand | 4+ | State management |
| localStorage | — | Simpan progress |

---

## Prompt 0 — Setup Awal Proyek

> Buatkan perintah untuk setup proyek Next.js 14 dengan App Router, Tailwind CSS, dan TypeScript. Nama proyek: `grow-up-hub`. Sertakan juga instalasi Zustand untuk state management. Tampilkan struktur folder yang disarankan untuk proyek ini.

**Struktur folder yang dihasilkan:**

```
grow-up-hub/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              ← Landing page
│   ├── quiz/
│   │   └── page.tsx          ← Halaman kuis
│   ├── result/
│   │   └── page.tsx          ← Hasil rekomendasi
│   ├── challenges/
│   │   └── page.tsx          ← Semua tantangan
│   └── challenge/
│       └── [id]/
│           └── page.tsx      ← Tantangan harian
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Badge.tsx
│   ├── ChallengeCard.tsx
│   ├── QuizOption.tsx
│   └── BadgeDisplay.tsx
├── lib/
│   ├── data.ts               ← Data tantangan & pertanyaan
│   ├── scoring.ts            ← Logika perhitungan skor
│   └── storage.ts            ← LocalStorage helpers
├── store/
│   └── useQuizStore.ts       ← Zustand store
└── types/
    └── index.ts              ← TypeScript types
```

---

## Prompt 1 — Types & Data

> Buatkan file `types/index.ts` dan `lib/data.ts` untuk proyek Next.js Grow Up Hub dengan TypeScript.
>
> Di `types/index.ts`, definisikan interface untuk: `Challenge` (id, title, sub, days, level, icon, color, bgColor, description, tasks per hari), `Question` (id, text, options array), `QuizAnswer` (questionId, answerIndex, score), dan `UserProgress` (activeChallengeId, currentDay, completedDays, journals, badges).
>
> Di `lib/data.ts`, isi data lengkap untuk 7 tantangan dan 7 pertanyaan kuis sesuai draft Grow Up Hub.

---

## Prompt 2 — Zustand Store

> Buatkan file `store/useQuizStore.ts` menggunakan Zustand untuk Next.js Grow Up Hub. Store harus menyimpan: array jawaban kuis (7 item), fungsi setAnswer(questionIndex, answerIndex), fungsi resetQuiz(), hasil rekomendasi tantangan, dan fungsi calculateResult() yang menghitung skor dan menentukan tantangan utama + alternatif. Gunakan TypeScript.

**Logika skor:**

```
Jawaban A = 3 poin (paling butuh)
Jawaban B = 2 poin
Jawaban C = 1 poin
Jawaban D = 0 poin (sudah baik)

Tantangan dengan total skor tertinggi = rekomendasi utama
```

---

## Prompt 3 — localStorage Helper

> Buatkan file `lib/storage.ts` untuk Next.js Grow Up Hub. Berisi fungsi-fungsi: `saveProgress(data: UserProgress)`, `loadProgress(): UserProgress | null`, `saveJournal(day: number, text: string)`, `loadJournal(day: number): string`, `addBadge(badgeId: string)`, `getBadges(): string[]`, dan `clearProgress()`. Semua menggunakan localStorage dengan error handling yang aman (karena Next.js SSR).

---

## Prompt 4 — Layout & Navbar

> Buatkan file `app/layout.tsx` untuk Grow Up Hub dengan Next.js dan Tailwind CSS. Gunakan Google Font Inter. Buat bottom navigation bar untuk mobile dengan 3 ikon: Beranda, Tantangan, dan Profil. Warna tema utama hijau teal (`#1D9E75`). Layout responsif dengan max-width 480px di tengah layar untuk tampilan mobile-first.

---

## Prompt 5 — Landing Page

> Buatkan `app/page.tsx` untuk landing page Grow Up Hub menggunakan Next.js App Router dan Tailwind CSS. Tampilkan: logo + tagline, tombol 'Mulai Kuis' (link ke /quiz), tombol 'Lihat Semua Tantangan' (link ke /challenges), 3 stat angka (7 tantangan, 5 menit kuis, max 21 hari), dan grid preview 7 kartu tantangan. Gunakan komponen dari `lib/data.ts`. Warna utama hijau teal.

---

## Prompt 6 — Halaman Kuis

> Buatkan `app/quiz/page.tsx` untuk halaman kuis Grow Up Hub dengan Next.js dan Tailwind CSS. Fitur: tampilkan pertanyaan satu per satu, progress bar di atas (persentase dan nomor soal), 4 pilihan jawaban dengan highlight saat dipilih, tombol Kembali dan Lanjut, tombol Lanjut disabled jika belum pilih jawaban, dan setelah pertanyaan ke-7 redirect ke `/result`. Gunakan Zustand store untuk menyimpan jawaban.

---

## Prompt 7 — Halaman Hasil Rekomendasi

> Buatkan `app/result/page.tsx` untuk halaman hasil kuis Grow Up Hub dengan Next.js dan Tailwind CSS. Ambil data hasil dari Zustand store. Tampilkan: tag hijau 'Rekomendasi untukmu', kartu besar tantangan utama (ikon, nama, durasi, level, deskripsi personal), tombol 'Mulai Tantangan Ini' yang redirect ke `/challenge/[id]`, dan list 2–3 tantangan alternatif lain. Jika store kosong (akses langsung tanpa kuis), redirect ke `/quiz`.

---

## Prompt 8 — Halaman Semua Tantangan

> Buatkan `app/challenges/page.tsx` untuk halaman daftar semua tantangan Grow Up Hub dengan Next.js dan Tailwind CSS. Tampilkan semua 7 tantangan dalam list card vertikal. Setiap card berisi: ikon berwarna, nama tantangan, deskripsi singkat, durasi hari, level, dan chevron kanan. Klik card redirect ke `/challenge/[id]`. Ada tombol di bawah untuk mulai kuis jika belum pernah.

---

## Prompt 9 — Halaman Tantangan Harian

> Buatkan `app/challenge/[id]/page.tsx` untuk halaman tantangan harian Grow Up Hub dengan Next.js dan Tailwind CSS. Ambil data tantangan dari params `id`. Tampilkan: header dengan ikon + nama tantangan, progress bar hari ke-X dari total, kotak tugas hari ini, tombol centang 'Sudah selesai' (toggle), area textarea jurnal refleksi opsional, tombol 'Simpan & Lanjut ke Hari Berikutnya', dan bagian lencana. Simpan progress ke localStorage menggunakan helper dari `lib/storage.ts`.

---

## Prompt 10 — Komponen UI Reusable

> Buatkan komponen-komponen UI reusable berikut untuk Grow Up Hub di folder `components/ui/` menggunakan React + Tailwind CSS + TypeScript:
>
> 1. `Button.tsx` — variant: primary (hijau), ghost (border tipis), danger (merah). Props: children, onClick, disabled, fullWidth, icon.
> 2. `Card.tsx` — container kartu dengan border tipis dan border-radius. Props: children, className, onClick.
> 3. `ProgressBar.tsx` — progress bar dengan warna dan persentase. Props: value (0–100), color, showLabel.
> 4. `Badge.tsx` — lencana kecil dengan ikon dan label. Props: icon, label, locked (tampil abu-abu jika terkunci).

---

## Prompt 11 — Sistem Lencana

> Buatkan `components/BadgeDisplay.tsx` untuk sistem lencana Grow Up Hub dengan Next.js dan Tailwind CSS. Tampilkan 5 lencana: Langkah Pertama (hari 1), Setengah Jalan (50%), Konsisten (7 hari berturut), Hampir Sampai (80%), dan Selesai! (100%). Lencana terkunci tampil abu-abu dengan ikon gembok. Lencana terbuka tampil berwarna amber/kuning. Ambil status dari localStorage via `lib/storage.ts`.

---

## Prompt 12 — Animasi & Polish

> Tambahkan animasi dan detail visual ke Grow Up Hub menggunakan Tailwind CSS. Yang perlu ditambahkan: transisi fade+slide saat ganti pertanyaan kuis, animasi tombol centang saat diklik (scale bounce), kartu tantangan dengan hover lift effect, progress bar dengan transisi smooth, dan loading skeleton untuk halaman yang fetch data. Jangan gunakan library animasi eksternal — cukup Tailwind transition dan animate utilities.

---

## Prompt 13 — Deployment

> Buatkan panduan lengkap untuk deploy proyek Next.js Grow Up Hub ke Vercel. Sertakan: checklist sebelum deploy (env variables, build test), langkah push ke GitHub, connect ke Vercel, konfigurasi domain custom jika ada, dan cara update/redeploy setelah ada perubahan kode.

---

## Urutan Pengerjaan

```
0. Setup proyek
   ↓
1. Types & Data
   ↓
2. Zustand Store + 3. localStorage Helper  (bisa paralel)
   ↓
4. Layout & Navbar
   ↓
5. Landing Page
   ↓
6. Halaman Kuis → 7. Halaman Hasil  (berurutan, terhubung)
   ↓
8. Semua Tantangan → 9. Tantangan Harian  (berurutan)
   ↓
10. Komponen UI  (bisa dikerjakan kapan saja, lalu refactor)
    ↓
11. Sistem Lencana
    ↓
12. Animasi & Polish
    ↓
13. Deployment
```

---

## Perintah Terminal

```bash
# Setup proyek
npx create-next-app@latest grow-up-hub \
  --typescript --tailwind --app --src-dir=false

cd grow-up-hub

# Install dependencies
npm install zustand

# Jalankan dev server
npm run dev

# Build untuk production
npm run build

# Deploy ke Vercel
npx vercel
```

---

## Tips Saat Menggunakan Prompt

- Sertakan kode file terkait saat meminta perubahan, contoh: *"ini kode `data.ts` saya saat ini, tolong update..."*
- Sebutkan versi Next.js secara eksplisit agar tidak salah sintaks (App Router vs Pages Router)
- Minta TypeScript strict — lebih baik error awal daripada bug tersembunyi
- Untuk setiap komponen baru, minta sekalian contoh penggunaannya

---

*Dokumen ini dibuat untuk proyek Grow Up Hub — Next.js + Tailwind CSS.*
