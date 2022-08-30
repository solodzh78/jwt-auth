import { FC, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkAuth, logout } from './redux/slice';

const App: FC = () => {
    const dispatch = useAppDispatch();
    const {isAuth, isLoading, user} = useAppSelector((state) => state.user);
    const onClickLogoutHandler = () => {
        dispatch(logout());
    }

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(checkAuth());
        }
    }, [dispatch])

    if (isLoading) return <div>Загрузка...</div>
    if (!isAuth) return <LoginForm/>
    
    return (
        <div>
            <h1>{isAuth ? `Ползователь авторизован ${user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
            <button onClick={onClickLogoutHandler}>Выйти</button>
        </div>
    );
};

export default App;
