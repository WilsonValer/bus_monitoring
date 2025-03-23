// src/routes/paraderos.routes.ts
import { Router } from 'express';
import {
  getParaderosController,
  getParaderoByIdController,
  createParaderoController,
  updateParaderoController,
  deleteParaderoController,
} from '../controllers/paradero.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// GET /api/paraderos  (obtiene todos los paraderos)
router.get('/', authMiddleware, getParaderosController);

// GET /api/paraderos/:id (obtiene un paradero por su ID)
router.get('/:id', authMiddleware, getParaderoByIdController);

// POST /api/paraderos (crea un nuevo paradero)
router.post('/', authMiddleware, createParaderoController);

// PUT /api/paraderos/:id (actualiza un paradero existente)
router.put('/:id', authMiddleware, updateParaderoController);

// DELETE /api/paraderos/:id (elimina un paradero)
router.delete('/:id', authMiddleware, deleteParaderoController);

export default router;
