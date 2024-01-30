import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {common} from "../../podo/utils";

export async function requestCode (email)  {

        const raw = JSON.stringify({
            email: email,
        });
        const config = {
            headers: {
                'content-type': 'application/json'
            },
            data: raw
        }
        let res = await axios.get(`${common.baseUrl}api/v1/auth/reset-password}`,config);
        return res.data;
}
const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoading: false,
        user: JSON.parse(localStorage.getItem('user')),
        token: localStorage.getItem('token'),
        email: (localStorage.getItem('user') === null)? '' : JSON.parse(localStorage.getItem('user')).email,
        errorBlock: {
            show: false,
            message: '0'
        }
    },
    reducers: {
        setLoading: (state, action) => {state.isLoading = action.payload},
        setEmail: (state, action) => {state.email = action.payload},
        setErrorBlock: (state, action) => {state.errorBlock = action.payload},
        resetErrorBlock: (state) => {state.errorBlock = {
            show: false,
            message: '0'
        }},
    }
});


export const selectLoadingState = state => state.login.isLoading;
export const selectEmail = state => state.login.email;
export const selectErrorBlock = state => state.login.errorBlock;
export const {setLoading,setEmail,setErrorBlock,resetErrorBlock} = LoginSlice.actions

export default LoginSlice.reducer