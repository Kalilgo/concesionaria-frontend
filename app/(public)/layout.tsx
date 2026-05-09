import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}