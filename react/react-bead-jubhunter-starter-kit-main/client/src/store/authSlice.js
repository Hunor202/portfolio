import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
    let accessToken = null;
    let user = null;
    let role = null;

    try {
        accessToken = localStorage.getItem('accessToken') || null;
        user = JSON.parse(localStorage.getItem('user')) || null;
        try {
            user = JSON.parse(localStorage.getItem('user'));
        } catch (err) {
            user = null;
        }
        role = localStorage.getItem('role') || null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
    }

    return {
        accessToken,
        user,
        role,
    };
};


const authSlice = createSlice({
    initialState: getInitialState(),
    name: 'auth',
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.role = action.payload.role;
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('role', action.payload.role);
        },
        logout: (state) => {
            state.accessToken = null;
            state.user = null;
            state.role = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            localStorage.removeItem('role');
        },
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;