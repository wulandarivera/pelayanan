'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Plus, Search, Download, Eye, Edit, Trash2 } from 'lucide-react';

const documents = [
  {
    id: 1,
    nomor_surat: 'SM/001/2024',
    perihal: 'Undangan Rapat Koordinasi',
    pengirim: 'Dinas Kependudukan',
    tanggal_surat: '2024-10-01',
    tanggal_diterima: '2024-10-05',
    status: 'pending',
  },
  {
    id: 2,
    nomor_surat: 'SM/002/2024',
    perihal: 'Permohonan Data Penduduk',
    pengirim: 'BPS Kota',
    tanggal_surat: '2024-10-02',
    tanggal_diterima: '2024-10-03',
    status: 'diproses',
  },
  {
    id: 3,
    nomor_surat: 'SM/003/2024',
    perihal: 'Surat Edaran Protokol Kesehatan',
    pengirim: 'Dinas Kesehatan',
    tanggal_surat: '2024-09-28',
    tanggal_diterima: '2024-09-30',
    status: 'selesai',
  },
];

export default function SuratMasukPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.nomor_surat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.perihal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.pengirim.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Surat Masuk</h1>
            <p className="mt-2 text-gray-600">
              Kelola surat masuk Kelurahan Cibodas
            </p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Surat Masuk
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Cari nomor surat, perihal, atau pengirim..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'Semua Status' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'diproses', label: 'Diproses' },
                  { value: 'selesai', label: 'Selesai' },
                ]}
              />
            </div>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Surat Masuk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nomor Surat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Perihal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pengirim
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal Surat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {doc.nomor_surat}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {doc.perihal}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.pengirim}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(doc.tanggal_surat).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            doc.status === 'selesai'
                              ? 'bg-green-100 text-green-800'
                              : doc.status === 'diproses'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {doc.status === 'selesai'
                            ? 'Selesai'
                            : doc.status === 'diproses'
                            ? 'Diproses'
                            : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            title="Lihat"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="text-green-600 hover:text-green-900"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Tidak ada data yang ditemukan</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
