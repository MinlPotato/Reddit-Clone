import { getSearchCommunities, getSearchPeople, getSearchPosts } from "../services/searchService"
import { useState, useEffect } from "react"
import SearchSortPanel from "./SearchSortPanel"
import SearchOverview from "./SearchOverview"
import SearchCommunity from "./SearchCommunity"
import SearchPeople from "./SearchPeople"
import { useLocation } from "react-router-dom"

function Search() {

    const location = useLocation()

    const queryParameters = new URLSearchParams(window.location.search)
    const search = queryParameters.get("q")
    const sort = queryParameters.get("sort")
    const date = queryParameters.get("date")

    const [SearchPosts, setSearchPosts] = useState(null)
    const [SearchCommunities, setSearchCommunities] = useState(null)
    const [SearchUsers, setSearchUsers] = useState(null)

    const [SearchType, setSearchType] = useState('posts')

    useEffect(() => {
        getSearchPosts(search, sort, date).then((response) => { setSearchPosts(response) })
        getSearchCommunities(search).then((response) => { setSearchCommunities(response) })
        getSearchPeople(search).then((response) => { setSearchUsers(response) })
    }, [search, sort, date, location])


    return (
        <>
            <div className="absolute left-0 right-0 top-28 sm:mx-10 xl:mx-52">
                <div className="mb-9 flex flex-row flex-wrap justify-evenly sm:justify-normal gap-3">
                    <div>
                        <input onClick={(e) => setSearchType(e.target.value)} defaultChecked type="radio" name="searchType" id="posts" value="posts" className="peer hidden" />
                        <label htmlFor="posts" className="h-14 px-7 flex flex-row gap-3 border-transparent items-center rounded-full peer-checked:bg-neutral-800">
                            <p className="text-xl font-semibold text-neutral-200">Posts</p>
                        </label>
                    </div>
                    <div>
                        <input onClick={(e) => setSearchType(e.target.value)} type="radio" name="searchType" id="communities" value="communities" className="peer hidden" />
                        <label htmlFor="communities" className="h-14 px-7 flex flex-row gap-3 border-transparent items-center rounded-full peer-checked:bg-neutral-800">
                            <p className="text-xl font-semibold text-neutral-200">Communities</p>
                        </label>
                    </div>
                    <div>
                        <input onClick={(e) => setSearchType(e.target.value)} type="radio" name="searchType" id="people" value="people" className="peer hidden" />
                        <label htmlFor="people" className="h-14 px-7 flex flex-row gap-3 border-transparent items-center rounded-full peer-checked:bg-neutral-800">
                            <p className="text-xl font-semibold text-neutral-200">People</p>
                        </label>
                    </div>
                </div>

                {SearchType == "posts" && <SearchSortPanel/>}

                {SearchType == "posts" && <SearchOverview SearchPosts={SearchPosts} SearchCommunities={SearchCommunities} SearchPeople={SearchUsers}/>}
                {SearchType == "communities" && <SearchCommunity SearchCommunities={SearchCommunities}/>}
                {SearchType == "people" && <SearchPeople SearchPeople={SearchUsers}/>}

            </div>
        </>
    )
}

export default Search