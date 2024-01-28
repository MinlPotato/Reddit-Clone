import profileImg from "../assets/profile_pic.jpg"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { PhotoIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./State/Counter/AuthUser";

function CreatePost(params) {

    const userData = useSelector(getUserData)
    const navigate = useNavigate()

    return (
        <div className="flex flex-row items-center w-full h-20 gap-3 px-2 bg-neutral-900 rounded-md border border-neutral-700">
            {userData.isLogged ? (
                <>
                    <img className="w-16 h-16 rounded-full" src={profileImg} alt="" />
                    <input onClick={() => navigate('/reddit/submit')} className="h-11 w-10/12 text-lg placeholder:text-neutral-500 pl-6 bg-neutral-600/25 border border-neutral-700 rounded-md" type="text" placeholder="Create Post" />
                    <button onClick={() => navigate('/reddit/submit')} className="w-14 h-14 p-3 flex items-center bg-transparent hover:bg-neutral-800 border-transparent">
                        <PhotoIcon className="w-full h-full stroke-neutral-500" />
                    </button>
                    <button onClick={() => navigate('/reddit/submit')} className="w-14 h-14 p-3 flex items-center bg-transparent hover:bg-neutral-800 border-transparent">
                        <LinkIcon className="w-full h-full stroke-neutral-500" />
                    </button>
                </>

            ) : (
                <p className="text-2xl font-semibold my-4">Log In to Create Post</p>
            )}

        </div>
    )
}

export default CreatePost