import { configureStore } from "@reduxjs/toolkit";
import AuthUserReducer from "./Slices/AuthUser"
import PostCacheReducer from "./Slices/PostsSlice"
import CommunitySliceReducer from "./Slices/CommunitySlice";

export const store = configureStore({
    reducer: {
        authUser: AuthUserReducer,
        postsCache: PostCacheReducer,
        communitiesCache: CommunitySliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

//store.subscribe(() => console.log(store))

export default store;