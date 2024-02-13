import { configureStore } from "@reduxjs/toolkit";
import AuthUserReducer from "./Counter/AuthUser"
import PostCacheReducer from "./Counter/PostsSlice"

export const store = configureStore({
    reducer: {
        authUser: AuthUserReducer,
        postsCache: PostCacheReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

store.subscribe(() => console.log(store))

export default store;