import bcrypt from 'bcrypt';
import {v4 as uuidv4 } from 'uuid';

import UserModel from '../models/user-model.js';
import mailService from './mail-service.js';
import tokenService from './token-service.js';
import UserDTO from '../dtos/user-dto.js';
import ApiError from '../exeptions/api-error.js';


class UserService {
    async registration (email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с адрессом ${email} уже существует`);
        }

        const activationUid = uuidv4();
        const activationLink = `${process.env.API_URL}${process.env.API_LINK}/activate/${activationUid}`;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await UserModel.create({ email, activationUid, password: hashPassword });
        await mailService.sendActivationMail(email, activationLink);

        const userDTO = new UserDTO(user); // email, id, isActivated
        const tokens = tokenService.generateTokens({ ...userDTO });
        
        await tokenService.saveRefreshToken(userDTO.id, tokens.refreshToken);

        return { ...tokens, user: userDTO}
    }
    async activation (activationUid) {
        const user = await UserModel.findOne({activationUid});
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }
}

export default new UserService(); 