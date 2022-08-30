import { FC, useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { login, registration } from '../redux/slice';

const LoginForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();

    const onClickLoginHandler = () => {
        dispatch(login({email, password}))
    }
    const onClickRegistrationHandler = () => {
        dispatch(registration({email, password}));
    }

    return (
        <div>
            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                name="email"
                id="email"
                placeholder="Email"
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
            />
            <button onClick={onClickLoginHandler}>Логин</button>
            <button onClick={onClickRegistrationHandler}>Регистрация</button>
        </div>
    );
};

export default LoginForm;
