import { useState } from 'react';

interface CuotaState {
  precio: number;
  meses: number;
  entrada: number;
  resultado: { cuota: number; total: number };
}

export function useCalculadoraCuotas() {
  const [state, setState] = useState<CuotaState>({
    precio: 10000000,
    meses: 12,
    entrada: 0,
    resultado: { cuota: 0, total: 0 },
  });

  const calculate = (precio: number, meses: number, entrada: number) => {
    const tasaAnual = 0.48;
    const tasaMensual = tasaAnual / 12;
    const montoFinanciar = precio - entrada;
    const cuota = (montoFinanciar * tasaMensual * Math.pow(1 + tasaMensual, meses)) / (Math.pow(1 + tasaMensual, meses) - 1);
    setState({
      precio,
      meses,
      entrada,
      resultado: { cuota: Math.round(cuota), total: Math.round(cuota * meses) },
    });
  };

  return { state, calculate };
}
