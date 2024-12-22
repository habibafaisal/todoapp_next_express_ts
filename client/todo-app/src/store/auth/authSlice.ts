import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: any;
    userId: any;
}

const initialState: AuthState = {
    token: '',
    userId: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ token: string; userId: string }>) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
        logout: (state) => {
            state.token = '';
            state.userId = '';
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
