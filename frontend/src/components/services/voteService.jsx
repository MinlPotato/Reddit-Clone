import axios from "axios";

export const handleFeedback = async (data) => {
    const user_id = data.user_id
    const type = data.type
    const post_id = data.post_id

    await axios.get(`http://127.0.0.1:8000/api/posts/${post_id}/feedbacks/${user_id}/`)
        .then(async (response) => {
            if (response.data === false) {
                await axios.post("http://127.0.0.1:8000/api/posts/feedback/", {
                    user_id,
                    type,
                    post_id
                }).catch(function (error) {
                    console.log(error);
            });
            } else {
                await axios.put(`http://127.0.0.1:8000/api/posts/${post_id}/feedbacks/${user_id}/`, {
                    user_id,
                    type,
                    post_id
                });
            }
        })
}

export let getFeedback = async (data) => (
    await axios.get(`http://127.0.0.1:8000/api/posts/${data.post_id}/feedbacks/${data.user_id}/`)
        .then(async function (response) {
            const data = response.data
            if (data == false) {
                return null
            }

            if (data.type == 'L') {
                return true
            } else {
                return false
            }
        })
        .catch(function (error) {
            console.log(error);
        }))


export const deleteFeedback = async (data) => {
    const user_id = data.user_id
    const post_id = data.post_id

    await axios.delete(`http://127.0.0.1:8000/api/posts/${post_id}/feedbacks/${user_id}/`)  
}
