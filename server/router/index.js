import { Router } from 'express';
import { validator } from '../validations/index.js';
import userController from '../controllers/user-controller.js';
import authMiddleware from '../middleware/auth-middleware.js';

const router = Router();

router.post('/registration', validator.registration, userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.get('/activate/:link', userController.activation);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

export default router;

