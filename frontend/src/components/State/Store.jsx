import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Counter/CounterSlice"
import AuthUserReducer from "./Counter/AuthUser"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        authUser: AuthUserReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

store.subscribe(() => console.log(store))

export default store;