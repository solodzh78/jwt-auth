import bcrypt from 'bcrypt';
import {v4 as uuidv4 } from 'uuid';

import UserModel from '../models/user-model.js';
import mailService from './mail-service.js';
import tokenService from './token-service.js';
import UserDTO from '../dtos/user-dto.js';
import ApiError from '../exeptions/api-error.js';


class UserService {
    async makeAuthSuccessResponce(user) {
        const userDTO = new UserDTO(user); // email, id, isActivated
        const tokens = tokenService.generateTokens({ ...userDTO });
        await tokenService.saveRefreshToken(userDTO.id, tokens.refreshToken);
        return { ...tokens, user: userDTO };
    }    
    async registration(email, password) {
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

        const res = await this.makeAuthSuccessResponce(user);
        return res;
    }
    async activation(activationUid) {
        const user = await UserModel.findOne({ activationUid });
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }
    async login(email, password) {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const res = await this.makeAuthSuccessResponce(user);
        return res;
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }    
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFormDB = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFormDB) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);

        const res = await this.makeAuthSuccessResponce(user);
        return res;
    }
    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }
}

export default new UserService(); 