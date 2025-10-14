'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { LogIn } from 'lucide-react';
import { mockAuth } from '@/lib/mockData';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call API login dengan database
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save user to localStorage
        mockAuth.setCurrentUser(data.user);
        
        // Set auth cookie for middleware
        document.cookie = `auth-token=${data.user.id}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
        
        router.push('/dashboard');
      } else {
        setError(data.error || 'Email atau password salah');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">KC</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Sistem Administrasi Surat
          </h2>
          <p className="mt-2 text-sm text-gray-600">Kelurahan Cibodas</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Database Login Info */}
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 max-h-64 overflow-y-auto">
            <p className="text-sm font-semibold text-green-900 mb-2">
              🗄️ Database Login (Supabase)
            </p>
            <div className="text-xs text-green-800 space-y-1">
              <p className="font-semibold mt-2">Admin:</p>
              <p>• admin@cibodas.go.id</p>
              
              <p className="font-semibold mt-2">Staff Kelurahan:</p>
              <p>• staffkelcibodas@cibodas.go.id (Kel. Cibodas)</p>
              <p>• staffkelcbb@cibodas.go.id (Kel. Cibodas Baru)</p>
              <p>• staffpanbar@cibodas.go.id (Kel. Panunggangan Barat)</p>
              <p>• staffcibodasari@cibodas.go.id (Kel. Cibodasari)</p>
              <p>• staffuwungjaya@cibodas.go.id (Kel. Uwung Jaya)</p>
              <p>• staffjatiuwung@cibodas.go.id (Kel. Jatiuwung)</p>
              
              <p className="font-semibold mt-2">User:</p>
              <p>• user@example.com</p>
              
              <p className="mt-3 pt-2 border-t border-green-300">
                <strong>Password semua akun:</strong> password123
              </p>
              <p className="mt-2 text-green-700">
                ✓ Data dari Supabase Database
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Input
                label="Email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Ingat saya
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Lupa password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              <LogIn className="w-5 h-5 mr-2" />
              {loading ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Belum punya akun?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/register">
                <Button variant="outline" className="w-full" size="lg">
                  Daftar Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600">
          © 2024 Kelurahan Cibodas. All rights reserved.
        </p>
      </div>
    </div>
  );
}
