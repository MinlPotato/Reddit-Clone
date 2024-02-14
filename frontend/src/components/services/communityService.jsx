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
        })
)


export let publishCommunity = async (data) => {
    const name = data.community_name
    const description = data.community_description
    await axios.post(`http://127.0.0.1:8000/api/communities/publish/`, {
        name,
        description
    }).then(async function (response) {
        const data = response.data
        return data
    }).catch(function (error) {
        console.log(error);
    })
};


export let getCommunitiesJoinedByUser = async (id) => (
    await axios.get(`http://127.0.0.1:8000/api/users/${id}/member`)
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


export let getMember = async (data) => (
    await axios.get(`http://127.0.0.1:8000/api/communities/${data.community_id}/members/${data.user_id}/`)
        .then(async function (response) {
            if (response.data) {
                return true
            } else {
                return false
            }
        })
        .catch(function (error) {
            console.log(error);
        }))


export let joinMember = async (data) => {
    const community_id = data.community_id
    const user_id = data.user_id

    await axios.post(`http://127.0.0.1:8000/api/communities/${community_id}/members/`, {
        community_id,
        user_id
    }).catch(function (error) {
        console.log(error);
    })
}


export let leaveMember = async (data) => {
    const community_id = data.community_id
    const user_id = data.user_id

    await axios.delete(`http://127.0.0.1:8000/api/communities/${community_id}/members/${user_id}/`)
}