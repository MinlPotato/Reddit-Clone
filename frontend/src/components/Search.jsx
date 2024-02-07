import { ChevronDownIcon } from "@heroicons/react/24/outline"
import SearchCardPost from "./Cards/SearchCardPost"
import { getSearchCommunities, getSearchPosts } from "./services/searchService"
import { useState, useEffect } from "react"
import telescope_snoo from '../assets/telescope-snoo.png'
import SearchCardCommunities from "./Cards/SearchCardCommunities"
import { useNavigate } from "react-router-dom"
import { Listbox } from "@headlessui/react";

function Search() {

    const navigate = useNavigate()

    const queryParameters = new URLSearchParams(window.location.search)
    const search = queryParameters.get("q")

    const [SearchPosts, setSearchPosts] = useState(null)
    const [SearchCommunities, setSearchCommunities] = useState(null)

    const sortTypes = [
        {
            id: 1,
            name: 'default',
            sort_type:''
            
        },
        {
            id: 2,
            name: 'recent',
            sort_type:'-date_created'
            
        },
        {
            id: 3,
            name: 'popular',
            sort_type:'-votes' 
        }
    ]

      function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
    }

    const [selectedSort, setSelectedSort] = useState(null);

    useEffect(() => {
        getSearchPosts(search, selectedSort?.sort_type).then((response) => { setSearchPosts(response) })
        getSearchCommunities(search).then((response) => { setSearchCommunities(response) })
    }, [search, selectedSort])


    return (
        <>
            <div className="mt-16 h-screen">
                <div className="mb-9 flex flex-row gap-3">
                    <button className="h-14 px-7 flex flex-row gap-3 border-transparent items-center rounded-full bg-neutral-800">
                        <p className="text-xl font-semibold text-neutral-200">Posts</p>
                    </button>
                    <button className="h-14 px-7 flex flex-row gap-3 border-transparent items-center rounded-full bg-transparent">
                        <p className="text-xl font-semibold text-neutral-200">Comments</p>
                    </button>
                    <button className="h-14 px-7 flex flex-row gap-3 border-transparent items-center rounded-full bg-transparent">
                        <p className="text-xl font-semibold text-neutral-200">Communities</p>
                    </button>
                    <button className="h-14 px-7 flex flex-row gap-3 border-transparent items-center rounded-full bg-transparent">
                        <p className="text-xl font-semibold text-neutral-200">People</p>
                    </button>
                </div>
                <div className="mb-2 flex flex-row gap-3">
                    <Listbox value={selectedSort} onChange={(e) => setSelectedSort(e)}>
                        {({ open }) => (
                            <>
                                <Listbox.Button className="flex h-7 px-2 flex-row gap-3 border-transparent items-center rounded-full bg-transparent hover:bg-neutral-800">                              
                                        {selectedSort ? (
                                            <>                                            
                                                <p className="text-md font-medium text-neutral-200">{selectedSort.name}</p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-md font-medium text-neutral-200">Sort {open}</p>
                                            </>
                                        )}
                                
                                    <ChevronDownIcon className="w-5 h-5" />
                                </Listbox.Button>
                                <Listbox.Options className='absolute list-none mt-8 z-10 p-y w-fit overflow-auto bg-neutral-900 shadow-md shadow-neutral-800 rounded-b-md bg-neutral-90 py-2 '>
                                    {sortTypes.map((sort) => (
                                        <Listbox.Option
                                            className={({ active }) =>
                                                classNames(
                                                    active ? "bg-neutral-800 text-white" : "text-neutral-500",
                                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                                )
                                            }
                                            value={sort}
                                            key={sort.id}
                                        >
                                        
                                        <p>{sort.name}</p>
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </>
                        )}
                    </Listbox>
                    <button className="flex h-7 flex-row gap-3 border-transparent items-center rounded-full bg-transparent hover:bg-neutral-800">
                        <p className="text-md font-medium text-neutral-200">Time</p>
                        <ChevronDownIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex flex-row gap-9">
                    <div className="flex flex-col rounded-md">
                        {(SearchPosts != null) ? (
                            SearchPosts.map((Post, index) => (
                                <div key={Post.id} className={index === SearchPosts.length - 1 ? 'border border-neutral-700' : 'border border-b-0 border-neutral-700'}>
                                    <SearchCardPost info={Post} />
                                </div>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}

                        {(SearchPosts?.length === 0) && (
                            <div className="flex flex-col items-center gap-5 bg-neutral-900 border rounded-md border-neutral-700 w-[48rem] py-4">
                                <img src={telescope_snoo} alt="" className="w-48" />
                                <p className="text-2xl font-semibold">{`Hm... we couldn't find any results for "${search}"`}</p>
                                <p className="text-lg font-semibold text-neutral-500">Double-check your spelling or try different keywords to adjust your search</p>
                            </div>
                        )}

                    </div>
                    <div className="flex flex-col">
                        <div className="bg-neutral-900 min-h-[6rem] w-[23rem] border border-neutral-700">
                            <p className="text-start text-xl font-semibold ml-5 my-3">Communities</p>
                            {(SearchCommunities != null) ? (
                                SearchCommunities.map((Community, index) => (
                                    <div key={index} onClick={() => navigate(`/reddit/r/${Community.id}`)} className="px-3 border-b-[1px] py-4 border-neutral-700/75 hover:bg-neutral-800">
                                        <SearchCardCommunities info={Community} />
                                    </div>
                                ))

                            ) : (
                                <p>Loading...</p>
                            )}

                            {(SearchCommunities?.length === 0) && (<p className="text-xl text-start ml-5">No results</p>)}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Search