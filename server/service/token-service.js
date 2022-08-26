import jwt from 'jsonwebtoken';

import TokenModel from '../models/token-model.js';

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: '30s',
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
            expiresIn: '30d',
        });
        return { accessToken, refreshToken };
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }
    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({ refreshToken });
        return tokenData;
    }
    async saveRefreshToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            const res = await tokenData.save();
            return res;
        }
        const token = await TokenModel.create({ user: userId, refreshToken });
        return token;
    }
    async removeToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({ refreshToken });
        return tokenData;
    }
}

export default new TokenService();
