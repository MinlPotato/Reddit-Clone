import { createSlice } from "@reduxjs/toolkit"
import Posts from "../../../assets/posts"

const initialState = {
    value: Posts,
    liked: [],
    disliked: []
}

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state, action) => {
            
            let post = state.value.find((post) => post.id === action.payload)

            if (state.disliked.includes(action.payload)) {
                post.likes += 1
                const index = state.disliked.indexOf(action.payload);
                state.disliked.splice(index, 1);
            }
            
            if (state.liked.includes(action.payload)) {
                post.likes -= 1
                const index = state.liked.indexOf(action.payload);
                state.liked.splice(index, 1);
            } else {
                post.likes += 1
                state.liked.push(action.payload)
            }
            
            
        },
        decrement: (state, action) => {
            let post = state.value.find((post) => post.id === action.payload)

            if (state.liked.includes(action.payload)) {
                post.likes -= 1
                const index = state.liked.indexOf(action.payload);
                state.liked.splice(index, 1);
            }
            
            if (state.disliked.includes(action.payload)) {
                post.likes += 1
                const index = state.disliked.indexOf(action.payload);
                state.disliked.splice(index, 1);
            } else {
                post.likes -= 1
                state.disliked.push(action.payload)
            }
        }
    }
})

export const { increment, decrement } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;


export default counterSlice.reducer;