import axios from "axios";

export let getPostByUser = async (id, sort) => (
    await axios.get(`http://127.0.0.1:8000/api/users/${id}/posts?ordering=${sort}`)
        .then(async function (response) {
            const data = response.data
            return data
        })
        .catch(function (error) {
            console.log(error);
        }))


export let getUserLiked = async (id) => (
    await axios.get(`http://127.0.0.1:8000/api/users/${id}/liked`)
        .then(async function (response) {
            const data = response.data
            return data
        })
        .catch(function (error) {
            console.log(error);
        }))

export let getUserDisliked = async (id) => (
    await axios.get(`http://127.0.0.1:8000/api/users/${id}/disliked`)
        .then(async function (response) {
            const data = response.data
            return data
        })
        .catch(function (error) {
            console.log(error);
        }))

export let getUserSaved = async (id) => (
    await axios.get(`http://127.0.0.1:8000/api/users/${id}/saved`)
        .then(async function (response) {
            const data = response.data
            return data
        })
        .catch(function (error) {
            console.log(error);
        }))
        

export let getUserComments = async (id) => (
    await axios.get(`http://127.0.0.1:8000/api/users/${id}/comments`)
        .then(async function (response) {
            const data = response.data
            return data
        })
        .catch(function (error) {
            console.log(error);
        }))