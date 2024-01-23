import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {common} from "./utils";
import {redirect} from "react-router-dom";

export const getEvents = createAsyncThunk('eventsList/getEvents',
    async () => {
    try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                authorization: `Bearer ${token}`
            },
        }

        let res = await axios.get(`${common.baseUrl}api/v1/events/user/${user.id}`, config);
        return res.data.data;
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

const EventsSlice = createSlice({
    name: 'eventsList', initialState: {
        value: [], isLoading: false, hasError: false,hasRun: false
    }, reducers: {}, extraReducers: (builder) => {
        builder
            .addCase(getEvents.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.hasRun = true;
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.value = action.payload;
                state.isLoading = false;
                state.hasError = false
                state.hasRun = true;
            })
            .addCase(getEvents.rejected, (state) => {
                state.hasError = true
                state.isLoading = false;
                state.hasRun = true;
            })
    }
})
export const selectEvents = state => state.eventsList.value;
export const selectLoadingState = state => state.eventsList.isLoading;
export const selectErrorState = state => state.eventsList.hasError;
export const selectFullState = state => state.eventsList;

export default EventsSlice.reducer