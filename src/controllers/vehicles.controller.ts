// src/controllers/vehicle.controller.ts
import { Request, Response, NextFunction } from 'express';
import { getAllVehicles, getVehicleById, getVehicleLocationByPlate } from '../services/vehicle.service';

/**
 * Controlador para obtener todos los vehículos.
 * - Opcionalmente filtra por ?clientId=XYZ
 */
export const getVehiclesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const clientId = req.query.clientId as string | undefined;
    const vehicles = await getAllVehicles(clientId);
    res.json(vehicles);
    return; // finaliza la ejecución con un return
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

/**
 * Controlador para obtener un vehículo por su id
 */
export const getVehicleByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      res.status(400).json({ error: 'El parámetro ID debe ser un número.' });
      return;
    }

    const vehicle = await getVehicleById(numericId);
    if (!vehicle) {
      res.status(404).json({ error: 'Vehículo no encontrado.' });
      return;
    }

    res.json(vehicle);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};


/**
 * 🔹 Controlador para obtener la última ubicación de un vehículo por su placa.
 */
export const getVehicleLocationController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { placa } = req.params;
    console.log("Placa recibida en el request:", placa);
    //const placaNormalizada = placa.replace(/-/g, '').toUpperCase();
    //console.log("Placa normalizada despues:", placaNormalizada);

    const location = await getVehicleLocationByPlate(placa);
    console.log("Placa location despues:", location);

    res.json(location);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
    
  }
};