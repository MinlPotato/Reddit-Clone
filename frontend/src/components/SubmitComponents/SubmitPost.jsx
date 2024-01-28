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

function SubmitPost(params) {

    const userData = useSelector(getUserData)
    const navigate = useNavigate()

    const [CommunityData, setCommunityData] = useState(null)
    const [TitleLimitNumber, setTitleLimitNumber] = useState(0)
    const [TitleLimit, setTitleLimit] = useState(false)

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


    const handleSubmit = async (e) => {
        const queryParameters = new URLSearchParams(window.location.search)
        const community_id = queryParameters.get("community")
 
        if (community_id === null) {            
            return alert('Community not Selected')
        }

        const title = e.target.title.value
        const description = e.target.description.value
        const user_id = userData.id

        await axios.post(`http://127.0.0.1:8000/api/posts/publish/`, {
            title,
            description,
            user_id,
            community_id
        })
            .then(async function (response) {
                console.log('Post Submitted.');
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    const handleTitleLimit = (e) => {
        setTitleLimitNumber(e.target.value.length)
        if (e.target.value.length === e.target.maxLength) {
            setTitleLimit(true)
        } else {
            setTitleLimit(false)
        }
    }

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
                            <div className="h-12 flex flex-row">
                                <button className="flex flex-row items-center gap-3 justify-center w-1/4 rounded-none border-0 border-r-2 bg-transparent border-neutral-700">
                                    <PencilSquareIcon className="w-6 hidden md:block" />
                                    <p className="text-lg">Post</p>
                                </button>
                                <button className="flex flex-row items-center gap-3 justify-center w-1/4 rounded-none border-0 border-r-2 bg-transparent border-neutral-700">
                                    <PhotoIcon className="w-6 hidden md:block" />
                                    <p className="text-sm">Image & Video</p>
                                </button>
                                <button className="flex flex-row items-center gap-3 justify-center w-1/4 rounded-none border-0 border-r-2 bg-transparent border-neutral-700">
                                    <LinkIcon className="w-6 hidden md:block" />
                                    <p className="text-lg">Link</p>
                                </button>
                                <button className="flex flex-row items-center gap-3 justify-center w-1/4 rounded-none border-0  bg-transparent border-neutral-700">
                                    <ListBulletIcon className="w-6 hidden md:block" />
                                    <p className="text-lg">Poll</p>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} action="" className="flex flex-col gap-5 p-3 relative">
                                <input maxLength={70} onChange={handleTitleLimit} type="text" name="title" id="title" placeholder="Title" 
                                className={TitleLimit ? "w-full bg-transparent rounded-md focus:border-red-500 focus:ring-0 " :  "w-full bg-transparent rounded-md border-neutral-700 "}  />
                                <p className="absolute right-6 top-5 text-neutral-500">{TitleLimitNumber}/70</p>
                                <textarea name="description" id="description" placeholder="Text (optional)"
                                    className="w-full min-h-[17rem] bg-transparent border rounded-md border-neutral-700 text-base" />
                                <div className="flex flex-row flex-wrap gap-3 justify-start border-b-2 border-neutral-700 pb-5">
                                    <div>
                                        <input name="spoiler" id="spoiler" type="checkbox" className="hidden peer" />
                                        <label htmlFor="spoiler" type="button" className="flex flex-row px-5 py-3 items-center gap-1 peer-checked:text-black peer-checked:bg-white border border-neutral-700 rounded-full">
                                            <PlusIcon className="w-7 h-7" />
                                            <p className="text-inherit  text-lg font-semibold">Spoiler</p>
                                        </label>
                                    </div>
                                    <div>
                                        <input name="nsfw" id="nsfw" type="checkbox" className="hidden peer" />
                                        <label htmlFor="nsfw" type="button" className="flex flex-row px-5 py-3 items-center gap-1 peer-checked:text-black peer-checked:bg-white border border-neutral-700 rounded-full">
                                            <PlusIcon className="w-7 h-7" />
                                            <p className="text-inherit  text-lg font-semibold">NSFW</p>
                                        </label>
                                    </div>

                                    <button type="button" disabled className="flex flex-row items-center gap-2 border border-neutral-700 rounded-full">
                                        <TagIcon className=" w-7 h-7 stroke-neutral-600" />
                                        <p className="text-neutral-600 text-lg">Flair</p>
                                        <ChevronDownIcon className=" w-7 h-7 fill-neutral-600" />
                                    </button>
                                </div>
                                <div className="flex flex-row gap-3 h-12 justify-end items-center">
                                    <button type="button" className="h-full flex items-center rounded-full bg-transparent border border-neutral-700">
                                        <p className="text-neutral-400 text-lg">Save Draft</p>
                                    </button>
                                    <input type="submit" value="Post" className="h-full w-20 text-center text-xl text-neutral-900 items-center bg-neutral-100 rounded-full" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="w-1/3 lg:flex flex-col gap-9 hidden">
                    {CommunityData && (
                        <CommunityInfoCard info={CommunityData}/>
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