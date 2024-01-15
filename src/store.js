
import { configureStore } from '@reduxjs/toolkit'
import EventsReducer from "./podo/EventsSlice";
import SingleEventReducer from "./podo/SingleEventSlice";
import NotificationsReducer from "./podo/NotificationsSlice";

export const store = configureStore({
    reducer: {
        eventsList: EventsReducer,
        singleEvent: SingleEventReducer,
        notificationList: NotificationsReducer
    },
})