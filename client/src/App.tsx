import { FC, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import { IUser } from './models/IUser';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkAuth, logout } from './redux/slice';
import UserService from './services/UserService';

const App: FC = () => {

    const [users, setUsers] = useState<IUser[]>([]);
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

    const getUsers = async () => {
        try {
            const response = await UserService.getUsers();
            console.log('response: ', response);
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    if (isLoading) return <div>Загрузка...</div>
    if (!isAuth) return <LoginForm/>
    
    return (
        <div>
            <h1>{isAuth ? `Пользователь авторизован ${user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
            <h1>{user.isActivated ? `Аккаунт активирован` : 'Активируйте аккаунт'}</h1>
            <button onClick={onClickLogoutHandler}>Выйти</button>
            <button onClick={getUsers}>Получить список пользователей</button>
            {users.map(user => <div key={user.id}>{user.email}</div>)}
        </div>
    );
};

export default App;
