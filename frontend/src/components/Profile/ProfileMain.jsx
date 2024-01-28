import OrderCard from "../OrderCard"
import { getPostByUser } from "../services/profileServices"
import ProfileHeader from "./ProfileHeader"
import { useState, useEffect } from "react"
import Card from "../Card"
import SearchCardPost from "../Cards/SearchCardPost"
import UserCard from "./UserCard"
import { getUser } from "../services/communityService"

function ProfileMain(params) {



    const [UserPosts, setUserPosts] = useState(null)
    const [UserData, setUserData] = useState(null)

    useEffect(() => {
        const user_id = location.pathname.split('/')[3]
        getPostByUser(user_id).then((response) => setUserPosts(response))
        getUser(user_id).then((response) => setUserData(response))
    }, [])


    return (
        <>
            <ProfileHeader />
            <div className="h-screen mt-28">
                <div className="flex flex-row gap-9">
                    <div className="flex flex-col gap-9 w-2/3">
                        <OrderCard />
                        <div>
                            {(UserPosts != null) ? (
                                UserPosts.map((Post) => (
                                    <div key={Post.id}>
                                        <Card info={Post}></Card>
                                    </div>
                                ))
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                    <div className="w-1/3">
                        {UserData && <UserCard info={UserData}/>} 
                    </div>
                    
                </div>

            </div>

        </>

    )
}

export default ProfileMain