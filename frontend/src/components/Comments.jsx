import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { ChatBubbleLeftIcon, BookmarkIcon, EllipsisHorizontalIcon, XMarkIcon, ChatBubbleLeftRightIcon, LinkIcon } from "@heroicons/react/24/outline"
import { useSelector, useDispatch } from "react-redux";
import { getCommunity, getUser, getPost } from "./services/communityService";
import { getCommentsByPost, publishComment } from "./services/commentService"
import { getUserData } from "./State/Slices/AuthUser";
import moment from 'moment';
import { Link } from "react-router-dom";
import subreddit from "../assets/subreddit.png"
import LikeDislike123 from "./LikeDislikeComponent";
import { useNavigate } from "react-router-dom";
import CommunityInfoCard from "./Community/CommunityInfoCard";
import CommentCard from "./Cards/CommentCard";
import DOMPurify from 'dompurify';
import QuillTextArea from "./QuillTextArea";
import { getSaved, deleteSaved, publishSaved } from "./services/voteService";
import { recentPosts } from "./State/Slices/PostsSlice";
import SearchSortPanel from './SearchComponents/SearchSortPanel';

function CommentSection() {

    const loggedUser = useSelector(getUserData)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [CommunityData, setCommunityData] = useState(null)
    const [UserData, setUserData] = useState(null)
    const [PostData, setPostData] = useState(null)
    const [Comments, setComments] = useState(null)
    const [Saved, setSaved] = useState(false)

    const [TextAreaValue, setTextAreaValue] = useState('')
    const [DisableCommentSubmit, setDisableCommentSubmit] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const post_id = location.pathname.split('/')[2]
        window.scrollTo({ top: 0, left: 0 });

        getPost(post_id).then((response) => {
            setPostData(response)
            getCommunity(response.community_id).then((response) => setCommunityData(response))
            getUser(response.user_id).then((response) => setUserData(response))
            getSaved({ post_id: post_id, user_id: loggedUser.id }).then((response) => setSaved(response))
        })

    }, [])

    useEffect(() => {
        const post_id = location.pathname.split('/')[2]
        const queryParameters = new URLSearchParams(window.location.search)
        const sort = queryParameters.get("sort") || ""
        const date = queryParameters.get("date") || ""

        getCommentsByPost(post_id, sort, date).then((response) => setComments(response))
    }, [location])
    

    useEffect(() => {
        if (PostData != null) {
            dispatch(recentPosts(PostData))
        }
    }, [PostData])


    useEffect(() => {
        if (TextAreaValue.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
            setDisableCommentSubmit(true)
        } else {
            setDisableCommentSubmit(false)
        }
    }, [TextAreaValue])

    let title = PostData?.title
    let description = DOMPurify.sanitize(PostData?.description)
    let date_created = moment(PostData?.date_created).fromNow()
    let comments = PostData?.comments
    let user_id = PostData?.user_id
    let id = PostData?.id
    let image = PostData?.image
    let link = PostData?.link
    let spoiler = PostData?.spoiler
    let nsfw = PostData?.nsfw


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

    const QuillTextAreaInfo = {
        value: TextAreaValue,
        setValue: setTextAreaValue,
        placeholder: 'What are your thoughts?'
    }

    const handleSubmit = async () => {
        if (!DisableCommentSubmit) {

            console.log("a");
            

            const data = {
                description: TextAreaValue,
                user_id: loggedUser.id,
                post_id: id
            }

            setDisableCommentSubmit(true)
            setLoading(true)

            publishComment(data)

            window.location.reload(false);
        }
    }

    const handleSave = () => {
        if (Saved) {
            deleteSaved({ post_id: id, user_id: loggedUser.id }).then(() => setSaved(false))
        } else {
            publishSaved({ post_id: id, user_id: loggedUser.id }).then(() => setSaved(true))
        }
    }

    return (
        <>
            <div className="bg-[#0c0c0c] top-16 left-0 flex justify-center fixed h-14 w-full mb-12">

                <div className="flex flex-row w-2/3 items-center justify-between">
                    <div className="flex flex-row gap-5 w-9/12">
                        <div className=" flex flex-row gap-2 items-center">
                            {PostData && <LikeDislike123 info={LikeDislikeInfo1} />}
                        </div>
                        {(UserData != null && PostData != null) && <p className="line-clamp-1 font-semibold text-lg">{UserData.username} | {title}</p>}
                        {spoiler && <div className="border border-neutral-500 px-2 rounded-sm"><p>spoiler</p></div>}
                        {nsfw && <div className="border border-red-500 px-2 rounded-sm"><p className="text-red-500">nsfw</p></div>}
                    </div>
                    <button onClick={() => navigate(-1)} className="flex flex-row h-10 items-center justify-center border-transparent rounded-full bg-transparent hover:bg-neutral-800">
                        <XMarkIcon className="w-8 h-8" />
                        <p>Close</p>
                    </button>
                </div>

            </div>
            <div className="mt-28 w-full">
                <div className="flex w-full flex-row gap-7">
                    <div className="flex flex-row py-6 h-fit px-3 w-full lg:w-2/3 items-start bg-neutral-900 rounded-md border border-neutral-700">

                        <div className=" flex flex-col items-center gap-1">
                            {PostData && <LikeDislike123 info={LikeDislikeInfo2} />}
                        </div>

                        <div className="flex flex-col  mr-12 gap-3 items-start text-start w-full">
                            <div className="flex flex-row gap-3 items-center mx-3 text-neutral-500">
                                {(CommunityData != null) && <Link className="flex flex-row items-center gap-2 text-inherit hover:text-neutral-400 hover:underline" to={`/reddit/r/${CommunityData.id}`}>
                                    <img src={subreddit} alt="" className="w-7 h-7" />
                                    r/{CommunityData.name}
                                </Link>}
                                {(UserData != null) && <p className="text-inherit">Posted by <Link to={`/reddit/user/${user_id}`} className="hover:text-neutral-400 hover:underline">u/{UserData.username}</Link></p>}
                                <p className="text-inherit">{date_created}</p>
                            </div>

                            <p className="text-2xl font-semibold mx-3">{title}</p>

                            <div className="flex flex-row items-center gap-2 mx-3">
                                {spoiler && <div className="border border-neutral-500 px-2 rounded-sm"><p>spoiler</p></div>}
                                {nsfw && <div className="border border-red-500 px-2 rounded-sm"><p className="text-red-500">nsfw</p></div>}
                            </div>
                
                            {image && <div className="flex w-full mx-3 justify-center"><img src={`http://127.0.0.1:8000/${image}`} alt="" className="min-h-[20rem]  max-h-[40rem] object-cover" /> </div>}

                            {link &&
                                <div className="flex flex-row items-center w-1/2">
                                    <a href={link} rel="noreferrer" target="_blank" className="mx-3 hover:underline text-blue-500 line-clamp-1">{link}</a>
                                    <div><LinkIcon className="w-4 h-4 stroke-blue-500" /></div>
                                </div>
                            }

                            <div dangerouslySetInnerHTML={{ __html: description }} className="w-full text-left text-lg font-medium mx-3 mb-5"></div>

                            <div className="flex flex-row gap-1 mx-3 mb-5">
                                <div className='flex flex-row font-semibold items-center px-3 gap-2 bg-transparent border-transparent'>
                                    <ChatBubbleLeftIcon className="w-6 h-6" />
                                    <p>{comments}</p>
                                    <p>Comments</p>
                                </div>
                                <button onClick={handleSave} className='hidden sm:flex flex-row items-center gap-3 rounded-none bg-transparent hover:bg-neutral-800 border-transparent'>
                                    {Saved ? <BookmarkIcon className="w-6 h-6 fill-white" /> : <BookmarkIcon className="w-6 h-6 " />}

                                    <p>Save</p>
                                </button>
                                <button className='bg-transparent hover:bg-neutral-800 rounded-none border-transparent'>
                                    <EllipsisHorizontalIcon className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="relative flex flex-col gap-2 w-full mx-3 mb-5 border-b-2 border-neutral-700">
                                <p className="text-start">Comment as  <Link to={`/reddit/user/${loggedUser.id}`} className="text-sky-500">{loggedUser.username}</Link></p>
                                <QuillTextArea info={QuillTextAreaInfo} />
                                <div className="w-full flex justify-end mt-2 mb-5">
                                    <button onClick={handleSubmit} disabled={DisableCommentSubmit}
                                        className="rounded-full w-1/5 p-2 bg-white disabled:bg-neutral-200 text-neutral-800 disabled:text-neutral-500">
                                        {loading ? <p className="text-black">loading...</p> : <p className="text-inherit font-semibold text-base">Comment</p>}
                                    </button>
                                </div>
                                <SearchSortPanel/>
                            </div>

                            {Comments ? (
                                Comments.map((Comment) => (
                                    <div key={Comment.id} className="mb-3 -ml-6 w-full">
                                        <CommentCard info={Comment} />
                                    </div>
                                ))
                            ) : (
                                <p>loading...</p>
                            )}

                            {Comments == false && (
                                <div className="w-full mt-14 flex flex-col justify-center items-center gap-5">
                                    <ChatBubbleLeftRightIcon className="w-10 stroke-neutral-500" />
                                    <p className="text-neutral-500 text-2xl font-semibold">No comments Yet</p>
                                    <p className="text-neutral-500 text-lg font-semibold">Be the first to share what you think!</p>
                                </div>
                            )}

                        </div>
                    </div>
                    <div className="hidden lg:flex flex-col lg:w-1/3 h-screen gap-7">
                        {CommunityData && (<CommunityInfoCard info={CommunityData} userData={loggedUser} />)}
                    </div>
                </div>
            </div>
        </>


    )
}

export default CommentSection