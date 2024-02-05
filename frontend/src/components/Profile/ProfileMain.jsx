import OrderCard from "../OrderCard"
import { getPostByUser } from "../services/profileServices"
import ProfileHeader from "./ProfileHeader"
import { useState, useEffect } from "react"
import SearchCardPost from "../Cards/SearchCardPost"
import UserCard from "./UserCard"
import { getUser } from "../services/communityService"
import { useLocation } from "react-router-dom"

function ProfileMain(params) {

    const [UserPosts, setUserPosts] = useState(null)
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

        getPostByUser(user_id, sortType).then((response) => setUserPosts(response))
        getUser(user_id).then((response) => setUserData(response))
    }, [location])


    return (
        <>
        <div className="mt-28">
                     <div className="flex flex-row h-screen justify-center w-full gap-7">
                        <div className="flex flex-col lg:w-2/3 gap-7">
                            <OrderCard />
                            <div className="">
                                {(UserPosts != null) ? (
                                    UserPosts.map((Post) => (
                                        <div key={Post.id}>
                                            <SearchCardPost info={Post}></SearchCardPost>
                                        </div>
                                    ))
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                        </div>
                        <div className="hidden md:hidden lg:flex flex-col w-1/3 gap-7">
                            {UserData && <UserCard info={UserData} />}
                        </div>
                    </div>
            </div>
        </>

            



    )
}

export default ProfileMain