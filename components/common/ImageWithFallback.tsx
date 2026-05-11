'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
}

const DEFAULT_IMAGE = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='none'%3E%3Crect width='400' height='300' fill='%23e5e7eb'/%3E%3Cpath d='M150 180c-20-15-45-20-70-15-30 5-50 25-50 50 0 30 40 50 90 50s90-20 90-50c0-25-20-45-50-50-25-5-50 0-70 15z' fill='%239ca3af'/%3E%3Ccircle cx='100' cy='210' r='25' fill='%236b7280'/%3E%3Ccircle cx='300' cy='210' r='25' fill='%236b7280'/%3E%3Crect x='80' y='190' width='40' height='20' rx='5' fill='%239ca3af'/%3E%3Crect x='280' y='190' width='40' height='20' rx='5' fill='%239ca3af'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='%23718296' font-size='16' font-family='system-ui'%3ESin imagen%3C/text%3E%3C/svg%3E`;

export function ImageWithFallback({ src, alt, className, fill, sizes }: Props) {
  const [error, setError] = useState(false);
  
  const isBase64 = src?.startsWith('data:image') || src?.length > 1000;
  const imageSrc = error || !src ? DEFAULT_IMAGE : src;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      unoptimized={isBase64}
      onError={() => setError(true)}
    />
  );
}