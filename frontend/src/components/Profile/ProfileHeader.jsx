import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getUserData } from "../State/Slices/AuthUser";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function ProfileHeader() {

    const location = useLocation()
    const loggedUser = useSelector(getUserData)
    const navigate = useNavigate()

    const [isLoggedUser, setisLoggedUser] = useState(false)

    const user_id = location.pathname.split('/')[3]

    useEffect(() => {
        if (loggedUser.id == user_id) {
            setisLoggedUser(true)
        }
    })

    let postsURL = `/reddit/user/${user_id}/posts`
    let commentsURL = `/reddit/user/${user_id}/comments`
    let upvotedURL = `/reddit/user/${user_id}/upvoted`
    let downvotedURL = `/reddit/user/${user_id}/downvoted`
    let savedURL = `/reddit/user/${user_id}/saved`

    return (
        <>
            <div className="absolute top-16 right-0 left-0 w-full h-14 border-b-[1px] border-neutral-700 bg-neutral-900">
                <div className="flex flex-row justify-center h-full">
                    <div className="flex flex-row justify-evenly flex-wrap gap-1 sm:gap-5 lg:gap-0 lg:justify-normal mx-3 w-[78.5rem]">
                        <div>
                            <input defaultChecked onClick={() => navigate(postsURL)} type="radio" name="header" id="posts" className="peer hidden" />
                            <label htmlFor="posts" className="lg:px-6 h-full w-full flex items-center peer-checked:border-b-4 border-neutral-200 border-0 bg-transparent rounded-none hover:border-b-4">
                                <p className="text-sm sm:text-lg font-semibold">POSTS</p>
                            </label>
                        </div>

                        <div>
                            <input onClick={() => { navigate(commentsURL) }} type="radio" name="header" id="comments" className="peer hidden" />
                            <label htmlFor="comments" className="lg:px-6 h-full w-full flex items-center peer-checked:border-b-4 border-neutral-200 border-0 bg-transparent rounded-none hover:border-b-4">
                                <p className="text-sm sm:text-lg font-semibold">COMMENTS</p>
                            </label>
                        </div>
                        {isLoggedUser ? (
                            <>  
                                <div>
                                    <input onClick={() => { navigate(savedURL) }} type="radio" name="header" id="saved" className="peer hidden" />
                                    <label htmlFor="saved" className="lg:px-6 h-full w-full flex items-center peer-checked:border-b-4 border-neutral-200 border-0 bg-transparent rounded-none hover:border-b-4">
                                        <p className="text-sm sm:text-lg font-semibold">SAVED</p>
                                    </label>
                                </div>
                                <div>
                                    <input onClick={() => { navigate(upvotedURL) }} type="radio" name="header" id="upvoted" className="peer hidden" />
                                    <label htmlFor="upvoted" className="lg:px-6 h-full w-full flex items-center peer-checked:border-b-4 border-neutral-200 border-0 bg-transparent rounded-none hover:border-b-4">
                                        <p className="text-sm sm:text-lg font-semibold">UPVOTED</p>
                                    </label>
                                </div>
                                <div>
                                    <input onClick={() => { navigate(downvotedURL) }} type="radio" name="header" id="downvoted" className="peer hidden" />
                                    <label htmlFor="downvoted" className="lg:px-6 h-full w-full flex items-center peer-checked:border-b-4 border-neutral-200 border-0 bg-transparent rounded-none hover:border-b-4">
                                        <p className="text-sm sm:text-lg font-semibold">DOWNVOTED</p>
                                    </label>
                                </div>
                            </>
                        ) : <></>}


                    </div>

                </div>
            </div>
        </>
    )
}

export default ProfileHeader