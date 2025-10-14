'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ArrowLeft, Download, Edit, Loader2, CheckCircle, Eye } from 'lucide-react';
import { mockAuth } from '@/lib/mockData';

export default function PreviewSKTMPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');
  const [formData, setFormData] = useState<any>(null);
  const currentUser = mockAuth.getCurrentUser();

  useEffect(() => {
    // Get form data from sessionStorage
    const storedData = sessionStorage.getItem('sktm_preview_data');
    if (storedData) {
      const data = JSON.parse(storedData);
      setFormData(data);
      loadPreview(data);
    } else {
      alert('Data tidak ditemukan. Silakan isi form terlebih dahulu.');
      router.push('/form-surat/sktm');
    }
  }, []);

  const loadPreview = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/preview-sktm-html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Gagal membuat preview');
      }

      const html = await response.text();
      setPreviewHtml(html);
    } catch (error) {
      console.error('Error loading preview:', error);
      alert('Terjadi kesalahan saat membuat preview. Silakan coba lagi.');
      router.push('/form-surat/sktm');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    // Kembali ke form dengan data yang sudah diisi
    router.push('/form-surat/sktm');
  };

  const handlePreviewPDF = async () => {
    if (!formData) {
      alert('Data tidak ditemukan');
      return;
    }

    try {
      setIsProcessing(true);

      // Call API to generate preview PDF with Puppeteer
      const response = await fetch('/api/preview-sktm-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal membuat preview PDF');
      }

      // Open PDF in new tab
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');

      // Cleanup
      setTimeout(() => window.URL.revokeObjectURL(url), 100);

    } catch (error) {
      console.error('Error previewing PDF:', error);
      alert(`Terjadi kesalahan: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcess = async () => {
    if (!formData) {
      alert('Data tidak ditemukan');
      return;
    }

    const confirmed = confirm(
      'Apakah Anda yakin data sudah benar?\n\n' +
      'Dokumen akan dikonversi ke PDF, disimpan ke Google Drive, dan dicatat dalam database.'
    );

    if (!confirmed) return;

    try {
      setIsProcessing(true);

      // Call API to process SKTM (convert to PDF with ConvertAPI, upload to Storage, save to DB)
      const response = await fetch('/api/process-sktm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: formData,
          userId: currentUser?.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal memproses dokumen');
      }

      // Download the PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SKTM_${formData.nama_pemohon.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Clear session storage
      sessionStorage.removeItem('sktm_preview_data');

      // Show success message
      alert(
        'Dokumen SKTM berhasil dibuat!\n\n' +
        '✓ PDF telah diunduh\n' +
        '✓ Disimpan ke Supabase Storage\n' +
        '✓ Tercatat dalam database\n\n' +
        'Anda dapat melihat dokumen di menu Daftar Surat.'
      );

      // Redirect to documents list
      router.push('/daftar-surat');
    } catch (error) {
      console.error('Error processing SKTM:', error);
      alert(`Terjadi kesalahan: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
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
              onClick={handleEdit}
              disabled={isProcessing}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Form
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Preview Dokumen SKTM</h1>
              <p className="text-sm text-gray-600">
                Periksa kembali data sebelum menyimpan dokumen
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Verifikasi Data</h3>
                  <p className="text-sm text-gray-600">
                    Pastikan semua data sudah benar sebelum melanjutkan
                  </p>
                </div>
              </div>
              <div>
                <Button
                  variant="outline"
                  onClick={handleEdit}
                  disabled={isProcessing}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Data
                </Button>
              </div>
            </div>

            {/* Print Options */}
            <div className="border-t pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Pilih Opsi Cetak:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: Cetak Preview */}
                <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="bg-blue-50 p-2 rounded">
                      <Eye className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900">Cetak Preview</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        Lihat hasil PDF sementara tanpa menyimpan ke database
                      </p>
                    </div>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1 mb-4">
                    <li>• Menggunakan Puppeteer (cepat)</li>
                    <li>• Tidak disimpan ke database</li>
                    <li>• Tetap di halaman preview</li>
                    <li>• Untuk verifikasi saja</li>
                  </ul>
                  <Button
                    variant="outline"
                    onClick={handlePreviewPDF}
                    disabled={isProcessing || isLoading}
                    className="w-full"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Cetak Preview
                  </Button>
                </div>

                {/* Option 2: Cetak & Selesai */}
                <div className="border-2 border-green-200 rounded-lg p-4 hover:border-green-400 transition-colors bg-green-50">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="bg-green-100 p-2 rounded">
                      <Download className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900">Cetak & Selesai</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        Generate PDF final dan simpan ke database
                      </p>
                    </div>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1 mb-4">
                    <li>• Menggunakan ConvertAPI (kualitas tinggi)</li>
                    <li>• Disimpan ke database</li>
                    <li>• Disimpan ke Supabase Storage</li>
                    <li>• Dokumen resmi</li>
                  </ul>
                  <Button
                    onClick={handleProcess}
                    disabled={isProcessing || isLoading}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Cetak & Selesai
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Memuat preview...</p>
                </div>
              </div>
            ) : (
              <div className="preview-container">
                <iframe
                  srcDoc={previewHtml}
                  className="w-full border-0"
                  style={{ minHeight: '1000px' }}
                  title="Preview SKTM"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Box */}
        <Card>
          <CardContent className="p-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">ℹ️ Perbedaan Opsi Cetak</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-blue-900 mb-2">📄 Cetak Preview:</p>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Untuk verifikasi tampilan PDF</li>
                    <li>• Proses cepat (2-3 detik)</li>
                    <li>• Tidak ada biaya API</li>
                    <li>• Tidak tersimpan permanen</li>
                    <li>• Bisa dicetak berkali-kali</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-green-900 mb-2">✅ Cetak & Selesai:</p>
                  <ul className="text-green-700 space-y-1">
                    <li>• Dokumen resmi final</li>
                    <li>• Kualitas tinggi (ConvertAPI)</li>
                    <li>• Tersimpan di database</li>
                    <li>• Tersimpan di Supabase Storage</li>
                    <li>• Muncul di Daftar Surat</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
