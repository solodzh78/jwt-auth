import { FC, useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { login, registration } from '../redux/slice';
import SignIn from './SignIn';
import SignUp from './SignUp';

const LoginForm: FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const dispatch = useAppDispatch();

    const onClickLoginHandler = (email: string | null, password: string | null) => {
        if (email === null || password === null) return;dispatch(login({email, password}))
    }
    const onClickRegistrationHandler = (email: string | null, password: string | null) => {
        if (email === null || password === null) return;
        dispatch(registration({email, password}));
    }

    return isSignUp 
        ? <SignUp
            submitHandler = {onClickRegistrationHandler}
            setIsSignUp = {setIsSignUp}
        /> 
        : <SignIn
            submitHandler = {onClickLoginHandler}
            setIsSignUp = {setIsSignUp}
        />


//     return (
//         <div>
//             <input
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 type="text"
//                 name="email"
//                 id="email"
//                 placeholder="Email"
//             />
//             <input
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 type="password"
//                 name="password"
//                 id="password"
//                 placeholder="Пароль"
//             />
//             <button onClick={onClickLoginHandler}>Логин</button>
//             <button onClick={onClickRegistrationHandler}>Регистрация</button>
//         </div>
//     );
};

export default LoginForm;
