import { createSlice } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
    username: null,
    id: null,
    authTokens: {
        refresh: null,
        access: null
    },
    isLogged: false
}

const AuthSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        login(state, action) {
            const data = jwtDecode(action.payload.refresh)
            state.authTokens.refresh = action.payload.refresh
            state.authTokens.access = action.payload.access
            state.username = data.username
            state.id = data.user_id
            state.isLogged = true
            localStorage.setItem('authTokens', JSON.stringify(action.payload))
        },
        logout(state, action) {
            state.authTokens.refresh = null
            state.authTokens.access = null
            state.username = null
            state.id = null
            state.isLogged = false
            localStorage.removeItem('authTokens')
        },
        updateToken(state, action) {
            const data = jwtDecode(action.payload.refresh)
            state.authTokens.refresh = action.payload.refresh
            state.authTokens.access = action.payload.access
            state.username = data.username
            state.id = data.user_id
            localStorage.setItem('authTokens', JSON.stringify(action.payload))
        },
    }
})

export const { login, logout, updateToken } = AuthSlice.actions

export const getUserData = (state) => state.authUser

export default AuthSlice.reducer;