'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FileText, Send, Clock, CheckCircle, TrendingUp, RefreshCw } from 'lucide-react';
import { mockAuth } from '@/lib/mockData';
import Button from '@/components/ui/Button';

interface Stats {
  total_surat_masuk: number;
  total_surat_keluar: number;
  surat_pending: number;
  surat_selesai: number;
}

interface Document {
  id: number;
  nomor_surat: string;
  jenis_surat: string;
  perihal: string;
  pengirim?: string;
  penerima?: string;
  tanggal_surat: string;
  status: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    total_surat_masuk: 0,
    total_surat_keluar: 0,
    surat_pending: 0,
    surat_selesai: 0,
  });
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const currentUser = mockAuth.getCurrentUser();
  // Note: currentUser dari localStorage belum punya kelurahan_id, akan diupdate setelah login dari API
  const kelurahanId = (currentUser as any)?.kelurahan?.id;

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');

    try {
      // Fetch stats
      const statsUrl = kelurahanId 
        ? `/api/dashboard/stats?kelurahan_id=${kelurahanId}`
        : '/api/dashboard/stats';
      
      const statsRes = await fetch(statsUrl);
      const statsData = await statsRes.json();

      if (statsData.success) {
        setStats(statsData.stats);
      }

      // Fetch recent documents
      const docsUrl = kelurahanId
        ? `/api/dashboard/recent?kelurahan_id=${kelurahanId}&limit=5`
        : '/api/dashboard/recent?limit=5';
      
      const docsRes = await fetch(docsUrl);
      const docsData = await docsRes.json();

      if (docsData.success) {
        setRecentDocuments(docsData.documents);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Gagal memuat data dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [kelurahanId]);

  const statsCards = [
    {
      name: 'Total Surat Masuk',
      value: stats.total_surat_masuk.toString(),
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Surat Keluar',
      value: stats.total_surat_keluar.toString(),
      icon: Send,
      color: 'bg-green-500',
    },
    {
      name: 'Menunggu Proses',
      value: stats.surat_pending.toString(),
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      name: 'Selesai',
      value: stats.surat_selesai.toString(),
      icon: CheckCircle,
      color: 'bg-purple-500',
    },
  ];
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Selamat datang di Sistem Administrasi Surat Kelurahan Cibodas
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <div className="col-span-4 text-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
              <p className="mt-2 text-gray-500">Memuat data...</p>
            </div>
          ) : error ? (
            <div className="col-span-4 text-center py-8">
              <p className="text-red-500">{error}</p>
              <Button onClick={fetchDashboardData} className="mt-4" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Coba Lagi
              </Button>
            </div>
          ) : (
            statsCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.name}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">
                          {stat.name}
                        </p>
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Recent Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Dokumen Terbaru</CardTitle>
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
                      Pengirim/Penerima
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto text-gray-400" />
                        <p className="mt-2 text-gray-500 text-sm">Memuat dokumen...</p>
                      </td>
                    </tr>
                  ) : recentDocuments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        Belum ada dokumen
                      </td>
                    </tr>
                  ) : (
                    recentDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {doc.nomor_surat}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {doc.perihal}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.pengirim || doc.penerima || '-'}
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
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
