import { configureStore } from "@reduxjs/toolkit";
import AuthUserReducer from "./Counter/AuthUser"

export const store = configureStore({
    reducer: {
        authUser: AuthUserReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

store.subscribe(() => console.log(store))

export default store;