'use client';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createVehicle } from '@/lib/api/vehicles';
import { toast } from 'sonner';
import type { CreateVehicleInput } from '@/types';
import { useState } from 'react';
import { ImagePlus, X } from 'lucide-react';

export default function NuevoVehiculoPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<CreateVehicleInput>();
  const [imagenPrevia, setImagenPrevia] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      toast.success('Vehículo creado correctamente');
      router.push('/admin/autos');
    },
    onError: () => toast.error('Error al crear el vehículo'),
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImagenPrevia(base64);
      setValue('imagenes', [base64]);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagenPrevia(null);
    setValue('imagenes', []);
  };

  const onSubmit = (data: CreateVehicleInput) => mutation.mutate(data);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Nuevo Vehículo</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
            <input {...register('marca', { required: true })} className="w-full border rounded-lg px-3 py-2" />
            {errors.marca && <span className="text-red-500 text-sm">Requerido</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
            <input {...register('modelo', { required: true })} className="w-full border rounded-lg px-3 py-2" />
            {errors.modelo && <span className="text-red-500 text-sm">Requerido</span>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Año</label>
            <input type="number" {...register('anio', { required: true, valueAsNumber: true })} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
            <input type="number" {...register('precio', { required: true, valueAsNumber: true })} className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kilómetros</label>
            <input type="number" {...register('kilometros', { required: true, valueAsNumber: true })} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <input {...register('color', { required: true })} className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Combustible</label>
            <select {...register('combustible', { required: true })} className="w-full border rounded-lg px-3 py-2">
              <option value="">Seleccionar</option>
              <option value="Nafta">Nafta</option>
              <option value="Diésel">Diésel</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Eléctrico">Eléctrico</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transmisión</label>
            <select {...register('transmision', { required: true })} className="w-full border rounded-lg px-3 py-2">
              <option value="">Seleccionar</option>
              <option value="Manual">Manual</option>
              <option value="Automática">Automática</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input {...register('slug', { required: true })} placeholder="toyota-corolla-2024" className="w-full border rounded-lg px-3 py-2" />
          {errors.slug && <span className="text-red-500 text-sm">Requerido</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea {...register('descripcion', { required: true })} rows={3} className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Características</label>
          <textarea {...register('caracteristicas')} rows={2} placeholder="Separadas por coma" className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagen del vehículo</label>
          {imagenPrevia ? (
            <div className="relative inline-block">
              <img src={imagenPrevia} alt="Preview" className="h-32 w-auto rounded-lg border" />
              <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click para subir imagen</p>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          )}
          <input type="hidden" {...register('imagenes')} />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('disponible')} defaultChecked />
            Disponible
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('destacado')} />
            Destacado
          </label>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={mutation.isPending} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50">
            {mutation.isPending ? 'Guardando...' : 'Guardar'}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
