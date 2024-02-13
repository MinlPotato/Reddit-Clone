import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    seed: Math.floor(Math.random() * 100),
    start: 0,
    limit: 3,
    posts: [],
    recent: []
}

const PostSlice = createSlice({
    name: "postCache",
    initialState,
    reducers: {
        cachePosts(state, action) {
            state.posts = [...state.posts, ...action.payload]
            state.start = state.limit
            state.limit = state.limit + 3
        },
        recentPosts(state, action) {
            if (state.recent.length == 5) {
                state.recent.shift()
            }
            for (let index = 0; index < state.recent.length; index++) {
                if (state.recent[index].id == action.payload.id) {
                    state.recent.splice(index, 1)
                }          
            }
            state.recent.push(action.payload)
        },
        resetRecentPosts(state) {
            state.recent.splice(0, state.recent.length);
        }
    }
})

export const { cachePosts, recentPosts, resetRecentPosts } = PostSlice.actions

export const getPostsCached = (state) => state.postsCache

export default PostSlice.reducer;