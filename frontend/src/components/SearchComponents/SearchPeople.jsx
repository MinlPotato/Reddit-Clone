
import SearchCardPeople from "../Cards/SearchCardPeople"

function SearchPeople(params) {

    const SearchPeople = params.SearchPeople

    return (

        <div className="bg-neutral-900 border border-neutral-700 rounded-md">
            <p className="text-start text-xl font-semibold ml-5 my-3">People</p>
            {(SearchPeople != null) ? (
                SearchPeople.map((user, index) => (
                    <div key={index} className="px-3 border-b-[1px] py-4 border-neutral-700/75 hover:bg-neutral-800">
                        <SearchCardPeople info={user} />
                    </div>
                ))

            ) : (
                <p>Loading...</p>
            )}

            {(SearchPeople?.length === 0) && (<p className="text-xl text-neutral-500 text-start ml-5 mb-5">No results</p>)}
        </div>

    )
}

export default SearchPeople