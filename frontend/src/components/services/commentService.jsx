import axios from "axios";

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
    await axios.get(`http://127.0.0.1:8000/api/comments/${id}/comments`)
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