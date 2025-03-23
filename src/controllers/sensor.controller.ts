// src/controllers/sensor.controller.ts
import { Request, Response, NextFunction } from 'express';
import { insertSensorData, getLatestSensorData } from '../services/sensor.service';
import { io } from '../server'; // Importamos la instancia de Socket.IO

/**
 * Guarda una nueva lectura de sensor_data_4g
 * y emite un evento en tiempo real via WebSocket
 */
export const createSensorDataController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { vehicle_id, latitude, longitude, velocidad, timestamp } = req.body;

    // Validaciones mínimas
    if (vehicle_id === undefined || latitude === undefined || longitude === undefined) {
      res.status(400).json({ error: 'Faltan campos obligatorios: vehicle_id, latitude, longitude' });
      return;
    }

    // Insertar en DB
    const newData = await insertSensorData({
      vehicle_id: Number(vehicle_id),
      latitude: Number(latitude),
      longitude: Number(longitude),
      velocidad: velocidad ? Number(velocidad) : 0,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    });

    // Emitir evento a TODOS los clientes conectados
    io.emit('new-sensor-data', newData);

    res.status(201).json(newData);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

/**
 * Obtiene la última lectura de un vehículo por su ID.
 */
export const getLatestSensorDataController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { vehicleId } = req.params;
    const vehId = parseInt(vehicleId, 10);

    if (isNaN(vehId)) {
      res.status(400).json({ error: 'El parámetro vehicleId debe ser numérico.' });
      return;
    }

    const data = await getLatestSensorData(vehId);
    if (!data) {
      res.status(404).json({ error: 'No hay datos para este vehículo.' });
      return;
    }

    res.json(data);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};
