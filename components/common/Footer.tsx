'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="container-app py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative h-14 w-14">
                <Image 
                  src="/uploads/logo/logo_gg_minimalista.svg" 
                  alt="GG Autos" 
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-xl text-white">GG Autos</span>
                <p className="text-xs text-gray-400">Concesionaria</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              Tu próximo auto está aquí. Calidad, confianza y el mejor servicio para vos.
            </p>
            
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Navegación</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/autos" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Autos en Stock
                </Link>
              </li>
              <li>
                <Link href="/contacto?servicio=turno" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Turnos Taller
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Reconquista 61</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+5491162004150" className="text-gray-400 hover:text-white transition">
                  +54 9 11 6200-4150
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:gomezukalil@gmail.com" className="text-gray-400 hover:text-white transition">
                  gomezukalil@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Horario</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-gray-400">
                  <p>Lunes - Sábados</p>
                  <p className="text-white">8:00 - 18:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} GG Autos. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition">Términos y Condiciones</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}