import {createSlice} from "@reduxjs/toolkit";


const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoading: false,
        user: JSON.parse(localStorage.getItem('user')),
        token: localStorage.getItem('token'),
        email: (localStorage.getItem('user') === null)? '' : JSON.parse(localStorage.getItem('user')).email,
    },
    reducers: {
        setLoading: (state, action) => {state.isLoading = action.payload},
        setEmail: (state, action) => {state.email = action.payload}
    }
});

export const selectLoadingState = state => state.login.isLoading;
export const selectEmail = state => state.login.email;
export const {setLoading,setEmail} = LoginSlice.actions

export default LoginSlice.reducer