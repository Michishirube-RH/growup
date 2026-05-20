# Deploy Grow Up Hub ke Vercel

## Checklist

- Jalankan `npm run lint`.
- Jalankan `npm run build`.
- Pastikan tidak ada secret di kode.
- Jika nanti memakai API/env, simpan di `.env.local` dan daftarkan juga di Vercel Project Settings.

## Push ke GitHub

```bash
git add .
git commit -m "Build Grow Up Hub"
git branch -M main
git remote add origin <URL_REPO_GITHUB>
git push -u origin main
```

## Connect ke Vercel

1. Buka Vercel Dashboard.
2. Pilih Add New Project.
3. Import repo GitHub.
4. Framework akan terdeteksi sebagai Next.js.
5. Build command: `npm run build`.
6. Output directory: biarkan default.
7. Deploy.

## Domain Custom

1. Buka Project Settings di Vercel.
2. Pilih Domains.
3. Tambahkan domain.
4. Ikuti instruksi DNS Vercel.
5. Tunggu propagasi DNS.

## Update Setelah Perubahan

```bash
git add .
git commit -m "Update Grow Up Hub"
git push
```

Vercel otomatis build dan redeploy setiap push ke branch production.
