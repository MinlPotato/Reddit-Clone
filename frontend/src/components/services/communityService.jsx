import axios from "axios";



export let getCommunity = async (id) => (
    await axios.get(`http://127.0.0.1:8000/api/communities/${id}`)
        .then(async function (response) {
            const data = response.data
            return data
        })
        .catch(function (error) {
            console.log(error);
        }))

export let getCommunities = async () => (
    await axios.get(`http://127.0.0.1:8000/api/communities/`)
        .then(async function (response) {
            const data = response.data
            return data
        })
        .catch(function (error) {
            console.log(error);
        }))


export let getPostByCommunity = async (id, sort) => (
    await axios.get(`http://127.0.0.1:8000/api/communities/${id}/posts/?ordering=${sort}`)
        .then(async function (response) {
            const data = response.data
            return data
        })
        .catch(function (error) {
            console.log(error);
        }))

export let getUser = async (id) => (
    await axios.get(`http://127.0.0.1:8000/api/users/${id}`)
        .then(async function (response) {
            const data = response.data
            return data
        })
        .catch(function (error) {
            console.log(error);
        }))

export let getPost = async (id) => (
    await axios.get(`http://127.0.0.1:8000/api/posts/${id}`)
        .then(async function (response) {
            const data = response.data
            return data
        })
        .catch(function (error) {
            console.log(error);
        }))

