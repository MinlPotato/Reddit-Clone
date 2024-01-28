
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChatBubbleLeftIcon, ShareIcon, BookmarkIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./State/Counter/AuthUser";
import moment from 'moment';
import { getCommunity, getUser } from "./services/communityService";
import LikeDislike123 from "./LikeDislikeComponent";

function Card(params) {

    const loggedUser = useSelector(getUserData)
    const dispatch = useDispatch()

    const infoCard = params.info

    let title = infoCard.title
    let description = infoCard.description
    let id = infoCard.id
    let community_id = infoCard.community_id
    let post_user_id = infoCard.user_id
    let date_created = moment(infoCard.date_created).fromNow()
    let community_name = infoCard.community_name
    let username = infoCard.username

    const LikeDislikeInfo = {
        post_id: id,
        user_id: loggedUser.id,
        likes: infoCard.likes,
        dislikes: infoCard.dislikes,
        isLogged: loggedUser.isLogged,
        like_id: 1
    }

    return (
        <div className="flex flex-row py-2 items-start p-3 w-full
            bg-neutral-900 rounded-md border border-neutral-700 hover:border-neutral-400 transition">

            <div className="flex flex-col items-center mt-1 gap-1">
                <LikeDislike123 info={LikeDislikeInfo}/>
            </div>
            
            <div className="flex flex-col  gap-2 items-start w-full">
                <div className="flex flex-row gap-5 mx-3 text-neutral-500">
                    <Link className="text-inherit hover:text-neutral-400" to={`r/${community_id}`}>r/{community_name}</Link>
                     <p className="text-inherit">Posted by u/{username}</p>
                    <p className="text-inherit">{date_created}</p>
                </div>
                <p className="text-2xl text-start font-semibold mx-3 mb-1 w-full">{title}</p>
                <p className="text-xl w-full font-semibold text-neutral-500 mx-3 text-start line-clamp-1">{description}</p>

                <div className="flex flex-row gap-1">
                    <Link to={`/reddit/${id}`} state={{ from: infoCard }} className='flex flex-row items-center px-3 gap-2 bg-transparent hover:bg-neutral-800 border-transparent'>
                        <ChatBubbleLeftIcon className="w-6 h-6" />
                        <p>0</p>
                        <p>Comments</p>
                    </Link>
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
            </div>
        </div>


    )
}

export default Card