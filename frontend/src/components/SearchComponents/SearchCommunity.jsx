import { SearchCardCommunitiesBig } from "../Cards/SearchCardCommunities"
import { useNavigate } from "react-router-dom"

function SearchCommunity(params) {
    
    const navigate = useNavigate()
    const SearchCommunities = params.SearchCommunities

    return (
        <>
            <div className="bg-neutral-900 border border-neutral-700 rounded-md">
                    <p className="text-start text-xl font-semibold ml-5 my-3">Communities</p>
                    {(SearchCommunities != null) ? (
                        SearchCommunities.map((Community, index) => (
                            <div key={index} onClick={() => navigate(`/reddit/r/${Community.id}`)} className="px-3 border-b-[1px] py-4 border-neutral-700/75 hover:bg-neutral-800">
                                <SearchCardCommunitiesBig info={Community} />
                            </div>
                        ))

                    ) : (
                        <p>Loading...</p>
                    )}

                    {(SearchCommunities?.length === 0) && (<p className="text-xl text-neutral-500 text-start ml-5 mb-5">No results</p>)}
            </div>
        </>
    )
}

export default SearchCommunity