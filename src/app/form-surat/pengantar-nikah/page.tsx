'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Heart, ArrowLeft, FileText, Users } from 'lucide-react';

export default function FormPengantarNikahPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Data Calon Pengantin Pria
    nikPria: '',
    namaPria: '',
    tempatLahirPria: '',
    tanggalLahirPria: '',
    agamaPria: '',
    pekerjaanPria: '',
    statusPria: '',
    alamatPria: '',
    
    // Data Orang Tua Pria
    namaAyahPria: '',
    namaIbuPria: '',
    
    // Data Calon Pengantin Wanita
    nikWanita: '',
    namaWanita: '',
    tempatLahirWanita: '',
    tanggalLahirWanita: '',
    agamaWanita: '',
    pekerjaanWanita: '',
    statusWanita: '',
    alamatWanita: '',
    
    // Data Orang Tua Wanita
    namaAyahWanita: '',
    namaIbuWanita: '',
    
    // Data Pernikahan
    rencanaAkad: '',
    tempatAkad: '',
    
    // Alamat Pemohon
    rt: '',
    rw: '',
    kelurahan: 'Cibodas',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    
    // Keterangan
    keterangan: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert('Permohonan Surat Pengantar Nikah (N1) berhasil diajukan!');
      router.push('/surat-keterangan');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <div>
              <div className="flex items-center space-x-3">
                <div className="bg-red-500 p-3 rounded-xl">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Form Surat Pengantar Nikah (N1)</h1>
                  <p className="text-sm text-gray-600">Lengkapi formulir di bawah ini dengan data yang benar</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Data Calon Pengantin Pria */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary-600" />
                Data Calon Pengantin Pria
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIK <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="nikPria"
                    value={formData.nikPria}
                    onChange={handleInputChange}
                    placeholder="Masukkan NIK (16 digit)"
                    maxLength={16}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="namaPria"
                    value={formData.namaPria}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tempat Lahir <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="tempatLahirPria"
                    value={formData.tempatLahirPria}
                    onChange={handleInputChange}
                    placeholder="Masukkan tempat lahir"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Lahir <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    name="tanggalLahirPria"
                    value={formData.tanggalLahirPria}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agama <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="agamaPria"
                    value={formData.agamaPria}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih agama</option>
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Konghucu">Konghucu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pekerjaan <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="pekerjaanPria"
                    value={formData.pekerjaanPria}
                    onChange={handleInputChange}
                    placeholder="Masukkan pekerjaan"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="statusPria"
                    value={formData.statusPria}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih status</option>
                    <option value="Jejaka">Jejaka</option>
                    <option value="Duda Cerai Hidup">Duda Cerai Hidup</option>
                    <option value="Duda Cerai Mati">Duda Cerai Mati</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="alamatPria"
                    value={formData.alamatPria}
                    onChange={handleInputChange}
                    placeholder="Masukkan alamat lengkap"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={2}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Ayah <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="namaAyahPria"
                    value={formData.namaAyahPria}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama ayah"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Ibu <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="namaIbuPria"
                    value={formData.namaIbuPria}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama ibu"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Calon Pengantin Wanita */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary-600" />
                Data Calon Pengantin Wanita
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIK <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="nikWanita"
                    value={formData.nikWanita}
                    onChange={handleInputChange}
                    placeholder="Masukkan NIK (16 digit)"
                    maxLength={16}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="namaWanita"
                    value={formData.namaWanita}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tempat Lahir <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="tempatLahirWanita"
                    value={formData.tempatLahirWanita}
                    onChange={handleInputChange}
                    placeholder="Masukkan tempat lahir"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Lahir <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    name="tanggalLahirWanita"
                    value={formData.tanggalLahirWanita}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agama <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="agamaWanita"
                    value={formData.agamaWanita}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih agama</option>
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Konghucu">Konghucu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pekerjaan <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="pekerjaanWanita"
                    value={formData.pekerjaanWanita}
                    onChange={handleInputChange}
                    placeholder="Masukkan pekerjaan"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="statusWanita"
                    value={formData.statusWanita}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih status</option>
                    <option value="Perawan">Perawan</option>
                    <option value="Janda Cerai Hidup">Janda Cerai Hidup</option>
                    <option value="Janda Cerai Mati">Janda Cerai Mati</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="alamatWanita"
                    value={formData.alamatWanita}
                    onChange={handleInputChange}
                    placeholder="Masukkan alamat lengkap"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={2}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Ayah <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="namaAyahWanita"
                    value={formData.namaAyahWanita}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama ayah"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Ibu <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="namaIbuWanita"
                    value={formData.namaIbuWanita}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama ibu"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Pernikahan */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-primary-600" />
                Rencana Pernikahan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rencana Tanggal Akad <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    name="rencanaAkad"
                    value={formData.rencanaAkad}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tempat Akad <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="tempatAkad"
                    value={formData.tempatAkad}
                    onChange={handleInputChange}
                    placeholder="Masukkan tempat akad nikah"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alamat Pemohon */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary-600" />
                Alamat Pemohon (Kelurahan)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RT <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="rt"
                    value={formData.rt}
                    onChange={handleInputChange}
                    placeholder="001"
                    maxLength={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RW <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="rw"
                    value={formData.rw}
                    onChange={handleInputChange}
                    placeholder="001"
                    maxLength={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kelurahan <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="kelurahan"
                    value={formData.kelurahan}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kecamatan <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="kecamatan"
                    value={formData.kecamatan}
                    onChange={handleInputChange}
                    placeholder="Masukkan kecamatan"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kabupaten/Kota <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="kabupaten"
                    value={formData.kabupaten}
                    onChange={handleInputChange}
                    placeholder="Masukkan kabupaten/kota"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provinsi <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="provinsi"
                    value={formData.provinsi}
                    onChange={handleInputChange}
                    placeholder="Masukkan provinsi"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Keterangan */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Keterangan Tambahan</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keterangan
                </label>
                <textarea
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={handleInputChange}
                  placeholder="Keterangan tambahan (opsional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[200px]"
            >
              {isSubmitting ? 'Mengirim...' : 'Ajukan Permohonan'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
