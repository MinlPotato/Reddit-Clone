import subreddit from "../../assets/subreddit.png"
import { Link } from "react-router-dom"
import MemberJoinButton from "../Community/MemberJoinButton"
import { useSelector } from "react-redux";
import { getUserData } from "../State/Slices/AuthUser";

export default function SearchCardCommunitiesSmall(params) {

    const infoCard = params.info
    const name = infoCard.name
    const members = infoCard.members

    const userData = useSelector(getUserData)

    return (
        <div className="flex flex-row gap-2 items-center justify-between">
            <div className="flex flex-row items-center gap-2">
                <img src={subreddit} alt="" className="w-12 h-12" />
                <div className="flex flex-col justify-start">
                    <Link to={`/reddit/r/${infoCard.id}`} className="text-inherit text-lg text-start font-semibold hover:underline">r/{name}</Link >
                    <p className="text-neutral-500 text-md text-start">{members} Members</p>
                </div>
            </div>

            <MemberJoinButton info={{user_id: userData.id, community_id: infoCard.id}}/>
            
        </div>
    )
}

export const SearchCardCommunitiesBig = (params) => {

    const infoCard = params.info
    const name = infoCard.name
    const members = infoCard.members
    const description = infoCard.description

    const userData = useSelector(getUserData)

    return (
        <div className="flex flex-row gap-2 items-center justify-between">
            <div className="flex flex-row items-center gap-2">
                <img src={subreddit} alt="" className="w-12 h-12" />
                <div className="flex flex-col">
                    <div className="flex flex-row gap-2 items-center justify-start">
                        <Link to={`/reddit/r/${infoCard.id}`} className="text-inherit text-lg text-start font-semibold hover:underline">r/{name}</Link >
                        <p className="text-neutral-500 font-semibold">·</p>
                        <p className="text-neutral-500 text-md text-start">{members} Members</p>
                    </div>
                    <p className="text-start text-neutral-500 line-clamp-2">{description}</p>
                </div>


            </div>

            <MemberJoinButton info={{user_id: userData.id, community_id: infoCard.id}}/>

        </div>
    )
}

