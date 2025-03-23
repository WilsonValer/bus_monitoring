// src/routes/auth.routes.ts
import { Router } from 'express';
import { loginController, registerController } from '../controllers/auth.controller';
import { Request, Response } from 'express';

const router = Router();


router.post('/login', loginController);
router.post('/register', registerController); // Opcional, si deseas permitir registro

export default router;
