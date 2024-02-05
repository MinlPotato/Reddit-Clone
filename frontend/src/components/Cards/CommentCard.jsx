import { useEffect, useState } from 'react'
import profilePic from '../../assets/profile_pic.jpg'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { getCommentsByComment, publishComment } from '../services/communityService'
import { ArrowsPointingOutIcon, ChatBubbleLeftIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import LikeDislike123 from '../LikeDislikeComponent'
import { getUserData } from '../State/Counter/AuthUser'
import { useSelector } from 'react-redux'
import DOMPurify from 'dompurify';
import QuillTextArea from '../QuillTextArea'

function CommentCard(params) {

    const infoCard = params.info
    const loggedUser = useSelector(getUserData)

    const [Hide, setHide] = useState(false)
    const [Reply, setReply] = useState(false)
    const [Comments, setComments] = useState(null)
    const [TextAreaValue, setTextAreaValue] = useState('')

    const [DisableCommentSubmit, setDisableCommentSubmit] = useState(true)
    const [loading, setLoading] = useState(false)

    const description = DOMPurify.sanitize(infoCard.description)

    useEffect(() => {
        getCommentsByComment(infoCard.id).then((resposne) => setComments(resposne))
    }, [])

    useEffect(() => {
        if (TextAreaValue.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
            setDisableCommentSubmit(true)
        } else {
            setDisableCommentSubmit(false)
        }
    }, [TextAreaValue])

    const LikeInfo = {
        comment_id: infoCard.id,
        user_id: loggedUser.id,
        likes: infoCard.likes,
        dislikes: infoCard.dislikes,
        isLogged: loggedUser.isLogged,
        like_id: 1
    }

    const QuillTextAreaInfo = {
        value: TextAreaValue,
        setValue: setTextAreaValue,
        placeholder: 'What are your thoughts?'
    }

        const handleSubmit = async () => {
        if (!DisableCommentSubmit) {

            const data = {
                description: TextAreaValue,
                user_id: loggedUser.id,
                post_id: infoCard.post_id,
                parent_comment: infoCard.id
            }

            setDisableCommentSubmit(true)
            setLoading(true)
            
            publishComment(data)

            window.location.reload(false);
        }
    }

    return Hide == false ? (
        <>
            <div className='grid grid-cols-12'>
                <div className='flex flex-col items-center justify-center col-span-1 row-span-6'>
                    <img src={profilePic} alt="" className='rounded-full w-10 h-10' />
                    <div onClick={() => setHide(true)} className='group flex justify-center h-full w-full'>
                        <div className='w-[2px] rounded-full bg-neutral-700 group-hover:bg-neutral-400'></div>
                    </div>
                </div>
                <div className='flex flex-row items-center gap-2 col-span-11 '>
                    <Link to={`/reddit/user/${infoCard.user_id}`} className='font-semibold'>{infoCard.username}</Link>
                    <p className='text-neutral-500'>·</p>
                    <p className='text-neutral-500'>{moment(infoCard.date_created).fromNow()}</p>
                </div>
                <div className='col-span-11'>
                    <div dangerouslySetInnerHTML={{ __html: description }} className='text-start text-neutral-300 text-lg whitespace-pre-line'></div>
                </div>
                <div className="mt-3 flex flex-row gap-2 items-center col-span-11">
                    <LikeDislike123 info={LikeInfo} />
                    <div className='flex flex-row'>
                        <button onClick={() => { Reply ? (setReply(false)) : (setReply(true)) }} className='p-2 flex flex-row font-semibold items-center px-3 gap-2 
                    rounded-none bg-transparent border-transparent 
                    hover:bg-neutral-800 text-neutral-500 hover:text-white stroke-neutral-500 hover:stroke-white'>
                            <ChatBubbleLeftIcon className="w-6 h-6 stroke-inherit" />
                            <p className='text-inherit'>Reply</p>
                        </button>
                        <button className='p-2 bg-transparent hover:bg-neutral-800 rounded-none border-transparent text-neutral-500 hover:text-white'>
                            <p className='text-inherit'>Share</p>
                        </button>
                        <button className='p-2 bg-transparent hover:bg-neutral-800 rounded-none border-transparent stroke-neutral-500 hover:stroke-white'>
                            <EllipsisHorizontalIcon className="w-6 h-6 stroke-inherit" />
                        </button>
                    </div>

                </div>

                {Reply && (
                    <div className='col-span-11'>
                        <QuillTextArea info={QuillTextAreaInfo} />
                        <div className='mt-2 flex justify-end'>
                            <button disabled={DisableCommentSubmit} onClick={handleSubmit}
                                className="rounded-full w-1/5 p-2 bg-white disabled:bg-neutral-200 text-neutral-800 disabled:text-neutral-500">
                                {loading ? <p className="text-black">loading...</p> : <p className="text-inherit font-semibold text-base">Comment</p>}
                            </button>
                        </div>

                    </div>

                )}

                {Comments ? (
                    Comments.map((Comment) => (
                        <div key={Comment.id} className="-ml-5 mt-5 w-full col-span-11">
                            <CommentCard info={Comment} />
                        </div>
                    ))
                ) : (
                    <p>loading...</p>
                )}
            </div>

        </>
    ) : (
        <>
            <div className='flex flex-row gap-2 ml-4'>
                <div className='flex gap-2 justify-center'>
                    <button onClick={() => setHide(false)} className='m-0 p-0 border-none bg-none'><ArrowsPointingOutIcon className='w-6 stroke-sky-500' /></button>
                    <img src={profilePic} alt="" className='rounded-full w-10 h-10' />
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <Link to={`/reddit/user/${infoCard.id}`} className='font-semibold'>{infoCard.username}</Link>
                    <p className='text-neutral-500'>·</p>
                    <p className='text-neutral-500'>{moment(infoCard.date_created).fromNow()}</p>
                </div>
            </div>
        </>
    )
}

export default CommentCard