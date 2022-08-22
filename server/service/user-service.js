import bcrypt from 'bcrypt';
import {v4 as uuidv4 } from 'uuid';

import UserModel from '../models/user-model.js';
import mailService from './mail-service.js';
import tokenService from './token-service.js';
import UserDTO from '../dtos/user-dto.js';


class UserService {
    async registration (email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw new Error(`Пользователь с адрессом ${email} уже существует`);
        }

        const activationLink = uuidv4();
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await UserModel.create({ email, activationLink, password: hashPassword });
        await mailService.sendActivationMail(email, activationLink);

        const userDTO = new UserDTO(user); // email, id, isActivated
        const tokens = tokenService.generateTokens({ ...userDTO });
        
        await tokenService.saveRefreshToken(userDTO.id, tokens.refreshToken);

        return { ...tokens, user: userDTO}
    }
}

export default new UserService(); 