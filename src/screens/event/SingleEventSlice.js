import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {common} from "../../podo/utils";
import {redirect} from "react-router-dom";


export const getEvent = createAsyncThunk('singleEvent/getEvent',
    async (id,{ rejectWithValue }) => {
    console.log('getting event: ', id)
        try {
            const token = localStorage.getItem('token');


            const config = {
                headers: {
                    authorization: `Bearer ${token}`
                },

            }


            let res = await axios.get(`${common.baseUrl}api/v1/events/${id}`, config)
            return res.data.data.event;
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

export const getTickets = createAsyncThunk('singleEvent/tickets',
    async (id) => {
    try {
        const token = localStorage.getItem('token');


        const config = {
            headers: {
                authorization: `Bearer ${token}`
            },

        }
        let res = await axios.get(`${common.baseUrl}api/v1/tickets/event/${id}`, config)
        return res.data.data
    } catch (error) {
        console.log(error)
        if (error.response.status === 403){
            localStorage.clear();
            redirect('/login');
        }

    }
    })
const SingleEventSlice = createSlice({
    name: 'singleEvent', initialState: {
        id: '',
        value: undefined,
        isLoading: false,
        hasError: false,
        tickets: undefined,
        ticketsError: false,
        ticketsLoading: false,
        users: []
    }, reducers: {
        updateId: (state, action) => {
            if (state.id !== action.payload){
                state.id = action.payload
                state.tickets = undefined;
            }
        },
        addUser: (state, action) => {
            state.users.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEvent.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;

            })
            .addCase(getEvent.fulfilled, (state, action) => {
                state.value = action.payload;
                state.isLoading = false;
                state.hasError = false

            })
            .addCase(getEvent.rejected, (state) => {
                state.hasError = true
                state.isLoading = false;
                state.value = undefined
            }).addCase(getTickets.pending, (state) => {
                state.ticketsLoading = true;
                state.ticketsError = false;
        })
            .addCase(getTickets.fulfilled, (state,action) => {
                state.tickets = action.payload;
                state.ticketsLoading = false;
                state.ticketsError = false;
            })
            .addCase(getTickets.rejected, (state) => {
                state.ticketsLoading = false;
                state.ticketsError = true;
            })
    }
})
export const selectEvent = state => state.singleEvent.value;
export const selectLoadingState = state => state.singleEvent.isLoading;
export const selectErrorState = state => state.singleEvent.hasError;
export const selectSingleState = state => state.singleEvent;
export const selectCurrentId = state => state.singleEvent.id;
export const selectTickets = state => state.singleEvent.tickets;
export const selectTicketsLoading = state => state.singleEvent.ticketsLoading;
export const selectTicketsError = state => state.singleEvent.ticketsError;
export const selectUsers = state => state.singleEvent.users;


export const {updateId,addUser} = SingleEventSlice.actions
export default SingleEventSlice.reducer