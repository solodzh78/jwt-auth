import React, { FC, useState } from 'react';

const LoginForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                name="email"
                id="email"
                placeholder='Email'
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                name="password"
                id="password"
                placeholder='Пароль'
            />
            <button>Логин</button>
            <button>Регистрация</button>
        </div>
    );
};

export default LoginForm;
