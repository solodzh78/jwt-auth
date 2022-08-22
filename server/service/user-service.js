import bcrypt from 'bcrypt';
import uuid from 'uuid';

import UserModel from '../models/user-model.js';
import mailService from './mail-service.js';
import tokenService from './token-service.js';
import UserDTO from '../dtos/user-dto.js';


class UserService {
    async registration (email, password) {
        const candidate = UserModel.findOne({ email });
        if (candidate) {
            throw new Error(`Пользователь с адрессом ${email} уже существует`);
        }

        const actiationLink = uuid.v4();
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({ email, hashPassword });
        await mailService.sendActivationMail(email, actiationLink);

        const userDTO = new UserDTO(user); // email, id, isActivated
        const tokens = tokenService.generateTokens({ ...userDTO });
        
        tokenService.saveRefreshToken(userDTO.id, tokens.refreshToken);
    }
}

export default new UserService; 