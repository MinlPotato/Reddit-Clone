import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import subreddit from "../../assets/subreddit.png"
import { useNavigate } from "react-router-dom";
import { getCommunities, getCommunitiesJoinedByUser, getCommunity } from "../services/communityService";
import { useSelector } from "react-redux";
import { getUserData } from "../State/Slices/AuthUser";

function SelectCommunityPanel() {

  const navigate = useNavigate()
  const userData = useSelector(getUserData)

  const [Communities, setCommunities] = useState(null)
  const [selected, setSelected] = useState(null);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    const community_id = queryParameters.get("community")

    if (userData.isLogged) {
      getCommunitiesJoinedByUser(userData.id).then((response) => {
        setCommunities(response)
        if (!community_id == null || !community_id == '') {
          const active_community = response.find((element) => element.id == community_id)
          if (active_community) {
            setSelected(active_community)
          } else {
            getCommunity(community_id).then((response) => setSelected(response))
          }
        }
      })
    }
  }, [])


  const handleChange = (e) => {
    setSelected(e)
    navigate(`/reddit/submit?community=${e.id}`)
  }

  return Communities && (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <div className="relative mt-2">
            <Listbox.Button className="sm:w-1/2 h-12 w-full flex flex-row items-center rounded-t-md rounded-b-none justify-between bg-neutral-900 border border-neutral-700">
              <div className="flex flex-row items-center gap-2">
                {selected ? (
                  <>
                    <img src={subreddit} alt="" className="w-8" />
                    <p className="text-lg">{selected.name}</p>
                  </>
                ) : (
                  <>
                    <EllipsisHorizontalCircleIcon className="w-8 stroke-neutral-400" />
                    <p className="text-lg">Choose a community</p>
                  </>
                )}
              </div>
              <ChevronDownIcon className="w-8" />
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute list-none z-50 p-y max-h-56 sm:w-1/2 w-full overflow-auto rounded-b-md bg-neutral-900 border-t-0 border border-neutral-700 py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <p className="text-md mt-3 mb-1 pl-5 font-semibold text-start text-neutral-500">YOUR COMMUNITIES</p>
                {Communities.map((community) => (
                  <Listbox.Option
                    className={({ active }) =>
                      classNames(
                        active ? "bg-neutral-800 text-white" : "text-neutral-500",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }

                    value={community}
                    key={community.id}
                  >
                    <div className="flex flex-row gap-2 items-center justify-start">
                      <img src={subreddit} alt="" className="w-10 h-10" />
                      <div className="flex flex-col justify-start">
                        <p className="text-inherit text-lg text-start">{community.name}</p>
                        <p className="text-neutral-500 text-md text-start">0 Members</p>
                      </div>
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>

            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

export default SelectCommunityPanel;
