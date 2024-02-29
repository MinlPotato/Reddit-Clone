import { useEffect, useState } from "react"
import { getUserSaved } from "../services/profileServices"
import { getUser } from "../services/communityService"
import { useSelector } from "react-redux"
import UserCard from "./UserCard"
import { getUserData } from "../State/Slices/AuthUser"
import ClassicCard from "../Cards/ClassicCard"
import { useNavigate } from "react-router-dom"

function ProfileSaved() {

    const loggedUser = useSelector(getUserData)
    const navigate = useNavigate()

    const [PostsSaved, setPostsSaved] = useState(null)
    const [UserData, setUserData] = useState(null)


    useEffect(() => {
        const user_id = location.pathname.split('/')[3]

        if (loggedUser.isLogged == false || loggedUser.id != user_id) {
            navigate(`/reddit/user/${user_id}`)
        }

        getUserSaved(loggedUser.id).then((response) => setPostsSaved(response))
        getUser(user_id).then((response) => setUserData(response))
    }, [])


    return (
        <div className="absolute left-0 right-0 top-40 sm:mx-10">
            <div className="flex flex-row justify-center w-full gap-7">
                <div className="flex flex-col w-full xl:w-3/4 gap-7">
                    <div className="">
                        {(PostsSaved != null) ? (
                            PostsSaved.length == 0 ? (
                                <p className="text-xl font-semibold">{`hmm... looks like you haven't saved anything yet`}</p>
                            ) : (
                                PostsSaved.map((Post) => (
                                    <div  key={Post.id}>
                                        <ClassicCard info={Post} />
                                    </div>
                                ))
                            )
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
                <div className="hidden xl:flex flex-col w-1/4 gap-7">
                    {UserData && <UserCard info={UserData} />}
                </div>
            </div>
        </div>
    )
}

export default ProfileSaved