import TestCommunity from "./TestCommunity"
import CreatePost from "../CreatePost"
import { useState, useEffect, useRef } from "react"
import Card from "../Card"
import subreddit from "../../assets/subreddit.png"
import OrderCard from "../OrderCard"
import { CakeIcon } from "@heroicons/react/24/outline"
import { getPostByCommunity, getCommunity } from "../services/communityService"
import { useLocation } from "react-router-dom"
import moment from "moment"

function CommunityPage(params) {

    const location = useLocation()

    const community_id = location.pathname.split('/')[3]

    const [Posts, setPosts] = useState(null)
    const [CommunityData, setCommunityData] = useState(null)

    const sortList = {
        Hot:'',
        New:'-date_created',
        Top:'-votes'
    }

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const sort = queryParameters.get("sort")
        const sortType = sortList[sort] || ''
        
        getCommunity(community_id).then((response) => setCommunityData(response))
        getPostByCommunity(community_id, sortType).then((response) => setPosts(response))
    }, [location])
    

    return CommunityData ? (
        <>
            <div className="mb-[7rem] -z-10">
                <div className="absolute object-cover left-0 bg-sky-500/95 w-full h-36 -z-10"></div>
                <div className="absolute flex justify-start gap-2 items-center left-0 top-44 bg-neutral-900 w-full h-28 -z-10"></div>
            </div>
            <div className="mt-14">
                <div className="flex flex-row items-center text-start w-9/12">
                    <img src={subreddit} className="w-32 h-32 mb-10 rounded-full"></img>
                    <div className="flex flex-col gap-2 justify-between w-full">
                        <div className="flex flex-row justify-between items-center">
                            <p className="text-4xl font-bold ">{CommunityData.name}</p>
                            <button className="flex items-center justify-center w-24 h-10 bg-neutral-200 hover:bg-neutral-300 font-semibold rounded-full">
                                <p className="text-black text-lg">Join</p>
                            </button>
                        </div>
                        <p className="text-lg text-neutral-500 font-semibold">r/{CommunityData.name}</p>
                    </div>
                </div>
                <div className="flex flex-row h-screen justify-center w-full gap-7">
                    <div className="flex flex-col md:w-100 lg:w-2/3 gap-7">
                        <CreatePost />
                        <OrderCard />
                        {Posts ? (
                            Posts.map((Post) => (
                            <div key={Post.id}>
                                <Card info={Post}></Card>
                            </div>
                        ))
                        ) : (
                            <p>loading...</p>
                        )}
                        
                    </div>

                    <div className="hidden md:hidden lg:flex flex-col w-1/3 gap-7">
                        <div className="w-full p-4 text-start bg-neutral-900 rounded-md border border-neutral-700">
                            <div className="border-b-2 pb-6 border-neutral-700">
                                <p className="text-xl mb-6 font-bold text-neutral-500">About r/{CommunityData.name}</p>
                                <p className="text-lg font-normal mb-4">
                                    {CommunityData.description}
                                </p>
                                <div className="flex flex-row gap-2 items-center">
                                    <CakeIcon className="w-7 h-7" />
                                    <p className="text-lg font-semibold text-neutral-500">Created {moment(CommunityData.date_created).fromNow()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : (<p>loading</p>)
}

export default CommunityPage