'use client';

import { useState } from 'react';
import { useCalculadoraCuotas } from '@/hooks/useCalculadoraCuotas';
import { formatPrecio } from '@/lib/utils';
import { Calculator, Info } from 'lucide-react';

interface Props {
  precio: number;
}

export function CalculadoraCuotas({ precio }: Props) {
  const { state, calculate } = useCalculadoraCuotas();
  const [entrada, setEntrada] = useState(precio * 0.2);
  const [meses, setMeses] = useState(24);

  const handleCalculate = () => {
    calculate(precio, meses, entrada);
  };

  return (
    <div className="bg-gray-50 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-primary" />
        <h4 className="font-semibold text-gray-900">Simulá tu cuota</h4>
      </div>
      
      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Entrada</span>
            <span className="font-medium text-gray-900">{formatPrecio(entrada)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={precio * 0.5}
            step={precio * 0.05}
            value={entrada}
            onChange={(e) => setEntrada(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>$0</span>
            <span>{formatPrecio(precio * 0.5)}</span>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-2">Plazo</label>
          <div className="grid grid-cols-3 gap-2">
            {[12, 24, 36, 48, 60].map((m) => (
              <button
                key={m}
                onClick={() => setMeses(m)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                  meses === m
                    ? 'bg-primary text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-primary'
                }`}
              >
                {m} meses
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="btn-primary w-full"
        >
          Calcular Cuota
        </button>

        {state.resultado.cuota > 0 && (
          <div className="bg-white rounded-xl p-4 border border-primary/20">
            <p className="text-sm text-gray-500 mb-1">Cuota mensual aproximada</p>
            <p className="text-2xl font-bold text-primary">{formatPrecio(state.resultado.cuota)}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
              <Info className="h-4 w-4" />
              <span>Total a financiar: {formatPrecio(state.resultado.total)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}