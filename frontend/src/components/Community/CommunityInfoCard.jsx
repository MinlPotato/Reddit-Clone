import subreddit from '../../assets/subreddit.png'
import { CakeIcon } from "@heroicons/react/24/outline"
import moment from 'moment'
import { Link } from 'react-router-dom'
import MemberJoinButton from "./MemberJoinButton"

function CommunityInfoCard(params) {

    const infoCard = params.info
    const userData = params.userData

    return (
        <div className="hidden lg:flex flex-col gap-7 w-full">
            <div className="w-full p-4 inline-block text-start bg-neutral-900 rounded-md border border-neutral-700">
                <div className=" -m-4 rounded-t-md h-14 bg-sky-500"></div>
                <div className="border-b-2 pb-6 border-neutral-800">
                    <div className="flex flex-row items-center gap-1 mb-1">
                        <img src={subreddit} alt="" className="w-20" />
                        <Link to={`/reddit/r/${infoCard.id}`} className="text-xl font-bold hover:underline">r/{infoCard.name}</Link>
                    </div>

                    <p className="text-lg font-semibold mb-4">
                        {infoCard.description}
                    </p>
                    <div className="flex flex-row gap-2 items-center">
                        <CakeIcon className="w-7 h-7" />
                        <p className="text-lg font-semibold text-neutral-500">Created {moment(infoCard.date_created).fromNow()}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-20 border-b-2 pb-6 pt-6 border-neutral-800">
                    <div className='flex flex-col'>
                        <p className="text-xl font-semibold ">{infoCard.members || 0}</p>
                        <p className="text-md font-semibold text-neutral-500">Members</p>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex flex-row items-center gap-1'>
                            <div className='rounded-full w-2 h-2 bg-green-400'></div>
                            <p className="text-xl font-semibold">{infoCard.active_members || 0}</p>
                        </div>
                        <p className="text-md font-semibold text-neutral-500">Online</p>
                    </div>

                </div>

                <div className="border-b-2 pb-6 pt-6 border-neutral-800">

                    <MemberJoinButton className={"w-full"} communityData={infoCard} info={{ user_id: userData.id, community_id: infoCard.id }} />

                </div>
            </div>
        </div>
    )

}

export default CommunityInfoCard