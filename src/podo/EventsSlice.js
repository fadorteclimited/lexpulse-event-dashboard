import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {Constants} from "./utils";

export const getEvents = createAsyncThunk('eventsList/getEvents',
    async () => {
    console.log('function run');
    try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                authorization: `Bearer ${token}`
            },
        }
        console.log(user)
        let res = await axios.get(`${Constants.baseUrl}api/v1/events/user/${user.id}`, config)
        return res.data.data;
    } catch (error) {
        console.log(error)
        return [];
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