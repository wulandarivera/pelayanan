# Sistem Administrasi Surat - Kelurahan Cibodas

Aplikasi administrasi surat untuk Kelurahan Cibodas yang dibangun dengan Next.js 14, TypeScript, Tailwind CSS, dan Supabase.

## Fitur

- 🔐 Autentikasi pengguna (Login/Register)
- 📄 Manajemen surat masuk dan keluar
- 📊 Dashboard statistik
- 👥 Manajemen pengguna
- 🔍 Pencarian dan filter dokumen
- 📱 Responsive design

## Teknologi

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Icons**: Lucide React
- **Authentication**: Supabase Auth

## Instalasi

1. Clone repository ini
2. Install dependencies:
   ```bash
   npm install
   ```

3. Buat file `.env.local` dan isi dengan kredensial Supabase Anda:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Jalankan development server:
   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda

## Struktur Project

```
src/
├── app/              # App router pages
├── components/       # Reusable components
├── lib/             # Utility functions & configs
└── types/           # TypeScript type definitions
```

## Build untuk Production

```bash
npm run build
npm start
```

## License

Private - Kelurahan Cibodas
