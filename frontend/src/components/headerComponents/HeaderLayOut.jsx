import { Outlet } from 'react-router-dom';
import Header from './Header';
import { login, logout, updateToken } from '../State/Slices/AuthUser';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HeaderLayout() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [AuthToken] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)



    useEffect(() => {
        const updateTokenF = async () => {
            let refresh = JSON.parse(localStorage.getItem('authTokens')).refresh
            await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
                refresh,
            }).then((response) => {
                dispatch(updateToken(response.data))
            }).catch(() => {
                dispatch(logout())
                navigate('/')
            })
        }

        const interval = setInterval(() => {
            if (AuthToken) {
                updateTokenF()
            }
        }, 1.2e+6);
        return () => clearInterval(interval)
    }, [AuthToken]);


    if (localStorage.getItem('authTokens')) {
        const tokens = JSON.parse(localStorage.getItem('authTokens'))
        dispatch(login(tokens))
    }

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default HeaderLayout