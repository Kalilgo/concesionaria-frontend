import { useCallback } from 'react';

export function useWhatsApp() {
  const sendMessage = useCallback((message: string, phone?: string) => {
    const phoneNumber = phone || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }, []);

  return { sendMessage };
}
