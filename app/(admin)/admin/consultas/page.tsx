'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { getInquiries, markInquiryAsRead, deleteInquiry } from '@/lib/api/inquiries';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Eye, Trash2, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function ConsultasPage() {
  const { data: inquiries, refetch, isLoading } = useQuery({
    queryKey: ['inquiries'],
    queryFn: () => getInquiries(),
  });

  const markRead = useMutation({
    mutationFn: markInquiryAsRead,
    onSuccess: () => { toast.success('Marcada como leída'); refetch(); },
  });

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta consulta?')) return;
    try {
      await deleteInquiry(id);
      toast.success('Eliminada');
      refetch();
    } catch { toast.error('Error'); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Consultas</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : inquiries && inquiries.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Estado</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Nombre</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Email</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Fecha</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Mensaje</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id} className={`border-b ${!inq.leido ? 'bg-blue-50' : ''}`}>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${inq.leido ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-600'}`}>
                      {inq.leido ? 'Leído' : 'Nuevo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{inq.nombre}</td>
                  <td className="px-6 py-4 text-gray-600">{inq.email}</td>
                  <td className="px-6 py-4 text-gray-600">{format(new Date(inq.createdAt), 'dd/MM/yyyy HH:mm', { locale: es })}</td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{inq.mensaje}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <a href={`mailto:${inq.email}`} className="p-2 text-gray-500 hover:text-primary">
                        <Mail className="h-4 w-4" />
                      </a>
                      {!inq.leido && (
                        <button onClick={() => markRead.mutate(inq.id)} className="p-2 text-gray-500 hover:text-green-600">
                          <Eye className="h-4 w-4" />
                        </button>
                      )}
                      <button onClick={() => handleDelete(inq.id)} className="p-2 text-gray-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-12">No hay consultas</p>
      )}
    </div>
  );
}
