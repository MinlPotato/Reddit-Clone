import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    joinedCommunities : []
}

const CommunitiesSlice = createSlice({
    name: "communitiesCache",
    initialState,
    reducers: {
        addCommunities(state, action) {
            state.joinedCommunities = [...action.payload]
        },
        addNewCommunity(state, action) {
            state.joinedCommunities.push(action.payload)
        },
        leaveCommunity(state, action) {
            for (let index = 0; index < state.joinedCommunities.length; index++) {
                if (state.joinedCommunities[index].id == action.payload.id) {
                    state.joinedCommunities.splice(index, 1)
                }
            }
        }

    }
})

export const { addCommunities, addNewCommunity, leaveCommunity } = CommunitiesSlice.actions

export const getCommunitiesCached = (state) => state.communitiesCache

export default CommunitiesSlice.reducer;