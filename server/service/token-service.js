import jwt from 'jsonwebtoken';

import TokenModel from '../models/token-model.js';

class TokenService {
    generateTokens (payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
        return {accessToken, refreshToken};
    }
    async saveRefreshToken (userId, refreshToken) {
        const tokenData = await TokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return refreshToken.save();
        }
        const token = await TokenModel.create({user: userId, refreshToken});
        return token;
    }
}

export default new TokenService();
