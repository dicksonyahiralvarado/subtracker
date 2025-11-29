# SubTracker Backend

Backend API para la aplicación SubTracker de gestión de suscripciones.

## Tecnologías

- **Node.js** con **TypeScript**
- **Express.js** - Framework web
- **Prisma ORM** - ORM para SQLite
- **SQLite** - Base de datos

## Estructura del Proyecto

```
backend/
├── prisma/
│   └── schema.prisma       # Esquema de base de datos
├── src/
│   ├── controllers/
│   │   └── subscription.controller.ts
│   ├── routes/
│   │   └── subscription.routes.ts
│   ├── types/
│   │   └── subscription.types.ts
│   ├── lib/
│   │   └── prisma.ts
│   └── index.ts            # Punto de entrada
├── package.json
└── tsconfig.json
```

## Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Generar cliente de Prisma:**
```bash
npm run prisma:generate
```

3. **Crear la base de datos y ejecutar migraciones:**
```bash
npm run prisma:migrate
```

4. **Copiar archivo de variables de entorno:**
```bash
copy .env.example .env
```

## Scripts Disponibles

- `npm run dev` - Iniciar servidor en modo desarrollo con hot-reload
- `npm run build` - Compilar TypeScript a JavaScript
- `npm start` - Iniciar servidor en producción
- `npm run prisma:generate` - Generar cliente de Prisma
- `npm run prisma:migrate` - Ejecutar migraciones de base de datos
- `npm run prisma:studio` - Abrir Prisma Studio (UI para base de datos)

## API Endpoints

### Suscripciones

**Base URL:** `http://localhost:3000/api/subscriptions`

#### GET `/api/subscriptions`
Obtener todas las suscripciones
```json
Response: 200 OK
[
  {
    "id": "uuid",
    "name": "Netflix",
    "price": 15.99,
    "currency": "USD",
    "frequency": "MONTHLY",
    "paymentDate": 15,
    "createdAt": "2025-11-28T...",
    "updatedAt": "2025-11-28T..."
  }
]
```

#### GET `/api/subscriptions/:id`
Obtener una suscripción por ID
```json
Response: 200 OK | 404 Not Found
```

#### POST `/api/subscriptions`
Crear nueva suscripción
```json
Request Body:
{
  "name": "Netflix",
  "price": 15.99,
  "currency": "USD",
  "frequency": "MONTHLY",
  "paymentDate": 15  // Opcional (1-31)
}

Response: 201 Created
```

#### PUT/PATCH `/api/subscriptions/:id`
Actualizar suscripción existente
```json
Request Body:
{
  "name": "Netflix Premium",
  "price": 19.99
}

Response: 200 OK | 404 Not Found
```

#### DELETE `/api/subscriptions/:id`
Eliminar suscripción
```json
Response: 204 No Content | 404 Not Found
```

## Modelo de Datos

### Subscription
```typescript
{
  id: string;           // UUID
  name: string;         // Nombre de la suscripción
  price: number;        // Precio
  currency: 'USD' | 'HNL';  // Moneda
  frequency: 'MONTHLY' | 'ANNUAL';  // Frecuencia de pago
  paymentDate?: number; // Día del mes (1-31)
  createdAt: Date;
  updatedAt: Date;
}
```

## Desarrollo

El servidor se ejecuta por defecto en `http://localhost:3000`

Endpoint de verificación de salud: `GET /health`
