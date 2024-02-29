import LikeDislike123 from "../LikeDislikeComponent"
import { useSelector } from "react-redux"
import { getUserData } from "../State/Slices/AuthUser"
import { Link } from "react-router-dom"
import moment from "moment"
import { ArrowsPointingOutIcon, ArrowsPointingInIcon, ChatBubbleLeftIcon, BookmarkIcon, EllipsisHorizontalIcon, DocumentIcon, LinkIcon } from "@heroicons/react/24/outline"
import { useState, useEffect } from "react"
import DOMPurify from "dompurify"
import { getSaved, deleteSaved, publishSaved } from "../services/voteService"

function ClassicCard(params) {

    const loggedUser = useSelector(getUserData)
    const infoCard = params.info

    const description = DOMPurify.sanitize(infoCard.description)

    const [OpenCard, setOpenCard] = useState(false)
    const [Saved, setSaved] = useState(false)

    const LikeDislikeInfo = {
        post_id: infoCard.id,
        user_id: loggedUser.id,
        likes: infoCard.likes,
        dislikes: infoCard.dislikes,
        isLogged: loggedUser.isLogged,
        like_id: 1
    }

    useEffect(() => {
        if (loggedUser.isLogged) {
            getSaved({ post_id: infoCard.id, user_id: loggedUser.id }).then((response) => setSaved(response))
        }
    }, [])

    const handleSave = () => {
        if (Saved) {
            deleteSaved({ post_id: infoCard.id, user_id: loggedUser.id }).then(() => setSaved(false))
        } else {
            publishSaved({ post_id: infoCard.id, user_id: loggedUser.id }).then(() => setSaved(true))
        }
    }

    return (
        <div className="w-full bg-neutral-900 border border-neutral-700 hover:border-neutral-500">
            <div className="flex flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 m-3">
                    <LikeDislike123 info={LikeDislikeInfo} />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex flex-row gap-3 items-center justify-between">
                        {infoCard.image ? (
                            <div className="relative flex">
                                <img src={`http://127.0.0.1:8000/${infoCard.image}`} alt="" className="hidden sm:block min-w-[9rem] max-w-[9rem] h-[6rem] rounded-lg object-cover" />
                                 {(infoCard.spoiler || infoCard.nsfw ) && <div className="absolute h-full w-full bg-white/30 backdrop-blur-lg rounded-md"></div>}
                            </div>
                            
                        ) : (
                            <div className="hidden sm:flex justify-center items-center min-w-[9rem] max-w-[9rem] h-[6rem] rounded-lg bg-neutral-800">
                                <DocumentIcon className="w-8 h-8 stroke-neutral-600" />
                            </div>
                        )}
                        <div className=" flex flex-col gap-2 justify-between py-2 w-full h-full">
                            <div className="flex flex-col items-start gap-1">
                                <div className="flex flex-row gap-2 items-center">
                                    <p className="text-sm text-start lg:text-xl font-semibold">{infoCard.title}</p>
                                    {infoCard.spoiler && <div className="border border-neutral-500 px-2 rounded-sm"><p>spoiler</p></div>}
                                    {infoCard.nsfw && <div className="border border-red-500 px-2 rounded-sm"><p className="text-red-500">nsfw</p></div>}
                                </div> 
                                <div className="flex flex-row flex-wrap text-start gap-2 items-center">
                                    <Link className="text-xs lg:text-base text-neutral-500 hover:text-neutral-400 hover:underline">r/{infoCard.community_name}</Link>
                                    <p className="text-neutral-500 text-xs">•</p>
                                    <p className="text-xs lg:text-base text-neutral-500">Posted by <Link className="hover:text-neutral-400 hover:underline">{infoCard.username}</Link></p>
                                    <p className="text-neutral-500 text-xs">•</p>
                                    <p className="text-xs lg:text-base text-neutral-500">{moment(infoCard.date_created).fromNow()}</p>
                                </div>
                            </div>

                            <div className="flex flex-row  w-full h-1/3">
                                <button onClick={() => OpenCard ? setOpenCard(false) : setOpenCard(true)} className='p-3 m-0 flex items-center justify-center border-none rounded-none bg-transparent hover:bg-neutral-800'>
                                    {OpenCard ? <ArrowsPointingInIcon className="w-6 stroke-neutral-500" /> : <ArrowsPointingOutIcon className="w-6 stroke-neutral-500" />}
                                </button>
                                <div className="my-2 mx-1 border-r border-neutral-600"></div>
                                <Link onClick={(e) => e.stopPropagation()} to={`/reddit/${infoCard.id}`} state={{ from: infoCard }} className='hidden sm:flex flex-row items-center px-3 gap-2 bg-transparent hover:bg-neutral-800 border-transparent'>
                                    <ChatBubbleLeftIcon className="w-5 lg:w-6 stroke-neutral-500" />
                                    <p className="text-sm lg:text-base text-neutral-500">{infoCard.comments}</p>
                                    <p className="text-sm lg:text-base text-neutral-500">Comments</p>
                                </Link>
                                <button onClick={handleSave} className='hidden sm:flex flex-row items-center gap-3 rounded-none bg-transparent hover:bg-neutral-800 border-transparent'>
                                    {Saved ? <BookmarkIcon className="w-6 h-6 fill-neutral-200" /> : <BookmarkIcon className="w-6 h-6 stroke-neutral-500" />}
                                    <p className="text-sm lg:text-base text-neutral-500">Save</p>
                                </button>
                                <button className='bg-transparent hover:bg-neutral-800 rounded-none border-transparent'>
                                    <EllipsisHorizontalIcon className="w-5 h-5 lg:w-6 lg:h-6 stroke-neutral-500" />
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className={OpenCard ? "flex flex-col text-start mb-4" : "hidden"}>
                        {infoCard.image &&
                            <div className="flex justify-center w-full">
                                <img src={`http://127.0.0.1:8000/${infoCard.image}`} alt="" className="max-h-[40rem] w-fit" />
                            </div>
                        }

                        {infoCard.description && <div dangerouslySetInnerHTML={{ __html: description }} className="text-start my-1 text-lg font-semibold "></div>}

                        {infoCard.link && 
                        <div className="flex flex-row items-center w-1/2">
                            <a href={infoCard.link} rel="noreferrer" target="_blank" className="hover:underline text-blue-500 line-clamp-1 w-1/2">{infoCard.link}</a>
                            <div><LinkIcon className="w-4 h-4 stroke-blue-500" /></div>
                        </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassicCard