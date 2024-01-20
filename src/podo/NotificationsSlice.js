import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {common} from "./utils";
import {redirect} from "react-router-dom";

export const getNotifications = createAsyncThunk('notificationList/get',
    async () => {

        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            const config = {
                headers: {
                    authorization: `Bearer ${token}`
                },
            }

            let res = await axios.get(`${common.baseUrl}api/v1/notifications/user/${user.id}`, config)
            return res.data.data;
        } catch (error) {
            console.log(error)
            if (error.response.status === 403){
                localStorage.clear();
                redirect('/login');
            }
            return [];
        }
    })

const NotificationsSlice = createSlice({
    name: 'notificationList', initialState: {
        value: [],
        isLoading: false,
        hasError: false,
        hasRun: false
    }, reducers: {}, extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.hasRun = true;
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.value = action.payload;
                state.isLoading = false;
                state.hasError = false
                state.hasRun = true;
            })
            .addCase(getNotifications.rejected, (state) => {
                state.hasError = true
                state.isLoading = false;
                state.hasRun = true;
            })
    }
})
export const selectNotifications = state => state.notificationList.value;
export const selectLoadingState = state => state.notificationList.isLoading;
export const selectErrorState = state => state.notificationList.hasError;
export const selectFullState = state => state.notificationList;

export default NotificationsSlice.reducer