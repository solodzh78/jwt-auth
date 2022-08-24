import { body } from 'express-validator';

export const registration = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 и не длиннее 32 символов').isLength({ min: 3, max: 32 }),
];