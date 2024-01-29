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