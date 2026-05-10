'use client';

import Link from 'next/link';
import { Car, Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="container-app py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-to-br from-primary to-primary-700 p-2.5 rounded-xl">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-white">AutoDrive</span>
                <p className="text-xs text-gray-400">Concesionaria</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              Tu próximo auto está aquí. Calidad, confianza y el mejor servicio para vos.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary transition">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
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
                <span className="text-gray-400">Av. Libertador 1234<br />Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+541112345678" className="text-gray-400 hover:text-white transition">
                  +54 11 1234-5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:info@concesionaria.com" className="text-gray-400 hover:text-white transition">
                  info@concesionaria.com
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
                  <p>Lunes - Viernes</p>
                  <p className="text-white">9:00 - 18:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-gray-400">
                  <p>Sábados</p>
                  <p className="text-white">9:00 - 13:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-gray-400">
                  <p>Domingos</p>
                  <p className="text-white">Cerrado</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} AutoDrive Concesionaria. Todos los derechos reservados.
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