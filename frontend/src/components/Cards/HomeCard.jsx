import { Link } from "react-router-dom"
import { useState } from "react"
import CreateCommunity from "../Community/CreateCommunity"
import snooSmiling from "../../assets/snoo-smiling.png"
import homeBanner from "../../assets/home-banner@2x.png"

function HomeCard() {


    const [Create, setCreate] = useState(false)

    return (
        <>
            {Create && <CreateCommunity info={{setActive: setCreate, Active: Create}}/>}

            <div className=" flex flex-col gap-3 text-start justify-center items-center w-full min-h-[5rem] bg-neutral-900 rounded-md border border-neutral-700">
                <img src={homeBanner}  className="-mx-3 -mb-10 h-14 rounded-t-md object-cover"></img>
                <div className="flex flex-row w-full items-end">
                    <img src={snooSmiling} alt="" className="w-14 -scale-x-100" />
                    <p className="text-xl font-semibold">Home</p>
                </div>
                
                <p className="mx-5 text-lg font-semibold border-b-2 pb-3 border-neutral-700">
                    Your personal Reddit frontpage. Come here to check in with your favorite communities.
                </p>
                <div className="flex flex-col w-full p-3 gap-4">
                    <Link to={`/reddit/submit`} className='w-full p-2 flex flex-row justify-center items-center rounded-full bg-white hover:bg-neutral-200 hover:border-transparent'>
                        <p className='text-xl text-black'>Create Post</p>
                    </Link>
                    <button onClick={() => setCreate(true)} className='w-full p-2 flex flex-row justify-center items-center rounded-full hover:bg-neutral-800 border border-white'>
                        <p className='text-xl font-semibold'>Create Community</p>
                    </button>
                </div>

            </div>        
        </>

    )
}

export default HomeCard