'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { 
  FileText, 
  User, 
  MapPin, 
  Home,
  Eye,
  AlertCircle,
  Loader2,
  Briefcase
} from 'lucide-react';
import { mockAuth } from '@/lib/mockData';

interface FormData {
  // Nomor Surat
  nomor_surat: string;
  
  // Data Pemohon
  nik_pemohon: string;
  nama_pemohon: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  kelamin_pemohon: string;
  agama: string;
  pekerjaan: string;
  perkawinan: string;
  negara: string;
  
  // Alamat
  alamat: string;
  rt: string;
  rw: string;
  kelurahan: string;
  kecamatan: string;
  kota_kabupaten: string;
  
  // Keperluan
  peruntukan: string;
  pengantar_rt: string;
  
  // Data Pejabat (auto-filled)
  pejabat_id?: number;
  nama_pejabat: string;
  nip_pejabat: string;
  jabatan: string;
  
  // Metadata
  alamat_kelurahan?: string;
}

export default function FormBelumRumahPage() {
  const router = useRouter();
  const currentUser = mockAuth.getCurrentUser();
  
  const [formData, setFormData] = useState<FormData>({
    nomor_surat: '',
    nik_pemohon: '',
    nama_pemohon: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    kelamin_pemohon: 'Laki-laki',
    agama: 'Islam',
    pekerjaan: '',
    perkawinan: 'Kawin',
    negara: 'Indonesia',
    alamat: '',
    rt: '',
    rw: '',
    kelurahan: 'Cibodas',
    kecamatan: 'Cibodas',
    kota_kabupaten: 'Kota Tangerang',
    peruntukan: '',
    pengantar_rt: '',
    nama_pejabat: '',
    nip_pejabat: '',
    jabatan: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPejabat, setIsLoadingPejabat] = useState(false);
  const [pejabatError, setPejabatError] = useState<string | null>(null);

  // Load pejabat data when kelurahan changes
  useEffect(() => {
    loadPejabatData();
  }, [formData.kelurahan]);

  const loadPejabatData = async () => {
    try {
      setIsLoadingPejabat(true);
      setPejabatError(null);

      const response = await fetch(`/api/pejabat/active?kelurahan=${encodeURIComponent(formData.kelurahan)}`);
      const data = await response.json();

      if (data.success && data.data) {
        setFormData(prev => ({
          ...prev,
          pejabat_id: data.data.id,
          nama_pejabat: data.data.nama,
          nip_pejabat: data.data.nip,
          jabatan: data.data.jabatan,
        }));
      } else {
        setPejabatError('Pejabat penandatangan belum dikonfigurasi untuk kelurahan ini');
      }
    } catch (error) {
      console.error('Error loading pejabat:', error);
      setPejabatError('Gagal memuat data pejabat');
    } finally {
      setIsLoadingPejabat(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi basic
    if (!formData.nama_pemohon || !formData.nik_pemohon) {
      alert('Mohon lengkapi data pemohon (Nama dan NIK)');
      return;
    }

    if (!formData.peruntukan) {
      alert('Mohon isi keperluan surat');
      return;
    }

    if (!formData.nama_pejabat || !formData.nip_pejabat) {
      alert('Data pejabat penandatangan belum tersedia. Hubungi admin.');
      return;
    }

    // Simpan ke sessionStorage
    sessionStorage.setItem('belum_rumah_preview_data', JSON.stringify(formData));
    
    // Redirect ke preview
    router.push('/preview-belum-rumah');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Surat Keterangan Belum Memiliki Rumah
          </h1>
          <p className="mt-2 text-gray-600">
            Isi formulir untuk membuat surat keterangan belum memiliki rumah
          </p>
        </div>

        {/* Pejabat Error Alert */}
        {pejabatError && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Perhatian</p>
                  <p className="text-sm text-red-700 mt-1">{pejabatError}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handlePreview} className="space-y-6">
          {/* Nomor Surat */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Nomor Surat</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                label="Nomor Surat"
                name="nomor_surat"
                value={formData.nomor_surat}
                onChange={handleChange}
                placeholder="Contoh: 470/001/SKBMR/X/2025"
                required
              />
            </CardContent>
          </Card>

          {/* Data Pemohon */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Data Pemohon</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="NIK"
                  name="nik_pemohon"
                  value={formData.nik_pemohon}
                  onChange={handleChange}
                  placeholder="16 digit NIK"
                  maxLength={16}
                  required
                />
                <Input
                  label="Nama Lengkap"
                  name="nama_pemohon"
                  value={formData.nama_pemohon}
                  onChange={handleChange}
                  placeholder="Nama sesuai KTP"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Tempat Lahir"
                  name="tempat_lahir"
                  value={formData.tempat_lahir}
                  onChange={handleChange}
                  placeholder="Kota/Kabupaten"
                  required
                />
                <Input
                  label="Tanggal Lahir"
                  name="tanggal_lahir"
                  type="date"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Kelamin
                  </label>
                  <select
                    name="kelamin_pemohon"
                    value={formData.kelamin_pemohon}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agama
                  </label>
                  <select
                    name="agama"
                    value={formData.agama}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Konghucu">Konghucu</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Pekerjaan"
                  name="pekerjaan"
                  value={formData.pekerjaan}
                  onChange={handleChange}
                  placeholder="Contoh: Karyawan Swasta"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status Perkawinan
                  </label>
                  <select
                    name="perkawinan"
                    value={formData.perkawinan}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="Belum Kawin">Belum Kawin</option>
                    <option value="Kawin">Kawin</option>
                    <option value="Cerai Hidup">Cerai Hidup</option>
                    <option value="Cerai Mati">Cerai Mati</option>
                  </select>
                </div>
              </div>

              <Input
                label="Kewarganegaraan"
                name="negara"
                value={formData.negara}
                onChange={handleChange}
                required
              />
            </CardContent>
          </Card>

          {/* Alamat */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Alamat</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Lengkap
                </label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Jalan, Nomor Rumah, dll"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="RT"
                  name="rt"
                  value={formData.rt}
                  onChange={handleChange}
                  placeholder="Contoh: 003"
                  maxLength={3}
                  required
                />
                <Input
                  label="RW"
                  name="rw"
                  value={formData.rw}
                  onChange={handleChange}
                  placeholder="Contoh: 005"
                  maxLength={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Kelurahan"
                  name="kelurahan"
                  value={formData.kelurahan}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Kecamatan"
                  name="kecamatan"
                  value={formData.kecamatan}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                label="Kota/Kabupaten"
                name="kota_kabupaten"
                value={formData.kota_kabupaten}
                onChange={handleChange}
                required
              />
            </CardContent>
          </Card>

          {/* Keperluan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Home className="w-5 h-5" />
                <span>Keperluan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surat ini digunakan untuk keperluan
                </label>
                <textarea
                  name="peruntukan"
                  value={formData.peruntukan}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Contoh: Pengajuan KPR, Subsidi Perumahan, dll"
                  required
                />
              </div>

              <Input
                label="Nomor Surat Pengantar RT (Opsional)"
                name="pengantar_rt"
                value={formData.pengantar_rt}
                onChange={handleChange}
                placeholder="Contoh: 001/RT.003/RW.005/X/2025"
              />
            </CardContent>
          </Card>

          {/* Pejabat Penandatangan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5" />
                <span>Pejabat Penandatangan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingPejabat ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
                  <span className="ml-2 text-gray-600">Memuat data pejabat...</span>
                </div>
              ) : (
                <>
                  <Input
                    label="Nama Pejabat"
                    name="nama_pejabat"
                    value={formData.nama_pejabat}
                    onChange={handleChange}
                    disabled
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="NIP"
                      name="nip_pejabat"
                      value={formData.nip_pejabat}
                      onChange={handleChange}
                      disabled
                      required
                    />
                    <Input
                      label="Jabatan"
                      name="jabatan"
                      value={formData.jabatan}
                      onChange={handleChange}
                      disabled
                      required
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handlePreview}
              disabled={isSubmitting || !!pejabatError || isLoadingPejabat}
              className="min-w-[200px]"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview Dokumen
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
