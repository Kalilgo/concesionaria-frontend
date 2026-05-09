# Concesionaria Frontend

Frontend de la aplicación de concesionaria de vehículos.

## Stack Tecnológico

- **Framework**: Next.js 14
- **Estado**: Zustand
- **Data Fetching**: TanStack Query
- **UI**: TailwindCSS + Componentes personalizados
- **Formularios**: React Hook Form + Zod

## Estructura

```
app/
├── (public)/          # Rutas públicas
│   ├── autos/        # Catálogo y ficha
│   ├── financiamiento/
│   └── contacto/
├── (admin)/          # Panel de administración
│   └── admin/
│       ├── autos/   # CRUD de vehículos
│       ├── consultas/
│       └── turnos/
└── login/           # Login admin

components/
├── catalogo/        # Componentes del catálogo
├── ficha/           # Componentes de ficha de vehículo
├── admin/           # Componentes del admin
└── common/          # Navbar, Footer, etc.

lib/
├── api/            # Funciones para llamar al backend
├── auth.ts         # Helpers de autenticación
└── utils.ts        # Utilidades
```

## Inicio Rápido

```bash
# Instalar dependencias
npm install

# Crear archivo de entorno
cp .env.example .env.local

# Iniciar en desarrollo
npm run dev
```

## Variables de Entorno

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_WHATSAPP_NUMBER=5491112345678
```

## Deploy

Recomendado: Vercel

1. Conectar repo de GitHub
2. Vercel detecta automáticamente Next.js
3. Configurar NEXT_PUBLIC_API_URL apuntando al backend en Railway
