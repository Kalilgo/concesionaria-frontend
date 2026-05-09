'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { setToken } from '@/lib/auth';
import { toast } from 'sonner';
import { Car, LogIn } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function loginAdmin(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Login failed');
  }
  return res.json();
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: () => loginAdmin(email, password),
    onSuccess: async (data) => {
      await setToken(data.data.token);
      toast.success('Bienvenido');
      router.push('/admin');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Credenciales inválidas');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <Car className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <p className="text-gray-600 mt-2">Ingresá tus credenciales</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="admin@concesionaria.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-dark transition disabled:opacity-50"
          >
            <LogIn className="h-5 w-5" />
            {mutation.isPending ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Credenciales de prueba:</p>
          <p>admin@concesionaria.com / admin123</p>
        </div>
      </div>
    </div>
  );
}
