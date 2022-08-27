import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models/IUser';
import AuthService from '../servises/AuthService';
import { AuthResponse } from '../models/response/AuthResponse';

export interface UserState {
    user: IUser | null;
    isAuth: boolean;
}

const initialState: UserState = {
    user: null,
    isAuth: false,
};

const login = createAsyncThunk<AuthResponse, {email: string; password: string;}>(
    'user/login',
    // Declare the type your function argument here:
    async (user) => {
        const response = await AuthService.login(user.email, user.password);
        localStorage.setItem('accessToken', response.data.accessToken)
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
            state.user = payload.user;
            state.isAuth = true;
        });
        builder.addCase(login.rejected, (state, action) => {
            console.log('error');
        });
    },
});

// Action creators are generated for each case reducer function
export const { setAuth, setUser } = userSlice.actions;

export default userSlice.reducer;
