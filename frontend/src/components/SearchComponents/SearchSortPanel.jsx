import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { Listbox } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function SearchSortPanel() {

    const navigate = useNavigate()
    const location = useLocation()

    const sortTypes = [
        {
            id: 1,
            name: 'default',
            sort_type: ''

        },
        {
            id: 2,
            name: 'recent',
            sort_type: '-date_created'

        },
        {
            id: 3,
            name: 'popular',
            sort_type: '-votes'
        }
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [selectedSort, setSelectedSort] = useState(null);

    const handleSort = (e) => {
        setSelectedSort(e)
        const search = location.search.split('&')[0]     
        navigate(location.pathname + search + `&sort=${e.sort_type}`)
    }

    return (
        <div className="mx-1 mb-3 flex flex-row gap-3">
                    <Listbox value={selectedSort} onChange={handleSort}>
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
    )
}


export default SearchSortPanel