import {createSlice} from "@reduxjs/toolkit";


const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoading: false,
        user: {},
        token: '',
        email: '',
        code: '',
    },
    reducers: {
        setLoading: (state, action) => {state.isLoading = action.payload}
    }
});

export const selectLoadingState = state => state.login.isLoading;
export const selectEmail = state => state.login.email;
export const {setLoading} = LoginSlice.actions

export default LoginSlice.reducer