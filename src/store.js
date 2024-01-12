
import { configureStore } from '@reduxjs/toolkit'
import EventsReducer from "./podo/EventsSlice";
import SingleEventReducer from "./podo/SingleEventSlice";


export const store = configureStore({
    reducer: {
        eventsList: EventsReducer,
        singleEvent: SingleEventReducer
    },
})