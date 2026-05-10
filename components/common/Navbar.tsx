'use client';

import Link from 'next/link';
import { Car, Phone, Menu, X, Search, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/autos', label: 'Autos' },
    { href: '/contacto?servicio=turno', label: 'Turnos' },
    { href: '/contacto?servicio=soporte', label: 'Soporte' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-soft py-3' 
          : 'bg-white py-4'
      }`}
    >
      <nav className="container-app">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-br from-primary to-primary-700 p-2.5 rounded-xl">
                <Car className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl text-gray-900">AutoDrive</span>
              <p className="text-xs text-gray-500 -mt-0.5">Concesionaria</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-gray-600 font-medium rounded-lg hover:text-primary hover:bg-primary/5 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a 
              href="tel:+541112345678" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">+54 11 1234-5678</span>
            </a>
            <Link 
              href="/login" 
              className="btn-primary text-sm"
            >
              Admin
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link 
              href="/autos" 
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Search className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menú"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-up">
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-white hover:text-primary transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200">
                <a 
                  href="tel:+541112345678" 
                  className="flex items-center gap-2 px-4 py-3 text-gray-700 font-medium"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+54 11 1234-5678</span>
                </a>
                <Link 
                  href="/login" 
                  onClick={() => setMobileOpen(false)}
                  className="block mx-4 mt-2 btn-primary text-center text-sm"
                >
                  Panel Admin
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}