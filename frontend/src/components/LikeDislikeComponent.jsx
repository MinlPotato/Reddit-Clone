import { useEffect, useState } from "react";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/outline"
import { deleteFeedback, handleFeedback, getFeedback } from "./services/voteService";
import { useSelector } from "react-redux";
import { getUserData } from "./State/Slices/AuthUser";

function LikeDislike123(params) {

    const info = params.info
    const userData = useSelector(getUserData)

    const [votes, setVotes] = useState(info.likes - info.dislikes || 0)

    const [likeChecked, setLikeChecked] = useState(false)
    const [dislikeChecked, setDislikeChecked] = useState(false)

    const like_name = `like${info.post_id || info.comment_id}${info.like_id}`
    const dislike_name = `dislike${info.post_id || info.comment_id}${info.like_id}`

    const handleCheck = async (e) => {
        let data = {
            type: e.target.value,
            user_id: info.user_id,
            post_id: info.post_id || '',
            comment_id: info.comment_id || ''
        }

        if (e.target.checked === true) {
            if (e.target.id === like_name) {
                setDislikeChecked(false)
                setLikeChecked(true)
            } else if (e.target.id === dislike_name) {
                setLikeChecked(false)
                setDislikeChecked(true)
            }
            handleFeedback(data).then(() => e.target.value === 'L' ? setVotes(votes + 1) : setVotes(votes - 1))
        } else {
            setLikeChecked(false)
            setDislikeChecked(false)
            deleteFeedback(data).then(() => e.target.value === 'L' ? setVotes(votes - 1) : setVotes(votes + 1))
        }
    }

    useEffect(() => {
        if (userData.isLogged) {

            const data = {
                user_id: info.user_id, 
                post_id: params.info.post_id || '',
                comment_id: params.info.comment_id || ''
            }

            getFeedback(data)
            .then((response) => response == true ? setLikeChecked(true) : response == false ? setDislikeChecked(true) : "")

        }

       
    }, [info])

    return info.isLogged ? (
        <>
            <div>
                <input onChange={handleCheck} checked={likeChecked} name={like_name} id={like_name} type="checkbox" value="L" className="hidden peer" />
                <label htmlFor={like_name} className="flex items-center justify-center stroke-white peer-checked:stroke-blue-500 hover:stroke-blue-500">
                    <HandThumbUpIcon className="w-6 h-6 stroke-inherit" />
                </label>
            </div>
            <p className="font-bold">{votes}</p>
            <div>
                <input onChange={handleCheck} checked={dislikeChecked} name={dislike_name} id={dislike_name} type="checkbox" value="D" className="hidden peer" />
                <label htmlFor={dislike_name} className="flex items-center justify-center stroke-white peer-checked:stroke-red-500 hover:stroke-red-500">
                    <HandThumbDownIcon className="w-6 h-6 stroke-inherit" />
                </label>
            </div>
        </>

    ) : (
        <div className="flex flex-col gap-2  mt-1">
            <HandThumbUpIcon className="w-6 h-6" />
            <p className="font-bold">{votes}</p>
            <HandThumbDownIcon className="w-6 h-6" />
        </div>
    )


}

export default LikeDislike123