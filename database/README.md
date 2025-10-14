# Database Setup - PostgreSQL (Supabase)

## 🎯 Recommended: Gunakan Supabase

**Untuk setup yang lebih mudah, gunakan Supabase (cloud PostgreSQL):**

📖 **Lihat panduan lengkap**: [SUPABASE_SETUP.md](../SUPABASE_SETUP.md)

### Keuntungan Supabase:
- ✅ Tidak perlu install PostgreSQL lokal
- ✅ Free tier 500MB database
- ✅ Dashboard UI yang mudah
- ✅ Auto backup
- ✅ SSL connection built-in

---

## 📋 Alternative: PostgreSQL Lokal

Jika ingin menggunakan PostgreSQL lokal:

### Prerequisites

1. **PostgreSQL** terinstall di komputer Anda
   - Download: https://www.postgresql.org/download/
   - Versi minimal: PostgreSQL 12+

2. **pgAdmin** (Optional, untuk GUI management)
   - Biasanya sudah include saat install PostgreSQL

## 🚀 Setup Database (Lokal)

### 1. Buat Database Baru

**Menggunakan psql (Command Line):**

```bash
# Login ke PostgreSQL
psql -U postgres

# Buat database
CREATE DATABASE pelayanan_kelurahan;

# Keluar dari psql
\q
```

**Menggunakan pgAdmin:**
1. Buka pgAdmin
2. Right-click pada "Databases" → Create → Database
3. Nama: `pelayanan_kelurahan`
4. Owner: `postgres`
5. Click "Save"

### 2. Jalankan Schema

```bash
# Dari root project
psql -U postgres -d pelayanan_kelurahan -f database/schema.sql
```

Atau copy-paste isi file `schema.sql` ke pgAdmin Query Tool dan execute.

### 3. Jalankan Seed Data

```bash
# Dari root project
psql -U postgres -d pelayanan_kelurahan -f database/seed.sql
```

Atau copy-paste isi file `seed.sql` ke pgAdmin Query Tool dan execute.

### 4. Konfigurasi Environment Variables

Copy file `.env.example` menjadi `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` dan sesuaikan dengan konfigurasi PostgreSQL Anda:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pelayanan_kelurahan
DB_USER=postgres
DB_PASSWORD=your_postgres_password
```

## 📊 Struktur Database

### Tables

#### 1. **kelurahan**
Menyimpan data kelurahan di Kecamatan Cibodas

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| nama | VARCHAR(100) | Nama kelurahan (UPPERCASE) |
| nama_lengkap | VARCHAR(150) | Nama lengkap dengan prefix |
| alamat | TEXT | Alamat kantor kelurahan |
| kecamatan | VARCHAR(100) | Nama kecamatan |
| kota | VARCHAR(100) | Nama kota/kabupaten |
| kode_pos | VARCHAR(10) | Kode pos |
| telepon | VARCHAR(20) | Nomor telepon |
| email | VARCHAR(100) | Email kelurahan |
| nama_lurah | VARCHAR(150) | Nama lurah/kepala kelurahan |
| nip_lurah | VARCHAR(20) | NIP lurah |
| created_at | TIMESTAMP | Waktu dibuat |
| updated_at | TIMESTAMP | Waktu diupdate |

#### 2. **users**
Menyimpan data pengguna sistem

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| email | VARCHAR(150) | Email (unique) |
| password_hash | TEXT | Password ter-hash |
| name | VARCHAR(150) | Nama lengkap |
| role | VARCHAR(20) | Role: admin/staff/user |
| kelurahan_id | INTEGER | FK ke table kelurahan |
| is_active | BOOLEAN | Status aktif |
| created_at | TIMESTAMP | Waktu dibuat |
| updated_at | TIMESTAMP | Waktu diupdate |

#### 3. **documents**
Menyimpan data surat masuk dan keluar

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| nomor_surat | VARCHAR(50) | Nomor surat (unique) |
| jenis_surat | VARCHAR(20) | masuk/keluar |
| perihal | TEXT | Perihal surat |
| pengirim | VARCHAR(150) | Pengirim (untuk surat masuk) |
| penerima | VARCHAR(150) | Penerima (untuk surat keluar) |
| tanggal_surat | DATE | Tanggal surat |
| tanggal_diterima | DATE | Tanggal diterima |
| status | VARCHAR(20) | pending/diproses/selesai/ditolak |
| file_path | TEXT | Path file surat |
| keterangan | TEXT | Keterangan tambahan |
| created_by | INTEGER | FK ke users |
| kelurahan_id | INTEGER | FK ke kelurahan |
| created_at | TIMESTAMP | Waktu dibuat |
| updated_at | TIMESTAMP | Waktu diupdate |

## 👥 Default Users

| Email | Password | Role | Kelurahan |
|-------|----------|------|-----------|
| admin@cibodas.go.id | password123 | admin | - |
| staffkelcibodas@cibodas.go.id | password123 | staff | Cibodas |
| staffkelcbb@cibodas.go.id | password123 | staff | Cibodas Baru |
| staffpanbar@cibodas.go.id | password123 | staff | Panunggangan Barat |
| staffcibodasari@cibodas.go.id | password123 | staff | Cibodasari |
| staffuwungjaya@cibodas.go.id | password123 | staff | Uwung Jaya |
| staffjatiuwung@cibodas.go.id | password123 | staff | Jatiuwung |
| user@example.com | password123 | user | - |

**⚠️ PENTING:** Ganti password default di production!

## 🔧 Maintenance

### Backup Database

```bash
pg_dump -U postgres pelayanan_kelurahan > backup_$(date +%Y%m%d).sql
```

### Restore Database

```bash
psql -U postgres -d pelayanan_kelurahan < backup_20241008.sql
```

### Reset Database

```bash
# Drop dan recreate database
psql -U postgres -c "DROP DATABASE IF EXISTS pelayanan_kelurahan;"
psql -U postgres -c "CREATE DATABASE pelayanan_kelurahan;"

# Jalankan ulang schema dan seed
psql -U postgres -d pelayanan_kelurahan -f database/schema.sql
psql -U postgres -d pelayanan_kelurahan -f database/seed.sql
```

## 🧪 Testing Connection

Setelah setup, test koneksi database:

```bash
# Jalankan development server
npm run dev
```

Cek console, seharusnya muncul:
```
✅ Database connected successfully
```

## 📝 Query Examples

### Get all kelurahan
```sql
SELECT * FROM kelurahan ORDER BY nama;
```

### Get users with kelurahan
```sql
SELECT u.*, k.nama as kelurahan_nama 
FROM users u 
LEFT JOIN kelurahan k ON u.kelurahan_id = k.id;
```

### Get documents by kelurahan
```sql
SELECT d.*, k.nama as kelurahan_nama 
FROM documents d 
JOIN kelurahan k ON d.kelurahan_id = k.id 
WHERE k.nama = 'CIBODAS';
```

## 🐛 Troubleshooting

### Error: "password authentication failed"
- Pastikan password PostgreSQL benar di `.env.local`
- Cek `pg_hba.conf` untuk authentication method

### Error: "database does not exist"
- Pastikan database `pelayanan_kelurahan` sudah dibuat
- Jalankan: `CREATE DATABASE pelayanan_kelurahan;`

### Error: "relation does not exist"
- Schema belum dijalankan
- Jalankan file `schema.sql`

### Connection timeout
- Pastikan PostgreSQL service running
- Check port 5432 tidak diblok firewall

## 📚 Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [node-postgres (pg) Documentation](https://node-postgres.com/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)

## 🔐 Security Notes

1. **Jangan commit `.env.local`** ke git
2. **Ganti password default** di production
3. **Gunakan SSL** untuk koneksi database di production
4. **Limit database user permissions** sesuai kebutuhan
5. **Regular backup** database

## 📞 Support

Jika ada masalah dengan setup database, hubungi tim development.
