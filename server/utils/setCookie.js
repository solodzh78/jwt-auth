import { timeConvertor } from '../utils/timeConvertor.js';

export const setCookie = (res, userData) => {
    res.cookie('refreshToken', userData.refreshToken, {
        maxAge: timeConvertor(process.env.JWT_REFRESH_TOKEN_LIFETIME),
        httpOnly: true,
    });
}