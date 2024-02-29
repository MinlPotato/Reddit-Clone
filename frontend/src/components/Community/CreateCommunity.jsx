import { XMarkIcon } from "@heroicons/react/24/outline"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function CreateCommunity(params) {

    const info = params.info
    const navigate = useNavigate()

    let setActive = info.setActive

    const [CommunityName, setCommunityName] = useState('')
    const [CommunityNameLength, setCommunityNameLength] = useState(0)
    const [CommunityNameAlert, setCommunityNameAlert] = useState(false)

    const handleLeave = () => {
        setActive(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const name = e.target.name.value
        const description = e.target.description.value

        if (name.length <= 0) {

            setCommunityNameAlert(true)
            return
        }

        await axios.post(`http://127.0.0.1:8000/api/communities/publish/`, {
            name,
            description
        }).then(async function (response) {
            const data = await response.data
            navigate(`/reddit/r/${data.id}`)
            setActive(false)
        }).catch(function (error) {
            console.log(error);
        })
    }

    useEffect(() => {
        setCommunityNameLength(CommunityName.length)
    }, [CommunityName])


    return (
        <>
            <div className="z-10 fixed-center w-full h-full bg-black opacity-60"></div>
            <form onSubmit={handleSubmit} className="z-20 fixed-center w-full sm:w-3/4 xl:w-1/3 h-5/6 sm:h-2/3 bg-neutral-900 border border-neutral-700 rounded-md">
                <div className="flex flex-col w-full h-[87.5%] gap-5 p-6">
                    <div className="flex flex-row justify-between items-center pb-3 border-b-2 border-neutral-800">
                        <p className="text-start text-xl font-semibold">Create a community</p>
                        <button onClick={handleLeave} className="p-2 rounded-full border transition-all hover:border-white bg-transparent stroke-neutral-500 hover:stroke-white">
                            <XMarkIcon className="w-6 h-6 stroke-inherit" />
                        </button>
                    </div>
                    <div className="flex flex-col justify-start gap-5 text-start">
                        <div className="flex flex-col items-start">
                            <p className="text-xl font-semibold">Name</p>
                            <p className="text-neutral-500">Community names including capitalization cannot be changed.</p>
                        </div>
                        <div className="flex flex-col items-start w-full gap-2">
                            <input onChange={(e) => setCommunityName(e.target.value)} maxLength={21} type="text" placeholder="r/" name="name" id="name"
                                className="py-3 px-5 w-full bg-transparent rounded-md border border-neutral-700 text-white placeholder:text-neutral-500" />
                            <p className="text-neutral-500">{21 - CommunityNameLength} Characters remaining</p>
                            {CommunityNameAlert && <p className="text-red-500">A community name is required</p>}
                        </div>
                        <div className="flex flex-col items-start gap-2 w-full">
                            <p className="text-xl font-semibold">Description</p>
                            <textarea name="description" id="description" placeholder="description (optional)"
                                className="p-3 w-full h-full min-h-[12rem] max-h-[12rem] rounded-md bg-transparent border border-neutral-700 text-white placeholder:text-neutral-500"></textarea>
                        </div>

                    </div>

                </div>
                <div className="flex flex-row justify-end py-4 gap-5 px-6 w-full h-[12.5%] bg-neutral-800 rounded-b-md">
                    <button onClick={handleLeave} className="rounded-full bg-transparent border-white">
                        <p className="text-lg text-white font-semibold">Cancel</p>
                    </button>
                    <input className="rounded-full text-lg font-semibold bg-white text-black px-5" type="submit" value="Create Community" />
                </div>
            </form>
        </>
    )
}


export default CreateCommunity