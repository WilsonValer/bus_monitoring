// src/controllers/auth.controller.ts
import { Request, Response, RequestHandler } from 'express';
import { loginService, registerService } from '../services/auth.service';

export const loginController: RequestHandler = async (req, res): Promise<void> =>  {
  const { username, password } = req.body;

  try {
    const { token, user } = await loginService(username, password);
    res.json({ token,user, });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}

export const registerController: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { username, password, client_id } = req.body;
    const user = await registerService(username, password, client_id);

    res.status(201).json({ message: 'Usuario creado', user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}




