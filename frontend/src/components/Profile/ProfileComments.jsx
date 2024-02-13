import { getUserComments } from "../services/profileServices"
import { useState, useEffect } from "react"
import UserCard from "./UserCard"
import { getUser } from "../services/communityService"
import { useLocation } from "react-router-dom"
import ProfileCommentCard from "../Cards/ProfileCommentCard"

function ProfileComments() {

    const [UserComments, setUserComments] = useState(null)
    const [UserData, setUserData] = useState(null)

    const location = useLocation()

    const sortList = {
        Hot:'',
        New:'-date_created',
        Top:'-votes'
    }

    useEffect(() => {
        const user_id = location.pathname.split('/')[3]
        const queryParameters = new URLSearchParams(window.location.search)
        const sort = queryParameters.get("sort")
        const sortType = sortList[sort] || ''

        getUserComments(user_id).then((response) => setUserComments(response))
        getUser(user_id).then((response) => setUserData(response))
    }, [location])


    return (
        <>
        <div className="absolute left-0 right-0 top-40 sm:mx-10">
            <div className="flex flex-row justify-center w-full gap-7">
                <div className="flex flex-col w-full lg:w-3/4 gap-3">
                    
                        {(UserComments != null) ? (
                            UserComments.length == 0 ? (
                                <p className="text-xl font-semibold">hmm... looks like you haven't commented anything yet</p>
                            ) : (
                                UserComments.map((comment) => (
                                    <div  key={comment.id}>
                                        <ProfileCommentCard info={comment} />
                                    </div>
                                ))
                            )
                        ) : (
                            <p>Loading...</p>
                        )}
                   
                </div>
                <div className="hidden xl:flex flex-col w-1/4 gap-7">
                    {UserData && <UserCard info={UserData} />}
                </div>
            </div>
        </div>
        </>

            



    )
}

export default ProfileComments