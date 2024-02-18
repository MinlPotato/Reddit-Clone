import OrderCard from "../OrderCard"
import { getPostByUser } from "../services/profileServices"
import { useState, useEffect } from "react"
import SearchCardPost from "../Cards/SearchCardPost"
import UserCard from "./UserCard"
import { getUser } from "../services/communityService"
import { useLocation } from "react-router-dom"

function ProfilePosts() {

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
        <div className="absolute left-0 right-0 top-40 sm:mx-10 xl:mx-52">
                     <div className="flex flex-row h-screen justify-center w-full gap-7">
                        <div className="flex flex-col w-full xl:w-2/3 gap-7">
                            <OrderCard />
                            <div className="">
                                {(UserPosts != null) ? (
                                    UserPosts.map((Post, index) => (
                                        <div className="border border-b-0 border-neutral-700" key={index}>
                                            <SearchCardPost info={Post}></SearchCardPost>
                                        </div>
                                    ))
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                        </div>
                        <div className="hidden xl:flex flex-col w-1/3 gap-7">
                            {UserData && <UserCard info={UserData} />}
                        </div>
                    </div>
            </div>
        </>

            



    )
}

export default ProfilePosts