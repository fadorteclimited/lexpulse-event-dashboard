import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {Constants} from "./utils";
import {redirect} from "react-router-dom";

export const getEvent = createAsyncThunk('singleEvent/getEvent',
    async (id,{ rejectWithValue }) => {
        console.log('function run');
        try {
            const token = localStorage.getItem('token');


            const config = {
                headers: {
                    authorization: `Bearer ${token}`
                },

            }


            let res = await axios.get(`${Constants.baseUrl}api/v1/events/${id}`, config)
            return res.data.data;
        } catch (error) {
            console.log(error)
            if (error.response.status === 403){
                localStorage.clear();
                redirect('/login');
            }
            return rejectWithValue({

            });
        }
    })

const SingleEventSlice = createSlice({
    name: 'singleEvent', initialState: {
        id: '',
        value: null,
        isLoading: false,
        hasError: false,

    }, reducers: {
        updateId: (state, action) => {
            state.id = action.payload
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(getEvent.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.value = null
            })
            .addCase(getEvent.fulfilled, (state, action) => {
                state.value = action.payload;
                state.id = action.payload._id;
                state.isLoading = false;
                state.hasError = false

            })
            .addCase(getEvent.rejected, (state) => {
                state.hasError = true
                state.isLoading = false;
                state.value = null
            })
    }
})
export const selectEvent = state => state.eventsList.value;
export const selectLoadingState = state => state.eventsList.isLoading;
export const selectErrorState = state => state.eventsList.hasError;
export const selectFullState = state => state.eventsList;
export const {updateId} = SingleEventSlice.actions
export default SingleEventSlice.reducer