import { Link } from "react-router-dom"
import subreddit from "../../assets/subreddit.png"
import moment from "moment"
import { useNavigate } from "react-router-dom"

function SearchCardPost(params) {

    const infoCard = params.info
    const navigate = useNavigate()

    let title = infoCard.title
    let id = infoCard.id
    let community_id = infoCard.community_id
    let user_id = infoCard.user_id
    let date_created = moment(infoCard.date_created).fromNow()
    let community_name = infoCard.community_name
    let username = infoCard.username
    let votes = infoCard.likes - infoCard.dislikes
    let image = infoCard.image
    let comments = infoCard.comments

    return (
        <div onClick={() => navigate(`/reddit/${id}`)} className=" bg-neutral-900 rounded-md border-inherit hover:bg-neutral-800 py-4">
            <div className="flex flex-col justify-between gap-2 items-start w-full">
                <div className="flex flex-row gap-5 mx-3 items-center text-neutral-500">
                    <div className="flex flex-row gap-2 items-center">
                        <img src={subreddit} alt="" className="w-7 h-7" />
                        <Link onClick={(e) => e.stopPropagation()} to={`/reddit/r/${community_id}`} className="text-inherit hover:text-neutral-400 hover:underline">r/{community_name}</Link>
                    </div>
                    <p className="text-inherit">Posted by <Link onClick={(e) => e.stopPropagation()} className="hover:underline" to={`/reddit/user/${user_id}`}>u/{username}</Link> </p>
                    <p className="text-inherit">{date_created}</p>
                </div>
                <div className="flex flex-row justify-between w-full">
                    <p className="text-xl text-start font-semibold px-4 mb-1 w-full line-calmp-2">{title}</p>
                    {image && <img src={image} alt="" className="min-w-[12rem] max-w-[12rem] h-[8rem] mr-5 rounded-lg object-cover" />}
                </div>
                <div className="flex flex-row gap-5 mx-3  items-center text-neutral-500">
                    <p className="text-inherit">{votes} upvotes</p>
                    <p className="text-inherit">{comments} comments</p>
                </div>
            </div>

        </div>
    )
}

export default SearchCardPost