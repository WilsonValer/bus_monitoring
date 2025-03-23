// src/routes/vehicles.routes.ts
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getVehiclesController, getVehicleByIdController, getVehicleLocationController } from '../controllers/vehicles.controller';

const router = Router();

/**
 * GET /api/vehicles
 * - ?clientId=XD405 (opcional)
 * Ejemplo: /api/vehicles?clientId=XD405
 * 
 */

router.get('/', authMiddleware, getVehiclesController);
/**
 * GET /api/vehicles/:id
 * Ejemplo: /api/vehicles/10
 */
router.get('/:id', authMiddleware, getVehicleByIdController);

/**
 * 🔹 GET /api/vehicles/location/:placa
 * - Obtiene la última ubicación del vehículo por su placa.
 */
router.get('/location/:placa', authMiddleware, getVehicleLocationController);

// (Opcional) Rutas para crear, editar, eliminar vehículos
// router.post('/', authMiddleware, createVehicleController);
// router.put('/:id', authMiddleware, updateVehicleController);
// router.delete('/:id', authMiddleware, deleteVehicleController);

export default router;

