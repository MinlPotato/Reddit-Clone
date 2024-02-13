import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPost } from "../services/communityService"
import moment from "moment"
import DOMPurify from "dompurify"

function ProfileCommentCard(params) {

    const commentInfo = params.info

    const [PostData, setPostData] = useState(null)

    useEffect(() => {
        getPost(commentInfo.post_id).then((response) => { setPostData(response) })
    }, [commentInfo])

    return PostData ? (
        <>
            <div className="w-full flex flex-row items-center p-3 gap-5 text-start bg-neutral-900 border border-b-0 hover:border-b hover:border-neutral-400 border-neutral-700">
                <div className="w-5">
                    <ChatBubbleBottomCenterIcon className="w-7 stroke-neutral-500" />
                </div>
                <div className="flex flex-row flex-wrap gap-x-3 items-center">
                    <p className="font-semibold">{commentInfo.username}</p>

                    <p className="text-neutral-500">Commented on
                        <Link to={`/reddit/${PostData.id}`} className="text-lg font-semibold text-neutral-300"> {PostData.title}</Link>
                    </p>
                    <p className="text-lg text-neutral-500">·</p>
                    <Link to={`/reddit/r/${PostData.community_id}`} className="hover:underline">r/{PostData.community_name}</Link>
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-neutral-500">Posted by</p>
                        <Link to={`/reddit/user/${PostData.user_id}`} className="text-neutral-500  hover:underline">u/{PostData.username}</Link>
                    </div>
                </div>
            </div>
            <div className="w-full grid-template-col-comment gap-x-2 items-center px-3 text-start bg-neutral-900 border border-neutral-700 hover:border-neutral-400">
                
                <div className="py-2 h-full flex justify-center items-center">
                    <div className="border border-neutral-700 h-full border-dashed"></div>
                </div>   
                {commentInfo.parent_comment != null ? (
                <div className="py-2 h-full flex justify-center items-center">
                    <div className="border border-neutral-700 h-full border-dashed"></div>
                </div>
                ) : (
                    <div></div>
                )}
                <div className="flex flex-col gap-1 justify-between items-start py-3">
                    <div className="flex flex-row items-center gap-3">
                        <p className="font-semibold">{commentInfo.username}</p>
                        <p className="text-neutral-500">{commentInfo.votes} points</p>
                        <p className="text-neutral-500">·</p>
                        <p className="text-neutral-500">{moment(commentInfo.date_created).fromNow()}</p>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(commentInfo.description)}} className="text-lg font-semibold"></div>
                </div>
            </div>
        </>
    ) : (<></>)
}

export default ProfileCommentCard