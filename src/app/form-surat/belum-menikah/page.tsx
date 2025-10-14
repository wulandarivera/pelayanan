'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Heart, ArrowLeft, FileText } from 'lucide-react';

export default function FormBelumMenikahPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Data Pemohon
    nik: '',
    namaLengkap: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    agama: '',
    pekerjaan: '',
    kewarganegaraan: 'Indonesia',
    
    // Data Orang Tua
    namaAyah: '',
    namaIbu: '',
    pekerjaanAyah: '',
    pekerjaanIbu: '',
    
    // Alamat
    alamatLengkap: '',
    rt: '',
    rw: '',
    kelurahan: 'Cibodas',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    
    // Keperluan
    keperluan: '',
    keteranganTambahan: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert('Permohonan Surat Keterangan Belum Menikah berhasil diajukan!');
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
                <div className="bg-pink-500 p-3 rounded-xl">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Form Surat Keterangan Belum Menikah</h1>
                  <p className="text-sm text-gray-600">Lengkapi formulir di bawah ini dengan data yang benar</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Data Pemohon */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary-600" />
                Data Pemohon
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIK <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="nik"
                    value={formData.nik}
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
                    name="namaLengkap"
                    value={formData.namaLengkap}
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
                    name="tempatLahir"
                    value={formData.tempatLahir}
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
                    name="tanggalLahir"
                    value={formData.tanggalLahir}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Kelamin <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jenisKelamin"
                    value={formData.jenisKelamin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih jenis kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agama <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="agama"
                    value={formData.agama}
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
                    name="pekerjaan"
                    value={formData.pekerjaan}
                    onChange={handleInputChange}
                    placeholder="Masukkan pekerjaan"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kewarganegaraan <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="kewarganegaraan"
                    value={formData.kewarganegaraan}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Orang Tua */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Data Orang Tua</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Ayah <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="namaAyah"
                    value={formData.namaAyah}
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
                    name="namaIbu"
                    value={formData.namaIbu}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama ibu"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pekerjaan Ayah <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="pekerjaanAyah"
                    value={formData.pekerjaanAyah}
                    onChange={handleInputChange}
                    placeholder="Masukkan pekerjaan ayah"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pekerjaan Ibu <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="pekerjaanIbu"
                    value={formData.pekerjaanIbu}
                    onChange={handleInputChange}
                    placeholder="Masukkan pekerjaan ibu"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alamat */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Alamat Tempat Tinggal</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="alamatLengkap"
                    value={formData.alamatLengkap}
                    onChange={handleInputChange}
                    placeholder="Masukkan alamat lengkap"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                    required
                  />
                </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
            </CardContent>
          </Card>

          {/* Keperluan */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Keperluan</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keperluan <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="keperluan"
                    value={formData.keperluan}
                    onChange={handleInputChange}
                    placeholder="Contoh: Melamar pekerjaan, Persyaratan menikah, dll"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keterangan Tambahan
                  </label>
                  <textarea
                    name="keteranganTambahan"
                    value={formData.keteranganTambahan}
                    onChange={handleInputChange}
                    placeholder="Keterangan tambahan (opsional)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
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
