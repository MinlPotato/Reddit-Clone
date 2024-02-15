import { useDispatch, useSelector } from "react-redux"
import { getPostsCached, resetRecentPosts } from "./State/Slices/PostsSlice"
import moment from "moment";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function RecentPosts() {

    const dispatch = useDispatch()
    const recentPosts = useSelector(getPostsCached)

    return (
        <div className="sticky top-20 w-full min-h-[5rem] bg-neutral-900 rounded-md border border-neutral-700">
            <p className="m-3 font-semibold text-neutral-300 text-sm text-left">RECENT POSTS</p>
            {recentPosts.recent.length > 0 ? (
                recentPosts.recent.toReversed().map((post, index) => (
                    <div key={index} className="mx-3">
                        <div className="border-b border-neutral-700 flex flex-row gap-3">
                            <Link to={`/reddit/${post.id}`}>
                                {post.image ? (
                                <div className="flex items-center justify-center w-20 h-14 border border-neutral-700 rounded-md mt-4 mb-7">
                                    <img src={`http://127.0.0.1:8000/${post.image}`} className="w-full h-full object-cover rounded-md" alt="" />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center w-20 h-14 border border-neutral-700 rounded-md mt-4 mb-7">
                                    <DocumentIcon className="w-5 h-5 stroke-neutral-500" />
                                </div>
                            )}
                            </Link>
                            
                            <div className="row row-col text-start mt-3">
                                <Link to={`/reddit/${post.id}`} className="font-medium  text-lg text-left line-clamp-1 hover:underline">{post.title}</Link>
                                <p className=" text-left mb-3 text-neutral-500">{post.votes} points • {post.comments} comments • {moment(post.date_created).fromNow()}</p>
                            </div>

                        </div>
                    </div>
                ))
            ) : (
                <p className="my-5 font-semibold text-neutral-500">{`You haven't seen a post yet.`}</p>
            )}

            {recentPosts.recent.length > 0 && (
                <div className="w-full flex justify-end my-3 px-5">
                    <button onClick={() => dispatch(resetRecentPosts())} className="transition rounded-full px-4 py-1 text-neutral-400 hover:text-neutral-200 hover:border-neutral-200">
                        <p className="text-inherit">Clear</p>
                    </button>
                </div>

            )}

        </div>
    )
}

export default RecentPosts