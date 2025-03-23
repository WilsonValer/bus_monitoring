// src/controllers/user.controller.ts
import { Request, Response, NextFunction } from 'express';
import { getAllUsers, getUserById } from '../services/user.service';

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.json(users);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      res.status(400).json({ error: 'El ID debe ser un número.' });
      return;
    }

    const user = await getUserById(numericId);
    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado.' });
      return;
    }

    res.json(user);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

