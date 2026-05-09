'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, MessageSquare, Calendar, LayoutDashboard, LogOut, Plus } from 'lucide-react';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/autos', icon: Car, label: 'Vehículos' },
  { href: '/admin/consultas', icon: MessageSquare, label: 'Consultas' },
  { href: '/admin/turnos', icon: Calendar, label: 'Turnos' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
        <div className="p-6">
          <h2 className="text-xl font-bold">Panel Admin</h2>
        </div>
        <nav className="mt-6">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition ${pathname === href ? 'bg-gray-800 border-l-4 border-primary' : ''}`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
          {pathname === '/admin/autos' && (
            <Link
              href="/admin/autos/nuevo"
              className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition text-green-400"
            >
              <Plus className="h-5 w-5" />
              Nuevo Vehículo
            </Link>
          )}
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Link href="/" className="flex items-center gap-3 text-gray-400 hover:text-white transition">
            <LogOut className="h-5 w-5" />
            Volver al sitio
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
