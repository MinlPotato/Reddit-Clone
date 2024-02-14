import SearchCardPost from "../Cards/SearchCardPost"
import telescope_snoo from '../../assets/telescope-snoo.png'
import SearchCardCommunitiesSmall from "../Cards/SearchCardCommunities"
import SearchCardPeople from "../Cards/SearchCardPeople"
import { useNavigate, useLocation } from "react-router-dom"


function SearchOverview(params) {

    const navigate = useNavigate()
    const location = useLocation()

    const SearchPosts = params.SearchPosts
    const SearchCommunities = params.SearchCommunities
    const SearchPeople = params.SearchPeople

    const search = location.search.split('q=')[1]
    
    return (
        <div className="flex flex-row gap-9">
            <div className="flex flex-col rounded-md w-full xl:w-2/3">
                {(SearchPosts != null) ? (
                    SearchPosts.map((Post, index) => (
                        <div key={index}
                            className={index === SearchPosts.length - 1 ? 'border border-neutral-700 rounded-b-md' : index === 0 ? 'border rounded-t-md border-b-0 border-neutral-700' : 'border border-b-0 border-neutral-700'}>
                            <SearchCardPost info={Post} />
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}

                {(SearchPosts?.length === 0) && (
                    <div className="flex flex-col items-center gap-5 bg-neutral-900 border rounded-md border-neutral-700 py-4">
                        <img src={telescope_snoo} alt="" className="w-48" />
                        <p className="text-2xl font-semibold">{`Hm... we couldn't find any results for "${search}"`}</p>
                        <p className="text-lg font-semibold text-neutral-500">Double-check your spelling or try different keywords to adjust your search</p>
                    </div>
                )}

            </div>
            <div className="hidden xl:flex flex-col gap-9 w-0 xl:w-1/3">
                <div className="bg-neutral-900 border border-neutral-700 rounded-md">
                    <p className="text-start text-xl font-semibold ml-5 my-3">Communities</p>
                    {(SearchCommunities != null) ? (
                        SearchCommunities.map((Community, index) => (
                            <div key={index} className="px-3 border-b-[1px] py-4 border-neutral-700/75 hover:bg-neutral-800">
                                <SearchCardCommunitiesSmall info={Community} />
                            </div>
                        ))

                    ) : (
                        <p>Loading...</p>
                    )}

                    {(SearchCommunities?.length === 0) && (<p className="text-xl text-neutral-500 text-start ml-5 mb-5">No results</p>)}
                </div>
                <div className="bg-neutral-900 border border-neutral-700 rounded-md">
                    <p className="text-start text-xl font-semibold ml-5 my-3">People</p>
                    {(SearchPeople != null) ? (
                        SearchPeople.map((user, index) => (
                            <div key={index} onClick={() => navigate(`/reddit/user/${user.id}`)} className="px-3 border-b-[1px] py-4 border-neutral-700/75 hover:bg-neutral-800">
                                <SearchCardPeople info={user} />
                            </div>
                        ))

                    ) : (
                        <p>Loading...</p>
                    )}

                    {(SearchPeople?.length === 0) && (<p className="text-xl text-neutral-500 text-start ml-5 mb-5">No results</p>)}
                </div>
            </div>
        </div>
    )
}


export default SearchOverview