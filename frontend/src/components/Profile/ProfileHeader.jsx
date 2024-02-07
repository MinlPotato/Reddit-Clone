import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getUserData } from "../State/Counter/AuthUser";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function ProfileHeader() {

    const location = useLocation()
    const loggedUser = useSelector(getUserData)

    const [isLoggedUser, setisLoggedUser] = useState(false)

    const user_id = location.pathname.split('/')[3]
    console.log(user_id);
    console.log(loggedUser.id);

    useEffect(() => {
        if (loggedUser.id == user_id){
            setisLoggedUser(true)
        }
    })
    

    let overviewURL = `/reddit/user/${user_id}`
    let upvotedURL = `/reddit/user/${user_id}/upvoted`
    let downvotedURL = `/reddit/user/${user_id}/downvoted`

    return (
        <>
            <div className="absolute top-16 right-0 left-0 w-full h-14 border-b-[1px] border-neutral-700 bg-neutral-900">
                <div className="flex flex-row justify-center h-full">
                    <div className="flex flex-row mx-3 w-[78.5rem]">
                        <Link to={overviewURL} className="px-3 flex items-center border-neutral-200 border-0 bg-transparent rounded-none hover:border-b-4">
                            <p className="text-lg font-semibold">OVERVIEW</p>
                        </Link>
                        <button className=" border-neutral-200 border-0 bg-transparent rounded-none hover:border-b-4">
                            <p className="text-lg font-semibold">POSTS</p>
                        </button>
                        <button className=" border-neutral-200 border-0 bg-transparent rounded-none hover:border-b-4">
                            <p className="text-lg font-semibold">COMMENTS</p>
                        </button>
                        {isLoggedUser ? (
                            <>
                                <Link to={upvotedURL} className="px-3 flex items-center border-neutral-200 border-0 bg-transparent rounded-none hover:border-b-4">
                                    <p className="text-lg font-semibold">UPVOTED</p>
                                </Link>
                                <Link to={downvotedURL} className="px-3 flex items-center border-neutral-200 border-0 bg-transparent rounded-none hover:border-b-4">
                                    <p className="text-lg font-semibold">DOWNVOTED</p>
                                </Link>
                            </>
                        ) : <></>}


                    </div>

                </div>
            </div>
        </>
    )
}

export default ProfileHeader