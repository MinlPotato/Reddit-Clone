import profile_pic from "../../assets/profile_pic.jpg"
import { Link } from "react-router-dom"

function SearchCardPeople(params) {

    const infoCard = params.info
    const name = infoCard.username

    return (
        <div className="flex flex-row gap-2 mx-2 items-center justify-start ">
            <img src={profile_pic} alt="" className="w-10 h-10 rounded-full" />
            <Link to={`/reddit/user/${params.id}`} className="text-inherit text-lg text-start font-semibold hover:underline">u/{name}</Link>
        </div>
    )
}

export default SearchCardPeople