
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChatBubbleLeftIcon, ShareIcon, BookmarkIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import { useSelector } from "react-redux";
import { getUserData } from "./State/Counter/AuthUser";
import moment from 'moment';
import LikeDislike123 from "./LikeDislikeComponent";
import DOMPurify from 'dompurify';
import { deleteSaved, getSaved, publishSaved } from "./services/voteService";

function Card(params) {

    const loggedUser = useSelector(getUserData)

    const infoCard = params.info

    let title = infoCard.title
    let description = DOMPurify.sanitize(infoCard.description) 
    let id = infoCard.id
    let community_id = infoCard.community_id
    let user_id = infoCard.user_id
    let date_created = moment(infoCard.date_created).fromNow()
    let community_name = infoCard.community_name
    let username = infoCard.username
    let image = infoCard.image
    let comments = infoCard.comments

    const LikeDislikeInfo = {
        post_id: id,
        user_id: loggedUser.id,
        likes: infoCard.likes,
        dislikes: infoCard.dislikes,
        isLogged: loggedUser.isLogged,
        like_id: 1
    }

    const [Saved, setSaved] = useState(false)

    useEffect(() => {
        if (loggedUser.isLogged) {
             getSaved({post_id: id  , user_id: loggedUser.id}).then((response) => setSaved(response))
        }
    }, [])

    const handleSave = () => {
        if (Saved) {
            deleteSaved({post_id: id  , user_id: loggedUser.id}).then(() => setSaved(false))
        } else {
            publishSaved({post_id: id  , user_id: loggedUser.id}).then(() => setSaved(true))
        }
    }
    
    //onClick={() => navigate(`/reddit/${id}`)}

    return (
        <div className="flex flex-row py-2 items-start pl-3 w-full
            bg-neutral-900 rounded-md border border-neutral-700 hover:border-neutral-400 transition">

            <div className="flex flex-col items-center mt-1 gap-1">
                <LikeDislike123 info={LikeDislikeInfo}/>
            </div>
            
            <div className="flex flex-col gap-3 mx-3 items-start w-full ">
                <div className="flex flex-row flex- gap-5 text-neutral-500 md:text-base text-xs">
                    <Link onClick={(e) => e.stopPropagation()} className="text-inherit hover:text-neutral-400 hover:underline" to={`r/${community_id}`}>r/{community_name}</Link>
                    <p className="text-inherit ">Posted by <Link onClick={(e) => e.stopPropagation()} to={`/reddit/user/${user_id}`} className="hover:text-neutral-400 hover:underline">u/{username}</Link></p>
                    <p className="text-inherit hidden sm:block">{date_created}</p>
                </div>
                <p className="md:text-2xl text-base text-start font-semibold mb-1 w-full">{title}</p>
                {image 
                ? (<div className="flex w-full justify-center"><img src={image} alt="" className="max-h-[40rem] object-cover"/> </div>   )
                : <div dangerouslySetInnerHTML={{__html: description}} className="text-base md:text-xl w-full font-semibold text-neutral-500 text-start line-clamp-3"></div>
                }
                

                <div className="flex flex-row gap-6">
                    <Link onClick={(e) => e.stopPropagation()} to={`/reddit/${id}`} state={{ from: infoCard }} className='flex flex-row items-center gap-2 bg-transparent hover:bg-neutral-800 border-transparent'>
                        <ChatBubbleLeftIcon className="w-6 h-6" />
                        <p>{comments}</p>
                        <p>Comments</p>
                    </Link>
                    <button className='p-0 hidden sm:flex flex-row items-center gap-3 rounded-none bg-transparent hover:bg-neutral-800 border-transparent'>
                        <ShareIcon className="w-6 h-6" />
                        <p>Share</p>
                    </button>
                    <button onClick={handleSave} className='p-0 hidden sm:flex flex-row items-center gap-3 rounded-none bg-transparent hover:bg-neutral-800 border-transparent'>
                        {Saved ? <BookmarkIcon className="w-6 h-6 fill-white" /> :  <BookmarkIcon className="w-6 h-6 " />}
                       
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