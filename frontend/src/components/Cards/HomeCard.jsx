import { Link } from "react-router-dom"
import { useState } from "react"
import CreateCommunity from "../Community/CreateCommunity"
import snooSmiling from "../../assets/snoo-smiling.png"

function HomeCard() {


    const [Create, setCreate] = useState(false)

    return (
        <>
            {Create && <CreateCommunity info={{setActive: setCreate, Active: Create}}/>}

            <div className="p-3 flex flex-col gap-3 text-start w-full min-h-[5rem] bg-neutral-900 rounded-md border border-neutral-700">
                <div className=" -m-3 -mb-10 rounded-t-md h-14 bg-sky-500"></div>
                <div className="flex flex-row items-end ">
                    <img src={snooSmiling} alt="" className="w-14 -scale-x-100" />
                    <p className="text-xl font-semibold">Home</p>
                </div>
                
                <p className="text-lg font-semibold border-b-2 pb-3 border-neutral-700">
                    Your personal Reddit frontpage. Come here to check in with your favorite communities.
                </p>
                <div className="flex flex-col gap-4 mt-2">
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