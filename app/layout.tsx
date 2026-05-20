import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grow Up Hub",
  description: "Kuis dan tantangan kecil untuk tumbuh setiap hari.",
};

const navItems = [
  { href: "/", label: "Beranda", icon: "H" },
  { href: "/challenges", label: "Tantangan", icon: "T" },
  { href: "/profile", label: "Profil", icon: "P" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#F4FBF8] text-slate-950 transition-colors dark:bg-[#02040A] dark:text-slate-50">
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem("grow-up-hub:theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(t==="dark"||(!t&&d))document.documentElement.classList.add("dark");else document.documentElement.classList.remove("dark")}catch(e){}`}
        </Script>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-20 hidden border-b border-teal-100 bg-white/90 backdrop-blur transition-colors dark:border-teal-400/15 dark:bg-[#070B14]/90 md:block">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1D9E75] font-black text-white">
                  G
                </span>
                <span className="text-lg font-black">Grow Up Hub</span>
              </Link>
              <nav className="flex items-center gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-teal-50 hover:text-[#1D9E75] dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    {item.label}
                  </Link>
                ))}
                <ThemeToggle />
              </nav>
            </div>
          </header>

          <main className="flex-1 pb-24 md:pb-0">{children}</main>

          <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full border-t border-teal-100 bg-white/95 px-4 py-3 backdrop-blur transition-colors dark:border-teal-400/15 dark:bg-[#070B14]/95 md:hidden">
            <div className="grid grid-cols-4 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs font-semibold text-slate-500 transition hover:bg-teal-50 hover:text-[#1D9E75] dark:text-slate-400 dark:hover:bg-slate-900"
                >
                  <span className="text-xl leading-none">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <ThemeToggle compact />
            </div>
          </nav>
        </div>
      </body>
    </html>
  );
}
