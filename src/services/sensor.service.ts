// src/services/sensor.service.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Inserta una nueva lectura de sensor.
 */
export async function insertSensorData(data: {
  vehicle_id: number;
  latitude: number;
  longitude: number;
  velocidad: number;
  timestamp: Date;
}) {
  return prisma.sensor_data_4g.create({
    data,
  });
}

/**
 * Obtiene la última lectura del vehículo indicado.
 */

export async function getLatestSensorData(vehicleId: number) {
  return prisma.sensor_data_4g.findFirst({
    where: { vehicle_id: vehicleId },
    orderBy: { timestamp: 'desc' },
  });
}

/**
 * (Opcional) Obtiene todas las lecturas (o podrías paginar, filtrar por fecha, etc.).
 */
export async function getAllSensorData() {
  return prisma.sensor_data_4g.findMany({
    orderBy: { timestamp: 'desc' },
  });
}


export async function getLatestRecord() {
  return prisma.sensor_data_4g.findFirst({
    orderBy: { timestamp: 'desc' },
  });
}