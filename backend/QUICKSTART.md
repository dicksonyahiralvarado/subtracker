# Inicio Rápido - SubTracker Backend

## 🚀 Comandos para empezar

### 1. Iniciar el servidor de desarrollo
```bash
cd backend
npm run dev
```

El servidor estará disponible en: **http://localhost:3000**

### 2. Verificar que funciona
Abre tu navegador o usa curl/Postman:
```
GET http://localhost:3000/health
```

### 3. Probar la API

#### Crear una suscripción:
```bash
POST http://localhost:3000/api/subscriptions
Content-Type: application/json

{
  "name": "Netflix",
  "price": 15.99,
  "currency": "USD",
  "frequency": "MONTHLY",
  "paymentDate": 15
}
```

#### Obtener todas las suscripciones:
```bash
GET http://localhost:3000/api/subscriptions
```

#### Actualizar una suscripción:
```bash
PUT http://localhost:3000/api/subscriptions/{id}
Content-Type: application/json

{
  "price": 19.99
}
```

#### Eliminar una suscripción:
```bash
DELETE http://localhost:3000/api/subscriptions/{id}
```

## 📊 Explorar la base de datos

Para ver los datos visualmente con Prisma Studio:
```bash
npm run prisma:studio
```

Esto abrirá una interfaz web en: **http://localhost:5555**

## 🔧 Estructura de archivos importantes

- `src/index.ts` - Servidor Express principal
- `src/routes/subscription.routes.ts` - Rutas de la API
- `src/controllers/subscription.controller.ts` - Lógica de negocio
- `prisma/schema.prisma` - Esquema de base de datos
- `prisma/dev.db` - Archivo de base de datos SQLite

## 💡 Tips

- El servidor se reinicia automáticamente cuando cambias archivos (hot-reload)
- Los datos se guardan en `prisma/dev.db` (SQLite)
- CORS está habilitado para permitir peticiones desde el frontend
- Todos los campos son validados antes de guardar
