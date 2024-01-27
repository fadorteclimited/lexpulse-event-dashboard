import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {common} from "./utils";
import {redirect} from "react-router-dom";

export const getDashboardItems = createAsyncThunk('dashboardStats/get',
    async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    authorization: `Bearer ${token}`
                },
            }

            let res = await axios.get(`${common.baseUrl}api/v1/stats`, config);
            console.log(res)
            return res.data
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
    name: 'dashboardSlice',
    initialState: {}
})