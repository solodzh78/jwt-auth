import { validationResult } from 'express-validator';

import userService from '../service/user-service.js';
import ApiError from '../exeptions/api-error.js';
import { responseDTO } from '../dtos/responseDTO.js';
import { setCookie } from '../utils/setCookie.js';

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка валидации', errors.array()))
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            setCookie(res, userData);
            return res.json(responseDTO(userData));
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            setCookie(res, userData);
            return res.json(responseDTO(userData));
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e)
        }
    }

    async activation(req, res, next) {
        try {
            const activationUid = req.params.link;
            await userService.activation(activationUid);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            setCookie(res, userData);
            return res.json(responseDTO(userData));

        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e)
        }
    }

}

export default new UserController;