'use client';

import { CreditCard, Calculator, Building, FileText, CheckCircle, ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';

export default function FinanciamientoPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="container-app relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Financiación Flexible</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Encontrá el plan que mejor se adapte a tu presupuesto
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-app">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: CreditCard, title: 'Cuotas Fijas', desc: 'Pagás lo mismo todos los meses sin sorpresas', color: 'bg-blue-50 text-primary' },
              { icon: Calculator, title: 'Tasa Competitiva', desc: 'Las mejores tasas del mercado', color: 'bg-green-50 text-emerald-600' },
              { icon: Building, title: 'Múltiples Bancos', desc: 'Evaluamos las mejores opciones para vos', color: 'bg-purple-50 text-purple-600' },
              { icon: FileText, title: 'Aprobación Rápida', desc: 'Tu crédito aprobado en 48 horas', color: 'bg-orange-50 text-orange-600' },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <div 
                key={title} 
                className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-card-hover transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`inline-flex p-3 rounded-xl mb-4 ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Opciones de Financiación
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <CreditCard className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Préstamo Personal</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    Hasta 60 cuotas
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    Sin necesidad de garantía
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    Aprobación en 48hs
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-card border-2 border-primary">
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MÁS POPULAR
                </div>
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                  <Building className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Financiación Bancaria</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    Hasta 84 cuotas
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    Tasa fija durante toda la operación
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    Podés incluir seguro
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                  <FileText className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Leasing</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    Ideal para empresas
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    Beneficios fiscales
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    Opción de compra al final
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl shadow-soft p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Documentación necesaria</h3>
              <ul className="space-y-4">
                {[
                  'DNI original y copia',
                  'Comprobante de ingresos (3 últimos recibos)',
                  'Factura de servicios a tu nombre',
                  'Constancia de CUIL/CUIT',
                  'Extractos bancarios de los últimos 3 meses',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-sm font-bold">{i + 1}</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl shadow-soft p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Condiciones disponibles</h3>
              <ul className="space-y-4">
                {[
                  'Hasta 60 cuotas fijas',
                  'Financiación del 70% del valor del vehículo',
                  'Tasa fija durante toda la operación',
                  'Posibilidad de incluir seguro en cuotas',
                  'Sin límite de edad',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary-700 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                ¿Necesitás ayuda con el financiamiento?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Nuestro equipo te ayuda a encontrar la mejor opción según tu perfil crediticio.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/autos" className="btn-primary bg-white text-primary hover:bg-gray-100">
                  Ver Autos Disponibles
                </Link>
                <a 
                  href="tel:+541112345678" 
                  className="btn-secondary-light flex items-center gap-2"
                >
                  <Phone className="h-5 w-5" />
                  Llamar ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}