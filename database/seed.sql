-- Seed Data untuk Database Pelayanan Kelurahan Cibodas

-- Insert Data Kelurahan
INSERT INTO kelurahan (nama, nama_lengkap, alamat, kecamatan, kota, kode_pos, telepon, email, nama_lurah, nip_lurah) VALUES
('CIBODAS', 'Kelurahan Cibodas', 'Jl. Raya Cibodas No. 45, Cibodas', 'Cibodas', 'Kota Tangerang', '15138', '(021) 5523456', 'kelcibodas@tangerangkota.go.id', 'Drs. H. Ahmad Suryadi, M.Si', '196501011990031001'),
('CIBODAS BARU', 'Kelurahan Cibodas Baru', 'Jl. Merdeka No. 123, Cibodas Baru', 'Cibodas', 'Kota Tangerang', '15139', '(021) 5523457', 'kelcibodasbaru@tangerangkota.go.id', 'H. Bambang Hermanto, S.Sos', '196702121991031002'),
('PANUNGGANGAN BARAT', 'Kelurahan Panunggangan Barat', 'Jl. Panunggangan Raya No. 88, Panunggangan Barat', 'Cibodas', 'Kota Tangerang', '15143', '(021) 5523458', 'kelpanbar@tangerangkota.go.id', 'Dra. Hj. Siti Maryam, M.M', '196803151992032001'),
('CIBODASARI', 'Kelurahan Cibodasari', 'Jl. Cibodasari Utara No. 56, Cibodasari', 'Cibodas', 'Kota Tangerang', '15144', '(021) 5523459', 'kelcibodasari@tangerangkota.go.id', 'H. Yusuf Hidayat, S.IP', '196904201993031003'),
('UWUNG JAYA', 'Kelurahan Uwung Jaya', 'Jl. Uwung Jaya No. 77, Uwung Jaya', 'Cibodas', 'Kota Tangerang', '15145', '(021) 5523460', 'keluwungjaya@tangerangkota.go.id', 'Drs. H. Rahmat Hidayat', '197005101994031001'),
('JATIUWUNG', 'Kelurahan Jatiuwung', 'Jl. Jatiuwung Raya No. 99, Jatiuwung', 'Cibodas', 'Kota Tangerang', '15146', '(021) 5523461', 'keljatiuwung@tangerangkota.go.id', 'Hj. Nurhayati, S.Sos, M.Si', '197106151995032001');

-- Insert Data Users
-- Password: password123 (hashed dengan bcrypt)
-- Hash generated dengan: node scripts/hash-password.js password123

INSERT INTO users (email, password_hash, name, role, kelurahan_id) VALUES
-- Admin (tidak terikat kelurahan tertentu)
('admin@cibodas.go.id', '$2b$10$NaNREkl.H2OSnz/J5vhLBuJSyEnD3klEaqFCdmz.gJvdrUO2fyncG', 'Admin Kecamatan', 'admin', NULL),

-- Staff Kelurahan
('staffkelcibodas@cibodas.go.id', '$2b$10$NaNREkl.H2OSnz/J5vhLBuJSyEnD3klEaqFCdmz.gJvdrUO2fyncG', 'Staff Kelurahan Cibodas', 'staff', 1),
('staffkelcbb@cibodas.go.id', '$2b$10$NaNREkl.H2OSnz/J5vhLBuJSyEnD3klEaqFCdmz.gJvdrUO2fyncG', 'Staff Kelurahan Cibodas Baru', 'staff', 2),
('staffpanbar@cibodas.go.id', '$2b$10$NaNREkl.H2OSnz/J5vhLBuJSyEnD3klEaqFCdmz.gJvdrUO2fyncG', 'Staff Kelurahan Panunggangan Barat', 'staff', 3),
('staffcibodasari@cibodas.go.id', '$2b$10$NaNREkl.H2OSnz/J5vhLBuJSyEnD3klEaqFCdmz.gJvdrUO2fyncG', 'Staff Kelurahan Cibodasari', 'staff', 4),
('staffuwungjaya@cibodas.go.id', '$2b$10$NaNREkl.H2OSnz/J5vhLBuJSyEnD3klEaqFCdmz.gJvdrUO2fyncG', 'Staff Kelurahan Uwung Jaya', 'staff', 5),
('staffjatiuwung@cibodas.go.id', '$2b$10$NaNREkl.H2OSnz/J5vhLBuJSyEnD3klEaqFCdmz.gJvdrUO2fyncG', 'Staff Kelurahan Jatiuwung', 'staff', 6),

-- User biasa
('user@example.com', '$2b$10$NaNREkl.H2OSnz/J5vhLBuJSyEnD3klEaqFCdmz.gJvdrUO2fyncG', 'User Biasa', 'user', NULL);

-- Insert Sample Documents
INSERT INTO documents (nomor_surat, jenis_surat, perihal, pengirim, tanggal_surat, tanggal_diterima, status, created_by, kelurahan_id) VALUES
('SM/001/2024', 'masuk', 'Undangan Rapat Koordinasi', 'Dinas Kependudukan', '2024-10-01', '2024-10-05', 'pending', 1, 1),
('SM/002/2024', 'masuk', 'Permohonan Data Penduduk', 'BPS Kota', '2024-10-02', '2024-10-03', 'diproses', 1, 1),
('SM/003/2024', 'masuk', 'Surat Edaran Protokol Kesehatan', 'Dinas Kesehatan', '2024-09-28', '2024-09-30', 'selesai', 2, 1);

INSERT INTO documents (nomor_surat, jenis_surat, perihal, penerima, tanggal_surat, status, created_by, kelurahan_id) VALUES
('SK/045/2024', 'keluar', 'Surat Keterangan Domisili', 'Ahmad Fauzi', '2024-10-04', 'selesai', 2, 1),
('SK/046/2024', 'keluar', 'Surat Pengantar KTP', 'Siti Nurhaliza', '2024-10-05', 'diproses', 1, 1),
('SK/047/2024', 'keluar', 'Surat Keterangan Usaha', 'Budi Santoso', '2024-10-06', 'pending', 1, 1);

-- Verify data
SELECT 'Kelurahan' as table_name, COUNT(*) as total FROM kelurahan
UNION ALL
SELECT 'Users', COUNT(*) FROM users
UNION ALL
SELECT 'Documents', COUNT(*) FROM documents;
