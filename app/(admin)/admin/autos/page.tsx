'use client';

import { useQuery } from '@tanstack/react-query';
import { getVehicles, deleteVehicle } from '@/lib/api/vehicles';
import { VehicleCard } from '@/components/catalogo/VehicleCard';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminVehiculosPage() {
  const { data: vehicles, isLoading, refetch } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => getVehicles(),
  });

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este vehículo?')) return;
    try {
      await deleteVehicle(id);
      toast.success('Vehículo eliminado');
      refetch();
    } catch {
      toast.error('Error al eliminar');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Vehículos</h1>
        <Link href="/admin/autos/nuevo" className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition">
          <Plus className="h-5 w-5" /> Nuevo Vehículo
        </Link>
      </div>

      {isLoading ? (
        <p>Cargando...</p>
      ) : vehicles && vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div key={v.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <VehicleCard vehicle={v} />
              <div className="p-4 flex gap-2">
                <Link href={`/autos/${v.slug}`} className="flex-1 text-center bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition text-sm">
                  Ver
                </Link>
                <Link href={`/admin/autos/${v.id}`} className="flex-1 text-center bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition text-sm">
                  Editar
                </Link>
                <button onClick={() => handleDelete(v.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-12">No hay vehículos registrados</p>
      )}
    </div>
  );
}
