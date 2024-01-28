import { useLocation } from "react-router-dom"
import React, { useEffect, useState } from "react";
import { HandThumbUpIcon, HandThumbDownIcon, ChatBubbleLeftIcon, ShareIcon, BookmarkIcon, EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useDispatch, useSelector } from "react-redux";
import { increment, selectCount, decrement } from "./State/Counter/CounterSlice";
import { getCommunity, getUser, getPost } from "./services/communityService";
import { getUserData } from "./State/Counter/AuthUser";
import moment from 'moment';
import { Link } from "react-router-dom";
import subreddit from "../assets/subreddit.png"
import LikeDislike123 from "./LikeDislikeComponent";
import { useNavigate } from "react-router-dom";
import CommunityInfoCard from "./Community/CommunityInfoCard";

function CommentSection(params) {

    const loggedUser = useSelector(getUserData)
    const location = useLocation()
    const navigate = useNavigate()

    const [CommunityData, setCommunityData] = useState(null)
    const [UserData, setUserData] = useState(null)
    const [PostData, setPostData] = useState(null)

    useEffect(() => {
        if (location.state) {
            const { from } = location.state
            setPostData(from)
            getCommunity(from.community_id).then((response) => setCommunityData(response))
            setUserData({username: from.username})
        } else {
            const post_id = location.pathname.split('/')[2]
            getPost(post_id).then((response) => {
                setPostData(response)
                getCommunity(response.community_id).then((response) => setCommunityData(response))
                getUser(response.user_id).then((response) => setUserData(response))
            })          
        }
    }, [location])

    let title = PostData?.title
    let description = PostData?.description
    let date_created = moment(PostData?.date_created).fromNow()

    const LikeDislikeInfo1 = {
        post_id: PostData?.id,
        user_id: loggedUser.id,
        likes: PostData?.likes,
        dislikes: PostData?.dislikes,
        isLogged: loggedUser.isLogged,
        like_id: 2
    }

    const LikeDislikeInfo2 = {
        post_id: PostData?.id,
        user_id: loggedUser.id,
        likes: PostData?.likes,
        dislikes: PostData?.dislikes,
        isLogged: loggedUser.isLogged,
        like_id: 3
    }

    return (
        <div className="mt-14">
            <div className="flex flex-row items-center justify-between mb-12">
                <div className="flex flex-row gap-5 w-9/12">
                     <div className=" flex flex-row gap-2 items-center">
                        {PostData && <LikeDislike123 info={LikeDislikeInfo1}/>}
                     </div>        
                    {(UserData != null && PostData != null) && <p className="line-clamp-1 font-semibold text-lg">{UserData.username} | {title}</p>}  
                </div>
                <button onClick={() => navigate(-1)} className="flex flex-row h-10 items-center justify-center border-transparent rounded-full bg-transparent hover:bg-neutral-800">
                    <XMarkIcon className="w-8 h-8"/>
                    <p>Close</p>
                </button>
            </div>
            <div className="flex flex-row gap-7">
                <div className="flex flex-row py-6 px-3 w-full lg:w-9/12 items-start bg-neutral-900 rounded-md border border-neutral-700">

                    <div className=" flex flex-col items-center gap-1">
                         {PostData && <LikeDislike123 info={LikeDislikeInfo2}/>}           
                    </div>
                
                    <div className="flex flex-col mr-12 gap-3 items-start w-full">
                       <div className="flex flex-row gap-3 items-center mx-3 text-neutral-500">                           
                            {(CommunityData != null) && <Link className="flex flex-row items-center gap-2 text-inherit hover:text-neutral-400" to={`/reddit/r/${CommunityData.id}`}>
                                <img src={subreddit} alt="" className="w-7 h-7" />
                                r/{CommunityData.name}
                                </Link>}
                            {(UserData != null) && <p className="text-inherit">Posted by {UserData.username}</p>}
                            <p className="text-inherit">{date_created}</p>
                        </div>
                        <p className=" text-2xl font-semibold mx-3">{title}</p>
                        <img className="rounded-md pl-3" alt="" />
                        <p className="text-left text-lg font-medium mx-3 mb-5">{description}</p>
                        <div className="flex flex-row gap-1 mx-3 mb-5">
                            <div className='flex flex-row font-semibold items-center px-3 gap-2 bg-transparent border-transparent'>
                                <ChatBubbleLeftIcon className="w-6 h-6" />
                                <p>0</p>
                                <p>Comments</p>
                            </div>
                            <button className='flex flex-row items-center gap-3 rounded-none bg-transparent hover:bg-neutral-800 border-transparent'>
                                <ShareIcon className="w-6 h-6" />
                                <p>Share</p>
                            </button>
                            <button className='flex flex-row items-center gap-3 rounded-none bg-transparent hover:bg-neutral-800 border-transparent'>
                                <BookmarkIcon className="w-6 h-6" />
                                <p>Save</p>
                            </button>
                            <button className='bg-transparent hover:bg-neutral-800 rounded-none border-transparent'>
                                <EllipsisHorizontalIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 w-full mx-3">
                            <p className="text-start">Comment as  <a className="text-sky-500" href="">{loggedUser.username}</a></p>
                            <textarea className="w-full min-h-[17rem] bg-transparent border rounded-md border-neutral-700 text-base" />
                        </div>
                        
                    </div>
                </div>
                <div className="hidden lg:flex flex-col w-1/3 h-screen gap-7">
                    {CommunityData && (<CommunityInfoCard info={CommunityData}/>)}               
                </div>
            </div>
        </div>

    )
}

export default CommentSection