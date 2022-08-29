import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models/IUser';
import AuthService from '../servises/AuthService';
import { AuthResponse } from '../models/response/AuthResponse';

export interface UserState {
    user: IUser;
    isAuth: boolean;
}

export const initialState: UserState = {
    user: {} as IUser,
    isAuth: false,
};

export const login = createAsyncThunk<AuthResponse, {email: string; password: string;}>(
    'user/login',
    // Declare the type your function argument here:
    async (user) => {
        const response = await AuthService.login(user.email, user.password);
        console.log('response.data: ', response.data);
        return response.data;
    },
);
export const registration = createAsyncThunk<AuthResponse, {email: string; password: string;}>(
    'user/registration',
    // Declare the type your function argument here:
    async (user) => {
        const response = await AuthService.registration(user.email, user.password);
        console.log('response.data: ', response.data);
        return response.data;
    },
);
export const logout = createAsyncThunk(
    'user/logout',
    // Declare the type your function argument here:
    async () => {
        const response = await AuthService.logout();
        console.log('response: ', response);
    },
);
export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    // Declare the type your function argument here:
    async () => {
        const response = await AuthService.checkAuth();
        console.log('response: ', response);
        return response.data;
    },
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth: (state, { payload }: PayloadAction<{ isAuth: boolean }>) => {
            state.isAuth = payload.isAuth;
        },
        setUser: (state, { payload }: PayloadAction<{ user: IUser }>) => {
            state.user = payload.user;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, { payload }) => {
            localStorage.setItem('accessToken', payload.accessToken);
            state.user = payload.user;
            state.isAuth = true;
        });
        builder.addCase(login.rejected, (state, action) => {
            console.log('error');
        });
        builder.addCase(registration.fulfilled, (state, { payload }) => {
            localStorage.setItem('accessToken', payload.accessToken);
            state.user = payload.user;
            state.isAuth = true;
        });
        builder.addCase(registration.rejected, (state, action) => {
            console.log('error');
        });
        builder.addCase(logout.fulfilled, (state) => {
            localStorage.removeItem('accessToken');
            state.user = {} as IUser;
            state.isAuth = false;
        });
        builder.addCase(logout.rejected, (state, action) => {
            console.log('error');
        });
        builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
            localStorage.setItem('accessToken', payload.accessToken);
            state.user = payload.user;
            state.isAuth = true;
        });
        builder.addCase(checkAuth.rejected, (state, action) => {
            console.log('error');
        });
    },
});

// Action creators are generated for each case reducer function
export const { setAuth, setUser } = userSlice.actions;

export default userSlice.reducer;
