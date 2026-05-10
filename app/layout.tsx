import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AutoDrive | Concesionaria',
  description: 'Encontrá los mejores vehículos en nuestra concesionaria. Amplio stock y servicio de taller propio.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
