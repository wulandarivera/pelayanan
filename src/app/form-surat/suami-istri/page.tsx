'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Heart, ArrowLeft, FileText, Users } from 'lucide-react';

export default function FormSuamiIstriPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Data Suami
    nikSuami: '',
    namaSuami: '',
    tempatLahirSuami: '',
    tanggalLahirSuami: '',
    agamaSuami: '',
    pekerjaanSuami: '',
    
    // Data Istri
    nikIstri: '',
    namaIstri: '',
    tempatLahirIstri: '',
    tanggalLahirIstri: '',
    agamaIstri: '',
    pekerjaanIstri: '',
    
    // Data Pernikahan
    tanggalNikah: '',
    tempatNikah: '',
    nomorAktaNikah: '',
    
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
      alert('Permohonan Surat Keterangan Suami Istri berhasil diajukan!');
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
                  <h1 className="text-2xl font-bold text-gray-900">Form Surat Keterangan Suami Istri</h1>
                  <p className="text-sm text-gray-600">Lengkapi formulir di bawah ini dengan data yang benar</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Data Suami */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary-600" />
                Data Suami
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIK Suami <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="nikSuami"
                    value={formData.nikSuami}
                    onChange={handleInputChange}
                    placeholder="Masukkan NIK (16 digit)"
                    maxLength={16}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap Suami <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="namaSuami"
                    value={formData.namaSuami}
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
                    name="tempatLahirSuami"
                    value={formData.tempatLahirSuami}
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
                    name="tanggalLahirSuami"
                    value={formData.tanggalLahirSuami}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agama <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="agamaSuami"
                    value={formData.agamaSuami}
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
                    name="pekerjaanSuami"
                    value={formData.pekerjaanSuami}
                    onChange={handleInputChange}
                    placeholder="Masukkan pekerjaan"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Istri */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary-600" />
                Data Istri
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIK Istri <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="nikIstri"
                    value={formData.nikIstri}
                    onChange={handleInputChange}
                    placeholder="Masukkan NIK (16 digit)"
                    maxLength={16}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap Istri <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="namaIstri"
                    value={formData.namaIstri}
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
                    name="tempatLahirIstri"
                    value={formData.tempatLahirIstri}
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
                    name="tanggalLahirIstri"
                    value={formData.tanggalLahirIstri}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agama <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="agamaIstri"
                    value={formData.agamaIstri}
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
                    name="pekerjaanIstri"
                    value={formData.pekerjaanIstri}
                    onChange={handleInputChange}
                    placeholder="Masukkan pekerjaan"
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
                Data Pernikahan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Menikah <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    name="tanggalNikah"
                    value={formData.tanggalNikah}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tempat Menikah <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="tempatNikah"
                    value={formData.tempatNikah}
                    onChange={handleInputChange}
                    placeholder="Masukkan tempat menikah"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Akta Nikah
                  </label>
                  <Input
                    type="text"
                    name="nomorAktaNikah"
                    value={formData.nomorAktaNikah}
                    onChange={handleInputChange}
                    placeholder="Masukkan nomor akta nikah (jika ada)"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alamat */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary-600" />
                Alamat Tempat Tinggal
              </h2>
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
                    placeholder="Contoh: Administrasi, Pengajuan Kredit, dll"
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
