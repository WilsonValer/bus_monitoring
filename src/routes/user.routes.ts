// src/routes/user.routes.ts
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getAllUsersController, getUserByIdController } from '../controllers/user.controller';

const router = Router();

// Opcional: proteger con authMiddleware si deseas que sólo admins logueados vean la lista
router.get('/', authMiddleware, getAllUsersController);
router.get('/:id', authMiddleware, getUserByIdController);

export default router;
