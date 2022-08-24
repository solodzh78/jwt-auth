import { validationResult } from 'express-validator';

import userService from '../service/user-service.js';
import ApiError from '../exeptions/api-error.js';

class UserController {
    async registration (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка валидации', errors.array()))
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async login (req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async logout (req, res, next) {
        try {
            
        } catch (e) {
            next(e);
        }
    }
    async activation (req, res, next) {
        try {
            const activationUid = req.params.link;
            await userService.activation(activationUid);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }
    async refresh (req, res, next) {
        try {
            
        } catch (e) {
            next(e);
        }
    }
    async getUsers (req, res, next) {
        try {
            res.json(['123', '456'])
        } catch (e) {
            next(e);
        }
    }

}

export default new UserController;