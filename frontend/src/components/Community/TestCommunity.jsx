import axios from "axios"

function TestCommunity(params) {

    let getCommunities = async (e) => (
        axios.get('http://127.0.0.1:8000/api/communities/1')
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            }))

    return (
        <>
            <button onClick={getCommunities}>
                get communities
            </button>
        </>
    )
}

export default TestCommunity