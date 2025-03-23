// src/services/vehicle.service.ts
import { PrismaClient } from '@prisma/client';
import internal from 'stream';

const prisma = new PrismaClient();

/**
 * Obtiene todos los vehículos.
 * Si se envía un clientId (cliente_id), filtra por ese clientId.
 */
export async function getAllVehicles(clientId?: string) {
  if (clientId) {
    // Filtra sólo vehículos con cliente_id = clientId
    return prisma.vehiculos.findMany({
      where: { cliente_id: clientId },
    });
  } else {
    // Retorna todos los vehículos
    return prisma.vehiculos.findMany();
  }
}

/**
 * Obtiene un vehículo por su ID.
 */
export async function getVehicleById(user_id: number) {
  return prisma.vehiculos.findMany({
    where: { user_id: user_id },
  });
}

/**
 * 🔹 Obtiene la última ubicación de un vehículo basado en su placa.
 */
export async function getVehicleLocationByPlate(placa: string) {
  // 1️⃣ Buscar el vehículo por su placa para obtener el `id`
  const vehicle = await prisma.vehiculos.findFirst({
    where: { placa },
    select: { id: true } // Solo obtenemos el ID del vehículo 
  });

  if (!vehicle) {
    throw new Error('Vehículo no encontrado');
  }

  // 2️ Buscar la última ubicación en `sensor_data_4G` usando `vehicle_id`
  const lastLocation = await prisma.sensor_data_4g.findFirst({
    where: { vehicle_id: vehicle.id },
    orderBy: { timestamp: 'desc' }, // Obtener el registro más reciente
    select: { latitude: true, longitude: true, velocidad: true, timestamp: true }
  });

  if (!lastLocation) {
    throw new Error('No se encontró ubicación para este vehículo');
  }

  return lastLocation;
}

/**
export async function createVehicle(data: { cliente_id: string; user_id: number; placa: string }) {
    return prisma.vehiculos.create({ data });
  }
  

 * Updates a vehicle record in the database.
 *
 * @param {number} id - The ID of the vehicle to update.
 * @param {Object} data - The data to update the vehicle with.
 * @param {string} [data.cliente_id] - The optional client ID associated with the vehicle.
 * @param {number} [data.user_id] - The optional user ID associated with the vehicle.
 * @param {string} [data.placa] - The optional license plate of the vehicle.
 * @returns {Promise<Object>} The updated vehicle record.
 
  export async function updateVehicle(id: number, data: { cliente_id?: string; user_id?: number; placa?: string }) {
    return prisma.vehiculos.update({
      where: { id },
      data,
    });
  }
  
  export async function deleteVehicle(id: number) {
    return prisma.vehiculos.delete({
      where: { id },
    });
  }
  */