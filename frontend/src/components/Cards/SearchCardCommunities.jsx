import subreddit from "../../assets/subreddit.png"

function SearchCardCommunities(params) {

    const infoCard = params.info
    let name = infoCard.name

    return (
        <div className="flex flex-row gap-2 items-center justify-start ">
            <img src={subreddit} alt="" className="w-12 h-12" />
            <div className="flex flex-col justify-start">
                <p className="text-inherit text-lg text-start">r/{name}</p>
                <p className="text-neutral-500 text-md text-start">6969 Members</p>
            </div>
        </div>
    )
}

export default SearchCardCommunities