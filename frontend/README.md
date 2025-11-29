# SubTracker Frontend

Aplicación web de gestión de suscripciones construida con Vue.js 3, TypeScript, Vite y Tailwind CSS.

## Inicio Rápido

### 1. Instalar dependencias (ya hecho)
```bash
npm install
```

### 2. Iniciar servidor de desarrollo
```bash
npm run dev
```

El frontend estará disponible en: **http://localhost:5173**

## Importante

Asegúrate de que el **backend esté corriendo** en `http://localhost:3000` antes de usar el frontend.

```bash
# En otra terminal, desde la carpeta backend:
cd ../backend
npm run dev
```

## Características

- **CRUD Completo**: Crear, leer, actualizar y eliminar suscripciones
- **Cálculo de Totales**: Totales mensuales automáticos con normalización
- **Soporte Multi-moneda**: USD y HNL con conversión automática
- **Frecuencias**: Suscripciones mensuales y anuales
- **UI Moderna**: Tailwind CSS con diseño responsive
- **TypeScript**: Tipado completo para mayor seguridad

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── SubscriptionCard.vue      # Tarjeta de suscripción
│   │   ├── SubscriptionForm.vue      # Formulario crear/editar
│   │   └── SubscriptionList.vue      # Contenedor principal
│   ├── composables/
│   │   └── useSubscriptions.ts       # Lógica de estado y API
│   ├── types/
│   │   └── Subscription.ts           # Tipos TypeScript
│   ├── App.vue                       # Componente raíz
│   ├── main.ts                       # Punto de entrada
│   └── style.css                     # Estilos Tailwind
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo con hot-reload
- `npm run build` - Compilar para producción
- `npm run preview` - Vista previa de la build de producción

## Componentes

### SubscriptionCard
Tarjeta visual para mostrar una suscripción con:
- Nombre y precio
- Moneda (USD/HNL)
- Frecuencia (Mensual/Anual)
- Día de pago
- Botones de editar y eliminar

### SubscriptionForm
Formulario para crear/editar suscripciones:
- Validación de campos
- Soporte para USD y HNL
- Selección de frecuencia
- Campo opcional de día de pago

### SubscriptionList
Contenedor principal que incluye:
- Header con totales mensuales
- Botón para nueva suscripción
- Grid responsive de tarjetas
- Manejo de estados (loading, error)

## Integración con Backend

El composable `useSubscriptions` consume los siguientes endpoints:

- `GET /api/subscriptions/totals` - Obtener totales y suscripciones
- `POST /api/subscriptions` - Crear suscripción
- `PUT /api/subscriptions/:id` - Actualizar suscripción
- `DELETE /api/subscriptions/:id` - Eliminar suscripción

## Uso

1. **Crear Suscripción**: Click en "+ Nueva Suscripción", llena el formulario y guarda
2. **Editar**: Click en el icono de lápiz en cualquier tarjeta
3. **Eliminar**: Click en el icono de basura (con confirmación)
4. **Ver Totales**: El header muestra automáticamente los totales mensuales

## Características Técnicas

- **Composition API** con `<script setup>`
- **TypeScript** para tipado estático
- **Reactive State** con `ref` y `computed`
- **Async/Await** para llamadas a API
- **Props & Emits** con tipos
- **Tailwind CSS** para estilos utilitarios
