# Bus Monitoring

Backend para el monitoreo en tiempo real de autobuses. Este proyecto expone una API REST y un canal WebSocket para registrar usuarios, gestionar vehículos y paraderos, y recibir datos de posición desde los dispositivos instalados en cada autobús.

## Características principales

- **Node.js + Express**: servidor escrito en TypeScript.
- **Prisma ORM** con base de datos MySQL.
- **Autenticación JWT** para asegurar la mayoría de las rutas.
- **Socket.IO** para notificaciones en tiempo real de nuevas ubicaciones.
- **Tareas programadas con cron** que revisan la tabla de sensores y emiten eventos cuando hay datos nuevos.

## Estructura del proyecto

```
src/
  app.ts              Configura Express y los middlewares globales.
  server.ts           Arranca el servidor y Socket.IO.
  config.ts           Variables de entorno.
  controllers/        Lógica de cada endpoint.
  routes/             Definición de rutas Express.
  services/           Acceso a la base de datos mediante Prisma.
  sensor.polling.ts   Tarea recurrente que consulta nuevos registros.
```

El esquema de la base de datos se encuentra en `prisma/schema.prisma`.

## Variables de entorno

- `DATABASE_URL` – cadena de conexión a MySQL.
- `JWT_SECRET` – clave para firmar los tokens.
- `PORT` – puerto del servidor (por defecto `3000`).

Crea un archivo `.env` en la raíz del proyecto con estos valores antes de iniciar el servidor.

## Instalación

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Genera el cliente de Prisma:
   ```bash
   npm run prisma:generate
   ```
3. Arranca el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
   El backend quedará accesible en `http://localhost:<PORT>`.

Para compilar el código TypeScript a JavaScript puedes usar:
```bash
npm run build
```

## Endpoints principales

La mayoría de rutas están bajo el prefijo `/api`.

- `POST /api/auth/login` – obtiene un token JWT.
- `POST /api/auth/register` – crea un usuario (opcional).
- `GET /api/vehicles` – lista de vehículos. Soporta `?clientId=` para filtrar.
- `GET /api/vehicles/:id` – detalle de un vehículo.
- `GET /api/vehicles/location/:placa` – última ubicación de un vehículo por su placa.
- `GET|POST|PUT|DELETE /api/paraderos` – CRUD de paraderos.
- `POST /api/sensor` – guarda una lectura de posición y la envía por WebSocket.
- `GET /api/sensor/latest/:vehicleId` – última lectura de un vehículo.
- `GET /api/users` – lista de usuarios.

Todas estas rutas (excepto las de autenticación) requieren el encabezado `Authorization: Bearer <token>`.

## Comunicación en tiempo real

Los clientes pueden conectarse al servidor de Socket.IO (en el mismo puerto que HTTP) y escuchar el evento `new-sensor-data`. Este evento se emite cada vez que llega una nueva lectura de posición, ya sea vía `POST /api/sensor` o por la tarea de `sensor.polling.ts`.

---

Este backend forma parte de un proyecto de tesis destinado a dar seguimiento en tiempo real a la flota de autobuses de una empresa de transporte.
