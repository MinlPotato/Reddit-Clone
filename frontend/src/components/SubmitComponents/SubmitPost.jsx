import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { PlusIcon, TagIcon, ListBulletIcon, LinkIcon, PhotoIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import rulesImg from "../../assets/rulesThingy.png"
import { useSelector } from "react-redux";
import { getUserData } from "../State/Counter/AuthUser";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SelectCommunityPanel from "./SelectCommunityPanel";
import { getCommunity } from "../services/communityService";
import axios from "axios";
import CommunityInfoCard from "../Community/CommunityInfoCard";
import FormPost from "./FormPost";
import FormImageVideoPost from "./FormImageVideoPost";

function SubmitPost(params) {

    const userData = useSelector(getUserData)
    const navigate = useNavigate()

    const [CommunityData, setCommunityData] = useState(null)

    useEffect(() => {
        if (userData.isLogged == false) {
            navigate('/login')
        }
        window.history.replaceState(null, null, "/reddit/submit")
    }, [])

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const community_id = queryParameters.get("community")
        if (community_id === null) {
            return
        }
        getCommunity(community_id).then((response) => setCommunityData(response))
    }, [window.location.search])

    return (
        <div className="mt-16">
            <div className="flex flex-row gap-9">
                <div className="lg:w-8/12 w-full flex flex-col gap-7">
                    <div className="w-full flex flex-row items-center justify-between border-b-2 border-neutral-700">
                        <p className="text-left text-2xl my-5 font-semibold">Create a post</p>
                        <button className="h-10 flex flex-row gap-3 items-center rounded-full bg-transparent hover:bg-neutral-800">
                            <p>Drafts</p>
                            <p className="bg-neutral-800 w-6 rounded-md">0</p>
                        </button>
                    </div>

                    <div className="h-fit flex flex-col gap-4">
                        <SelectCommunityPanel />
                        <div className="flex flex-col gap-5 bg-neutral-900 rounded-md ">
                            <div className="h-14 flex flex-row">
                                <div className="w-1/4 flex justify-center rounded-none border-0 border-r-2 border-neutral-700 ">
                                    <input type="radio" name="selectSubmit" id="post" className="hidden peer" />
                                    <label htmlFor="post" className="w-full flex flex-row items-center gap-3 justify-center bg-transparent 
                                        text-neutral-500 hover:text-white stroke-neutral-500 hover:stroke-white 
                                        peer-checked:text-white peer-checked:stroke-white peer-checked:border-b-4 rounded-b-sm">
                                        <PencilSquareIcon className="w-6 hidden md:block stroke-inherit" />
                                        <p className="text-lg text-inherit">Post</p>
                                    </label>
                                </div>
                                <div className="w-1/4 flex justify-center rounded-none border-0 border-r-2 border-neutral-700 ">
                                    <input type="radio" name="selectSubmit" id="image&video" className="hidden peer" />
                                    <label htmlFor="image&video" className=" w-full flex flex-row items-center gap-3 justify-center bg-transparent 
                                        text-neutral-500 hover:text-white stroke-neutral-500 hover:stroke-white 
                                        peer-checked:text-white peer-checked:stroke-white peer-checked:border-b-4 rounded-b-sm">
                                        <PhotoIcon className="w-6 hidden md:block stroke-inherit" />
                                        <p className="text-lg text-inherit">Image & Video</p>
                                    </label>
                                </div>
                                <div className="w-1/4 flex justify-center rounded-none border-0 border-r-2 border-neutral-700 ">
                                    <input type="radio" name="selectSubmit" id="link" className="hidden peer" />
                                    <label htmlFor="link" className=" w-full flex flex-row items-center gap-3 justify-center bg-transparent 
                                        text-neutral-500 hover:text-white stroke-neutral-500 hover:stroke-white 
                                        peer-checked:text-white peer-checked:stroke-white peer-checked:border-b-4 rounded-b-sm">
                                        <LinkIcon className="w-6 hidden md:block stroke-inherit" />
                                        <p className="text-lg text-inherit">Link</p>
                                    </label>
                                </div>
                                <div className="w-1/4 flex justify-center rounded-none border-0 border-r-2 border-neutral-700 ">
                                    <input type="radio" name="selectSubmit" id="poll" className="hidden peer" />
                                    <label htmlFor="poll" className=" w-full flex flex-row items-center gap-3 justify-center bg-transparent 
                                        text-neutral-500 hover:text-white stroke-neutral-500 hover:stroke-white 
                                        peer-checked:text-white peer-checked:stroke-white peer-checked:border-b-4 rounded-b-sm">
                                    <ListBulletIcon className="w-6 hidden md:block stroke-inherit" />
                                    <p className="text-lg text-inherit">Poll</p>
                                    </label>
                                </div>
                            </div>
                            <FormPost />
                        </div>
                    </div>
                </div>
                <div className="w-1/3 lg:flex flex-col gap-9 hidden">
                    {CommunityData && (
                        <CommunityInfoCard info={CommunityData} />
                    )}
                    <div className="w-full h-fit p-3 bg-neutral-900">
                        <div className="flex flex-row items-center">
                            <img src={rulesImg} alt="" className="h-full" />
                            <p className="text-xl text-left font-semibold">Posting to Reddit</p>
                        </div>
                        <div className="flex flex-col list-decimal text-left font-semibold text-lg ">
                            <p className="border-t-2 border-neutral-700 py-3">1. Remember the human</p>
                            <p className="border-t-2 border-neutral-700 py-3">2. Behave like you would in real life</p>
                            <p className="border-t-2 border-neutral-700 py-3">3. Look for the original source of content</p>
                            <p className="border-t-2 border-neutral-700 py-3">4. Search for duplicates before posting</p>
                            <p className="border-y-2 border-neutral-700 py-3">5. Read the community's rules</p>
                        </div>

                    </div>
                    <p className="text-start">Please be mindful of reddit's
                        <a href="" className="text-sky-500"> content policy </a>
                        and practice good
                        <a href="" className="text-sky-500"> reddiquette</a>.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default SubmitPost