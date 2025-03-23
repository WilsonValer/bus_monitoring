// src/routes/sensor.routes.ts
import { Router } from 'express';
import {
  createSensorDataController,
  getLatestSensorDataController,
} from '../controllers/sensor.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// POST /api/sensor
router.post('/', authMiddleware, createSensorDataController);

// GET /api/sensor/latest/:vehicleId
router.get('/latest/:vehicleId', authMiddleware, getLatestSensorDataController);

export default router;
