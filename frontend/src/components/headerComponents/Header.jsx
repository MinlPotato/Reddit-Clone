
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid"
import { ChatBubbleOvalLeftEllipsisIcon, BellIcon, PlusIcon, MegaphoneIcon } from "@heroicons/react/24/outline"
import { useSelector } from "react-redux";
import { getUserData } from "../State/Counter/AuthUser"
import HeaderProfilePopover from './HeaderProfilePopover';
import RedditLogo from '../../assets/reddit-logo.png'
import { useNavigate } from "react-router-dom";
import HeaderHomePopover from "./HeaderHomePopover";

function Header() {

    const data = useSelector(getUserData)
    const navigate = useNavigate()

    const Buttons = [
        {
            id: 1,
            svg: <ArrowTrendingUpIcon className="absolute w-6 h-6" />,
            url: "",
            text: "Popular"
        },
        {
            id: 2,
            svg: <ChatBubbleOvalLeftEllipsisIcon className="absolute w-6 h-6" />
            ,
            url: "",
            text: "Chat"
        },
        {
            id: 3,
            svg: <BellIcon className="absolute w-6 h-6" />,
            url: "",
            text: "Notification"
        },
        {
            id: 4,
            svg: <PlusIcon className="absolute w-6 h-6" />,
            url: "reddit/submit"
        },
    ]

    const HandleSubmit = () => {
        navigate('/reddit/search')
    }

    return (

        <header className="z-20 fixed flex flex-row  gap-4 w-full h-16 left-0 top-0 px-5 bg-neutral-900 border-b border-neutral-700 ">
            <a href="/" className='flex-none  w-12 h-12 inset-0 mt-2 items-center rounded-full'>
                <img className="min-h-full min-w-full" src={RedditLogo} alt="" />
            </a>

            <HeaderHomePopover />
            
            <form onSubmit={HandleSubmit} className='w-full md:w-2/5 my-2 flex flex-row pointer-events-auto items-center bg-neutral-800 rounded-full border border-neutral-700'>
                <input type="submit" id="searchSubmit" className="hidden" />
                <label htmlFor="searchSubmit" className="absolute ml-3 w-8 h-8 pointer-events-none"><MagnifyingGlassIcon className=" fill-neutral-500" /></label>
                <input type="search" name="q" id="q" className='pl-14 h-full w-full rounded-full placeholder:text-neutral-500 bg-transparent focus:outline-none' placeholder='Search Reddit' />
            </form>

            <div className='hidden md:flex flex-row items-center my-4 gap-2'>
                {Buttons.map((buttonInfo) => (
                    <Link to={buttonInfo.url || '/'} key={buttonInfo.id} className='w-12 h-12 flex items-center justify-center border-neutral-700 bg-transparent hover:bg-neutral-800 hover:border-transparent'>
                        {buttonInfo.svg}
                    </Link>
                ))}
            </div>

            <button className='hidden sm:flex flex-row items-center rounded-full bg-neutral-800 my-2 border border-neutral-700 bg-transparent hover:bg-neutral-800 hover:border-transparent'>
                <MegaphoneIcon className="w-6 h-6" />
                <p className='hidden text-lg ml-3 visible md:hidden lg:block'>Advertise</p>
            </button>

            {data.isLogged ? (
                <HeaderProfilePopover />
            ) : (
                <div className='w-1/6 px-5 flex flex-row justify-around gap-5'>
                    <Link to={"/login"} className='w-1/2 flex flex-row justify-center items-center rounded-full bg-orange-500 my-2 hover:bg-orange-600 hover:border-transparent'>
                        <p className='text-lg text-white'>Log In</p>
                    </Link>
                    <Link to={"/register"} className='w-1/2 flex flex-row justify-center items-center rounded-full my-2 border bg-transparent hover:bg-neutral-800 hover:border-transparent'>
                        <p className='text-lg text-white'>Register</p>
                    </Link>
                </div>
            )}

        </header>
    )
}

export default Header