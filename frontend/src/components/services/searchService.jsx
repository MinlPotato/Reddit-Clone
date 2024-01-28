import axios from "axios";



export let getSearchPosts = async (value, order) => (
    await axios.get(`http://127.0.0.1:8000/api/posts/?search=${value}&ordering=${order}`)
        .then(async function (response) {
            const data = response.data
            return data
        })
        .catch(function (error) {
            console.log(error);
        }))

export let getSearchCommunities = async (value) => (
    await axios.get(`http://127.0.0.1:8000/api/communities/?search=${value}`)
        .then(async function (response) {
            const data = response.data
            return data
        })
        .catch(function (error) {
            console.log(error);
        }))