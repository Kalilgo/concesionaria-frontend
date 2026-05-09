'use client';

import { MessageCircle } from 'lucide-react';
import { useWhatsApp } from '@/hooks/useWhatsApp';

export function WhatsAppButton() {
  const { sendMessage } = useWhatsApp();

  return (
    <button
      onClick={() => sendMessage('Hola! Me gustaría obtener más información sobre sus vehículos.')}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-50"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}
