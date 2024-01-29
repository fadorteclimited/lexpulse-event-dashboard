
import { configureStore } from '@reduxjs/toolkit'
import EventsReducer from "./podo/EventsSlice";
import SingleEventReducer from "./screens/event/SingleEventSlice";
import NotificationsReducer from "./podo/NotificationsSlice";
import LoginReducer from "./screens/login/LoginSlice"
import DashboardReducer from "./podo/DashboardSlice";

export const store = configureStore({
    reducer: {
        eventsList: EventsReducer,
        singleEvent: SingleEventReducer,
        notificationList: NotificationsReducer,
        login: LoginReducer,
        dashboardStats: DashboardReducer
    },
})