'use client';

import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getVehicleById, updateVehicle } from '@/lib/api/vehicles';
import { toast } from 'sonner';
import type { CreateVehicleInput } from '@/types';

export default function EditarVehiculoPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CreateVehicleInput>();

  const { data: vehicle, isLoading } = useQuery({
    queryKey: ['vehicle', params.id],
    queryFn: () => getVehicleById(params.id as string),
    enabled: !!params.id,
  });

  useEffect(() => {
    if (vehicle) {
      (Object.keys(vehicle) as Array<keyof typeof vehicle>).forEach((key) => {
        if (key in vehicle && key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
          setValue(key as keyof CreateVehicleInput, (vehicle as any)[key]);
        }
      });
    }
  }, [vehicle, setValue]);

  const mutation = useMutation({
    mutationFn: (data: Partial<CreateVehicleInput>) => updateVehicle(params.id as string, data),
    onSuccess: () => {
      toast.success('Vehículo actualizado');
      router.push('/admin/autos');
    },
    onError: () => toast.error('Error al actualizar'),
  });

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Editar Vehículo</h1>
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
            <input {...register('marca', { required: true })} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
            <input {...register('modelo', { required: true })} className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Año</label>
            <input type="number" {...register('anio', { valueAsNumber: true })} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
            <input type="number" {...register('precio', { valueAsNumber: true })} className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kilómetros</label>
            <input type="number" {...register('kilometros', { valueAsNumber: true })} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <input {...register('color')} className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Combustible</label>
            <select {...register('combustible')} className="w-full border rounded-lg px-3 py-2">
              <option value="Nafta">Nafta</option>
              <option value="Diésel">Diiesel</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Eléctrico">Eléctrico</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transmisión</label>
            <select {...register('transmision')} className="w-full border rounded-lg px-3 py-2">
              <option value="Manual">Manual</option>
              <option value="Automática">Automática</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input {...register('slug')} className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea {...register('descripcion')} rows={3} className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Características</label>
          <textarea {...register('caracteristicas')} rows={2} className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('disponible')} />
            Disponible
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('destacado')} />
            Destacado
          </label>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={mutation.isPending} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50">
            {mutation.isPending ? 'Guardando...' : 'Actualizar'}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
