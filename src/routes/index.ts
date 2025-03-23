// src/routes/index.ts
import { Router } from 'express';
import authRoutes from './auth.routes';
import vehiclesRoutes from './vehicles.routes';
import userRoutes from './user.routes'; 
import paraderosRoutes from './paraderos.routes';
import sensorRoutes from './sensor.routes'; 
// import otherRoutes from './other.routes'; // Ejemplo si tuvieras más

const router = Router();

// Montar las rutas de autenticación
router.use('/auth', authRoutes);
router.use('/vehicles', vehiclesRoutes);
// Rutas de usuarios
router.use('/users', userRoutes);

// Rutas de paraderos
router.use('/paraderos', paraderosRoutes);

// Rutas de sensor data
router.use('/sensor', sensorRoutes);


export { router };
