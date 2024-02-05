import axios from "axios";



export let getCommunity = async (id) => (
    await axios.get(`http://127.0.0.1:8000/api/communities/${id}/`)
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
    await axios.get(`http://127.0.0.1:8000/api/users/${id}/`)
        .then(async function (response) {
            const data = response.data
            return data
        })
        .catch(function (error) {
            console.log(error);
        }))

export let getPost = async (id) => (
    await axios.get(`http://127.0.0.1:8000/api/posts/${id}/`)
        .then(async function (response) {
            const data = response.data
            return data
        })
        .catch(function (error) {
            console.log(error);
        }))

export let getCommentsByPost = async (id) => (
    await axios.get(`http://127.0.0.1:8000/api/posts/${id}/comments`)
        .then(async function (response) {
            const data = response.data
            return data
        })
        .catch(function (error) {
            console.log(error);
        }))

export let getCommentsByComment = async (id) => (
    await axios.get(`http://127.0.0.1:8000/api/comments/${id}`)
        .then(async function (response) {
            const data = response.data
            return data
        })
        .catch(function (error) {
            console.log(error);
        }))


export const publishComment = async (data) => {
    const description = data.description
    const user_id = data.user_id
    const post_id = data.post_id
    const parent_comment = data.parent_comment || null
    await axios.post(`http://127.0.0.1:8000/api/comments/publish/`, {
        description,
        user_id,
        post_id,
        parent_comment
        
    }).catch(function (error) {
            console.log(error);
    })
};