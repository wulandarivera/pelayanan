'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import { 
  BarChart3, 
  FileText, 
  TrendingUp,
  Calendar,
  Home,
  Briefcase,
  Users,
  Heart,
  Building,
  Car,
  GraduationCap
} from 'lucide-react';

// Mock data statistik surat keterangan
const statistikData = {
  total: 156,
  bulanIni: 23,
  hariIni: 24,
  // Data per jenis untuk Tahun Ini
  perJenisTahunIni: [
    { 
      jenis: 'Surat Keterangan Domisili', 
      jumlah: 45, 
      icon: Home,
      color: 'bg-blue-500',
      trend: '+12%'
    },
    { 
      jenis: 'Surat Keterangan Usaha', 
      jumlah: 32, 
      icon: Briefcase,
      color: 'bg-green-500',
      trend: '+8%'
    },
    { 
      jenis: 'Surat Keterangan Tidak Mampu (SKTM)', 
      jumlah: 28, 
      icon: Users,
      color: 'bg-yellow-500',
      trend: '+5%'
    },
    { 
      jenis: 'Surat Keterangan Belum Menikah', 
      jumlah: 18, 
      icon: Heart,
      color: 'bg-pink-500',
      trend: '+3%'
    },
    { 
      jenis: 'Surat Keterangan Penghasilan', 
      jumlah: 15, 
      icon: FileText,
      color: 'bg-purple-500',
      trend: '+2%'
    },
    { 
      jenis: 'Surat Keterangan Ahli Waris', 
      jumlah: 8, 
      icon: Users,
      color: 'bg-red-500',
      trend: '+1%'
    },
    { 
      jenis: 'Surat Keterangan Pindah', 
      jumlah: 5, 
      icon: Building,
      color: 'bg-indigo-500',
      trend: '0%'
    },
    { 
      jenis: 'Surat Keterangan Kehilangan', 
      jumlah: 3, 
      icon: FileText,
      color: 'bg-orange-500',
      trend: '0%'
    },
    { 
      jenis: 'Surat Keterangan Kepemilikan Kendaraan', 
      jumlah: 1, 
      icon: Car,
      color: 'bg-cyan-500',
      trend: '0%'
    },
    { 
      jenis: 'Surat Keterangan Siswa/Mahasiswa', 
      jumlah: 1, 
      icon: GraduationCap,
      color: 'bg-teal-500',
      trend: '0%'
    }
  ],
  // Data per jenis untuk Bulan Ini
  perJenisBulanIni: [
    { 
      jenis: 'Surat Keterangan Domisili', 
      jumlah: 8, 
      icon: Home,
      color: 'bg-blue-500',
      trend: '+15%'
    },
    { 
      jenis: 'Surat Keterangan Usaha', 
      jumlah: 5, 
      icon: Briefcase,
      color: 'bg-green-500',
      trend: '+10%'
    },
    { 
      jenis: 'Surat Keterangan Tidak Mampu (SKTM)', 
      jumlah: 4, 
      icon: Users,
      color: 'bg-yellow-500',
      trend: '+5%'
    },
    { 
      jenis: 'Surat Keterangan Belum Menikah', 
      jumlah: 3, 
      icon: Heart,
      color: 'bg-pink-500',
      trend: '+3%'
    },
    { 
      jenis: 'Surat Keterangan Penghasilan', 
      jumlah: 2, 
      icon: FileText,
      color: 'bg-purple-500',
      trend: '0%'
    },
    { 
      jenis: 'Surat Keterangan Ahli Waris', 
      jumlah: 1, 
      icon: Users,
      color: 'bg-red-500',
      trend: '0%'
    }
  ],
  // Data per jenis untuk Hari Ini
  perJenisHariIni: [
    { 
      jenis: 'Surat Keterangan Domisili', 
      jumlah: 10, 
      icon: Home,
      color: 'bg-blue-500',
      trend: '+20%'
    },
    { 
      jenis: 'Surat Keterangan Usaha', 
      jumlah: 6, 
      icon: Briefcase,
      color: 'bg-green-500',
      trend: '+15%'
    },
    { 
      jenis: 'Surat Keterangan Tidak Mampu (SKTM)', 
      jumlah: 4, 
      icon: Users,
      color: 'bg-yellow-500',
      trend: '+10%'
    },
    { 
      jenis: 'Surat Keterangan Belum Menikah', 
      jumlah: 2, 
      icon: Heart,
      color: 'bg-pink-500',
      trend: '+5%'
    },
    { 
      jenis: 'Surat Keterangan Penghasilan', 
      jumlah: 2, 
      icon: FileText,
      color: 'bg-purple-500',
      trend: '0%'
    }
  ],
  perBulan: [
    { bulan: 'Januari', jumlah: 12 },
    { bulan: 'Februari', jumlah: 15 },
    { bulan: 'Maret', jumlah: 18 },
    { bulan: 'April', jumlah: 14 },
    { bulan: 'Mei', jumlah: 16 },
    { bulan: 'Juni', jumlah: 13 },
    { bulan: 'Juli', jumlah: 17 },
    { bulan: 'Agustus', jumlah: 19 },
    { bulan: 'September', jumlah: 16 },
    { bulan: 'Oktober', jumlah: 23 }
  ]
};

export default function StatistikPage() {
  const [viewMode, setViewMode] = useState<'hari-ini' | 'bulan-ini' | 'tahun-ini'>('bulan-ini');

  // Data untuk Hari Ini (per jam)
  const dataHariIni = [
    { label: '08:00', jumlah: 2 },
    { label: '09:00', jumlah: 3 },
    { label: '10:00', jumlah: 5 },
    { label: '11:00', jumlah: 4 },
    { label: '12:00', jumlah: 1 },
    { label: '13:00', jumlah: 3 },
    { label: '14:00', jumlah: 4 },
    { label: '15:00', jumlah: 2 }
  ];

  // Data untuk Bulan Ini (per hari dalam bulan Oktober)
  const dataBulanIni = [
    { label: '1 Okt', jumlah: 3 },
    { label: '2 Okt', jumlah: 2 },
    { label: '3 Okt', jumlah: 4 },
    { label: '4 Okt', jumlah: 3 },
    { label: '5 Okt', jumlah: 5 },
    { label: '6 Okt', jumlah: 2 },
    { label: '7 Okt', jumlah: 4 }
  ];

  // Data untuk Tahun Ini (per bulan dalam tahun 2024)
  const dataTahunIni = statistikData.perBulan;

  // Pilih data berdasarkan view mode
  const getTrendData = () => {
    switch (viewMode) {
      case 'hari-ini':
        return dataHariIni;
      case 'bulan-ini':
        return dataBulanIni;
      case 'tahun-ini':
        return dataTahunIni;
      default:
        return dataBulanIni;
    }
  };

  const trendData = getTrendData();

  // Hitung total untuk view mode aktif
  const getTotalForMode = () => {
    return trendData.reduce((sum, item) => sum + item.jumlah, 0);
  };

  // Pilih data per jenis berdasarkan view mode
  const getPerJenisData = () => {
    switch (viewMode) {
      case 'hari-ini':
        return statistikData.perJenisHariIni;
      case 'bulan-ini':
        return statistikData.perJenisBulanIni;
      case 'tahun-ini':
        return statistikData.perJenisTahunIni;
      default:
        return statistikData.perJenisBulanIni;
    }
  };

  const perJenisData = getPerJenisData();

  // Hitung persentase untuk setiap jenis
  const perJenisWithPercentage = perJenisData.map(item => ({
    ...item,
    persentase: ((item.jumlah / getTotalForMode()) * 100).toFixed(1)
  }));

  // Hitung max untuk bar chart
  const maxJumlah = Math.max(...perJenisWithPercentage.map(item => item.jumlah));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Statistik Pelayanan Administrasi</h1>
            <p className="mt-2 text-gray-600">
              Statistik dan laporan pelayanan administrasi berdasarkan jenis
            </p>
          </div>
          <Select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as 'hari-ini' | 'bulan-ini' | 'tahun-ini')}
            options={[
              { value: 'hari-ini', label: '📅 Hari Ini' },
              { value: 'bulan-ini', label: '📊 Bulan Ini' },
              { value: 'tahun-ini', label: '📈 Tahun Ini' }
            ]}
            className="w-full sm:w-48"
          />
        </div>

        {/* Summary Cards - Dynamic based on view mode */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    {viewMode === 'hari-ini' && 'Hari Ini'}
                    {viewMode === 'bulan-ini' && 'Bulan Ini'}
                    {viewMode === 'tahun-ini' && 'Tahun Ini'}
                  </p>
                  <p className="text-4xl font-bold text-blue-900 mt-2">{getTotalForMode()}</p>
                  <p className="text-xs text-blue-600 mt-1">
                    {viewMode === 'hari-ini' && '7 Oktober 2024'}
                    {viewMode === 'bulan-ini' && 'Oktober 2024'}
                    {viewMode === 'tahun-ini' && 'Tahun 2024'}
                  </p>
                </div>
                <FileText className="w-12 h-12 text-blue-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Total Tahun Ini</p>
                  <p className="text-4xl font-bold text-green-900 mt-2">{statistikData.total}</p>
                  <p className="text-xs text-green-600 mt-1">Januari - Oktober</p>
                </div>
                <Calendar className="w-12 h-12 text-green-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Rata-rata</p>
                  <p className="text-4xl font-bold text-purple-900 mt-2">
                    {Math.round(getTotalForMode() / trendData.length)}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    {viewMode === 'hari-ini' && 'Per Jam'}
                    {viewMode === 'bulan-ini' && 'Per Hari'}
                    {viewMode === 'tahun-ini' && 'Per Bulan'}
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-purple-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistik per Jenis Surat */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary-600" />
              Statistik Berdasarkan Jenis Surat
              <span className="text-sm font-normal text-gray-500">
                ({viewMode === 'hari-ini' && 'Hari Ini'}
                {viewMode === 'bulan-ini' && 'Bulan Ini'}
                {viewMode === 'tahun-ini' && 'Tahun Ini'})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {perJenisWithPercentage.map((item, index) => {
                const Icon = item.icon;
                const barWidth = (item.jumlah / maxJumlah) * 100;

                return (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`${item.color} p-2 rounded-lg`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">{item.jenis}</p>
                          <p className="text-xs text-gray-500">{item.persentase}% dari total</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{item.jumlah}</p>
                        <p className="text-xs text-green-600 font-medium">{item.trend}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`${item.color} h-full rounded-full transition-all duration-500 group-hover:opacity-80`}
                        style={{ width: `${barWidth}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tren Berdasarkan View Mode */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              {viewMode === 'hari-ini' && 'Tren Hari Ini (Per Jam)'}
              {viewMode === 'bulan-ini' && 'Tren Bulan Ini (Per Hari)'}
              {viewMode === 'tahun-ini' && 'Tren Tahun Ini (Per Bulan)'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trendData.map((item, index) => {
                const maxValue = Math.max(...trendData.map(d => d.jumlah));
                const barWidth = (item.jumlah / maxValue) * 100;

                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium text-gray-700">
                      {'label' in item ? item.label : item.bulan}
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                          style={{ width: `${barWidth}%` }}
                        >
                          {barWidth > 20 && (
                            <span className="text-white text-xs font-bold">{item.jumlah}</span>
                          )}
                        </div>
                      </div>
                      {barWidth <= 20 && (
                        <span className="text-sm font-bold text-gray-700 w-8">{item.jumlah}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Summary Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {trendData.reduce((sum, item) => sum + item.jumlah, 0)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Rata-rata</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(trendData.reduce((sum, item) => sum + item.jumlah, 0) / trendData.length)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Tertinggi</p>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.max(...trendData.map(d => d.jumlah))}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Terendah</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {Math.min(...trendData.map(d => d.jumlah))}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Surat Terpopuler */}
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <TrendingUp className="w-5 h-5" />
              Top 3 Surat Terpopuler
              <span className="text-sm font-normal text-amber-700">
                ({viewMode === 'hari-ini' && 'Hari Ini'}
                {viewMode === 'bulan-ini' && 'Bulan Ini'}
                {viewMode === 'tahun-ini' && 'Tahun Ini'})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {perJenisWithPercentage.slice(0, 3).map((item, index) => {
                const Icon = item.icon;
                const medals = ['🥇', '🥈', '🥉'];

                return (
                  <Card key={index} className="bg-white border-2 border-amber-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-4xl mb-2">{medals[index]}</div>
                        <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 text-sm mb-2">{item.jenis}</h3>
                        <p className="text-3xl font-bold text-primary-600">{item.jumlah}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.persentase}% dari total</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
