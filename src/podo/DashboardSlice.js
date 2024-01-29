import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {common} from "./utils";
import {redirect} from "react-router-dom";

export const getDashboardItems = createAsyncThunk('dashboardStats/get',
    async () => {
        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            const config = {
                headers: {
                    authorization: `Bearer ${token}`
                },
            }

            let res = await axios.get(`${common.baseUrl}api/v1/stats/user/${user.id}`, config);
            console.log(res)
            return res.data.data
        } catch (error) {
            if (error.response.status === 403){
                localStorage.clear();
                redirect('/login');
            }
            return {
                status: error.response.status,
                statusText: error.response.statusText,
                message: error.response.data.toString()
            };
        }
    })

const DashboardSlice = createSlice({
    name: 'dashboardStats',
    initialState: {
        value: {},
        isLoading: false,
        hasError: false,
    },
    extraReducers: builder => {
        builder.addCase(getDashboardItems.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.hasRun = true;
        }).addCase(getDashboardItems.fulfilled, (state, action) => {
            state.value = action.payload;
            state.isLoading = false;
            state.hasError = false
        }).addCase(getDashboardItems.rejected, (state) => {
                state.hasError = true
                state.isLoading = false;

            })
    }
})

export const selectDashboardStats = state => state.dashboardStats.value;
export const selectDashLoadingState = state => state.dashboardStats.isLoading;
export const selectDashErrorState = state => state.dashboardStats.hasError;
export const selectDashFullState = state => state.dashboardStats;
export default DashboardSlice.reducer