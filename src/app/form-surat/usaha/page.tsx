'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Briefcase, ArrowLeft, FileText } from 'lucide-react';

export default function FormUsahaPage() {
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
    statusPerkawinan: '',
    
    // Data Usaha
    namaUsaha: '',
    jenisUsaha: '',
    bidangUsaha: '',
    modalUsaha: '',
    jumlahKaryawan: '',
    tahunBerdiri: '',
    
    // Alamat Usaha
    alamatUsaha: '',
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
      alert('Permohonan Surat Keterangan Usaha berhasil diajukan!');
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
                <div className="bg-green-500 p-3 rounded-xl">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Form Surat Keterangan Usaha</h1>
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
                Data Pemilik Usaha
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
                    Status Perkawinan <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="statusPerkawinan"
                    value={formData.statusPerkawinan}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih status perkawinan</option>
                    <option value="Belum Kawin">Belum Kawin</option>
                    <option value="Kawin">Kawin</option>
                    <option value="Cerai Hidup">Cerai Hidup</option>
                    <option value="Cerai Mati">Cerai Mati</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Usaha */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-primary-600" />
                Data Usaha
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Usaha <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="namaUsaha"
                    value={formData.namaUsaha}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama usaha"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Usaha <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jenisUsaha"
                    value={formData.jenisUsaha}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih jenis usaha</option>
                    <option value="Perseorangan">Perseorangan</option>
                    <option value="CV">CV</option>
                    <option value="PT">PT</option>
                    <option value="Koperasi">Koperasi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bidang Usaha <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="bidangUsaha"
                    value={formData.bidangUsaha}
                    onChange={handleInputChange}
                    placeholder="Contoh: Perdagangan, Jasa, Kuliner, dll"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modal Usaha <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="modalUsaha"
                    value={formData.modalUsaha}
                    onChange={handleInputChange}
                    placeholder="Contoh: Rp 10.000.000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah Karyawan
                  </label>
                  <Input
                    type="number"
                    name="jumlahKaryawan"
                    value={formData.jumlahKaryawan}
                    onChange={handleInputChange}
                    placeholder="Masukkan jumlah karyawan"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tahun Berdiri <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    name="tahunBerdiri"
                    value={formData.tahunBerdiri}
                    onChange={handleInputChange}
                    placeholder="Contoh: 2020"
                    min="1900"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alamat Usaha */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Alamat Usaha</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap Usaha <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="alamatUsaha"
                    value={formData.alamatUsaha}
                    onChange={handleInputChange}
                    placeholder="Masukkan alamat lengkap usaha"
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
                    placeholder="Contoh: Pengajuan Kredit, Perizinan, dll"
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
