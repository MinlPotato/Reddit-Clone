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
    let post_user_id = infoCard.user_id
    let date_created = moment(infoCard.date_created).fromNow()
    let community_name = infoCard.community_name
    let username = infoCard.username
    let votes = infoCard.likes - infoCard.dislikes
    
    return (
        <div onClick={() => navigate(`/reddit/${id}`)}  className="bg-neutral-900 border-inherit hover:bg-neutral-800 py-4 min-w-[50rem]">
            <div className="flex flex-col justify-between gap-2 items-start w-full">
                <div className="flex flex-row gap-5 mx-3 items-center text-neutral-500">
                    <div className="flex flex-row gap-2 items-center">
                        <img src={subreddit} alt="" className="w-7 h-7" />
                    <Link to={`r/${community_id}`} className="text-inherit hover:text-neutral-400">r/{community_name}</Link>
                    </div>               
                    <p className="text-inherit">Posted by u/{username}</p>
                    <p className="text-inherit">{date_created}</p>
                </div>
                 <p className="text-xl text-start font-semibold mx-3 mb-1 w-full line-calmp-2">{title}</p>
                <div className="flex flex-row gap-5 mx-3  items-center text-neutral-500">
                    <p className="text-inherit">{votes} upvotes</p>
                     <p className="text-inherit">0 comments</p>
                </div>
            </div>
        </div>
    )
}

export default SearchCardPost