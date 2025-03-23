import { Request, Response, NextFunction } from 'express';
import { 
  getAllParaderos, 
  getParaderoById, 
  createParadero, 
  updateParadero, 
  deleteParadero 
} from '../services/paradero.service';

export const getParaderosController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const paraderos = await getAllParaderos();
    res.json(paraderos);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export const getParaderoByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const paraderoId = parseInt(id, 10);

    if (isNaN(paraderoId)) {
      res.status(400).json({ error: 'El parámetro ID debe ser numérico' });
      return;
    }

    const paradero = await getParaderoById(paraderoId);
    if (!paradero) {
      res.status(404).json({ error: 'Paradero no encontrado' });
      return;
    }

    res.json(paradero);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export const createParaderoController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { nombre, latitude, longitude, radio } = req.body;

    if (!nombre || latitude === undefined || longitude === undefined || radio === undefined) {
      res.status(400).json({ error: 'Faltan campos: nombre, latitude, longitude, radio' });
      return;
    }

    const newParadero = await createParadero({ nombre, latitude, longitude, radio });
    res.status(201).json(newParadero);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export const updateParaderoController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const paraderoId = parseInt(id, 10);

    if (isNaN(paraderoId)) {
      res.status(400).json({ error: 'El parámetro ID debe ser numérico' });
      return;
    }

    const { nombre, latitude, longitude, radio } = req.body;
    const updatedParadero = await updateParadero(paraderoId, { nombre, latitude, longitude, radio });

    res.json(updatedParadero);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export const deleteParaderoController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const paraderoId = parseInt(id, 10);

    if (isNaN(paraderoId)) {
      res.status(400).json({ error: 'El parámetro ID debe ser numérico' });
      return;
    }

    await deleteParadero(paraderoId);
    res.json({ message: 'Paradero eliminado correctamente' });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};
