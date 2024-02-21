import { ChevronDownIcon, HomeIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import subreddit from "../../assets/subreddit.png"
import { useNavigate } from "react-router-dom";
import { getCommunitiesJoinedByUser } from "../services/communityService";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../State/Slices/AuthUser";
import CreateCommunity from "../Community/CreateCommunity";
import { getCommunitiesCached, addCommunities } from "../State/Slices/CommunitySlice";

function HeaderHomePopover() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userData = useSelector(getUserData)
    const communitiesCached = useSelector(getCommunitiesCached).joinedCommunities

    const [Communities, setCommunities] = useState([])
    const [selected, setSelected] = useState(null)
    const [Create, setCreate] = useState(false)

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    useEffect(() => {
        if (userData.isLogged) {
            if (communitiesCached.length == 0) {
                getCommunitiesJoinedByUser(userData.id).then((response) => {
                    dispatch(addCommunities(response))
                    setCommunities(response)
                })
            } else {
                setCommunities(communitiesCached)
            }
        }
    }, [communitiesCached])

    const handleChange = (e) => {
        setSelected(e)
        navigate(`/reddit/r/${e.id}`)
    }

    return Communities && (
        <>
            {Create && <CreateCommunity info={{ setActive: setCreate, Active: Create }} />}
            <Listbox value={selected} onChange={handleChange}>
                {({ open }) => (
                    <>
                        <div className="relative mt-2 w-1/5">
                            <Listbox.Button className='p-0 py-2 px-1 w-full flex flex-row items-center xl:justify-between justify-center border-transparent bg-transparent hover:bg-neutral-800 hover:border-transparent'>
                                <div className="flex flex-row items-center gap-2">
                                    {selected ? (
                                        <>
                                            <div className="flex flex-row w-full lg:w-fit h-full items-center justify-center lg:justify-start">
                                                <div className="w-9 h-9"><img src={subreddit} alt="" className="w-9 h-9" /></div>
                                                <p className='hidden lg:hidden xl:block text-lg ml-3'>{selected.name}</p>
                                            </div>

                                        </>
                                    ) : (
                                        <>
                                            <div className="flex flex-row w-full h-full items-center justify-center lg:justify-start">
                                                <HomeIcon className='w-8 h-8' />
                                                <p className='hidden md:hidden lg:block text-lg ml-3'>Home</p>
                                            </div>

                                        </>
                                    )}
                                </div>
                                <div><ChevronDownIcon className="w-8 h-8" /></div>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute min-w-[22rem] w-full list-none p-y max-h-[35rem] overflow-auto rounded-b-md bg-neutral-900 border-t-0 border border-neutral-700 py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

                                    <p className="text-md mt-3 mb-1 pl-5 font-semibold text-start text-neutral-500">YOUR COMMUNITIES</p>

                                    <button onClick={() => setCreate(true)} className="flex flex-row gap-2 bg-transparent rounded-none hover:bg-neutral-800 border-none w-full items-center my-3 py-2 pl-3 pr-9">
                                        <PlusIcon className="w-8 h-8" />
                                        <p className="font-normal text-lg text-start">Create Community</p>
                                    </button>

                                    {(Communities.length != 0) ? (
                                        Communities.map((community) => (
                                            <Listbox.Option
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? "bg-neutral-800" : "text-neutral-300",
                                                        "relative cursor-default select-none py-2 pl-3 pr-9"
                                                    )
                                                }
                                                value={community}
                                                key={community.id}
                                            >
                                                <div className="flex flex-row gap-2 items-center">
                                                    <img src={subreddit} alt="" className="w-8 h-8" />
                                                    <p className="text-inherit text-lg text-start">r/{community.name}</p>
                                                </div>
                                            </Listbox.Option>
                                        ))
                                    ) : (
                                        <p className="text-md mt-3 mb-1 pl-5 font-semibold text-start text-neutral-200">
                                            NO COMMUNITIES JOINED
                                        </p>
                                    )
                                    }

                                </Listbox.Options>


                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </>

    );
}

export default HeaderHomePopover