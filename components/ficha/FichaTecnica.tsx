import type { Vehicle } from '@/types';

interface Props {
  vehicle: Vehicle;
}

export function FichaTecnica({ vehicle }: Props) {
  const specs = [
    { label: 'Marca', value: vehicle.marca },
    { label: 'Modelo', value: vehicle.modelo },
    { label: 'Año', value: vehicle.anio },
    { label: 'Kilómetros', value: `${vehicle.kilometros.toLocaleString()} km` },
    { label: 'Combustible', value: vehicle.combustible },
    { label: 'Transmisión', value: vehicle.transmision },
    { label: 'Color', value: vehicle.color },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Ficha Técnica</h3>
      <div className="grid grid-cols-2 gap-4">
        {specs.map(({ label, value }) => (
          <div key={label} className="flex justify-between border-b border-gray-100 py-2">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
      {vehicle.caracteristicas && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Características</h4>
          <p className="text-gray-600 text-sm">{vehicle.caracteristicas}</p>
        </div>
      )}
    </div>
  );
}
