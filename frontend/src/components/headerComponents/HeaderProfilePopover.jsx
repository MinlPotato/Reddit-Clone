import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { CircleStackIcon, UserCircleIcon, ArrowLeftStartOnRectangleIcon, EyeIcon } from "@heroicons/react/24/outline"
import ProfilePic from "../../assets/profile_pic.jpg"
import { useSelector, useDispatch } from "react-redux";
import { getUserData, logout } from "../State/Counter/AuthUser";
import { Popover } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function HeaderProfilePopover(params) {

    const data = useSelector(getUserData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const myStuffButtons = [
        {
            id: 1,
            text: "Online Status",
            checkbox: true,
            url: null
        },
        {
            id: 2,
            text: "Profile",
            checkbox: false,
            url: `/reddit/user/${data.id}`
        },
        {
            id: 3,
            text: "User Settings",
            checkbox: false,
            url: null
        }
    ]

    const [OnlineStatus, setOnlineStatus] = useState(true)

    return (
        <Popover className="w-1/6 my-2 flex items-center ">
            <Popover.Button className='p-0 w-full flex flex-row items-center xl:justify-between justify-center border-transparent bg-transparent hover:bg-neutral-800 hover:border-transparent'>
                <div className='flex flex-row items-center gap-3'>
                    <img className='object-cover min-h-full w-10 h-10 rounded-full' src={ProfilePic} alt="" />
                    <div className='hidden 2xl:flex flex-col'>
                        <p>{data.username}</p>
                        <div className='flex flex-row items-center gap-1'>
                            <CircleStackIcon className="w-4 h-4" />
                            <p className='text-sm'>Karma</p>
                        </div>
                    </div>
                </div>
                <ChevronDownIcon className="w-8 h-8 hidden xl:block" />
            </Popover.Button>
            <Popover.Panel className="absolute right-0 top-full mt-3 mx-4 w-[19.5rem] h-fit max-w-md rounded-md overflow-auto bg-neutral-900 border border-neutral-700 ">
                <div className='flex flex-col w-full'>
                    <div className="border-b-2 border-neutral-800">
                        <div className='flex flex-row gap-4 h-14 items-center px-5'>
                            <UserCircleIcon className=" w-7 h-7 stroke-neutral-500" />
                            <p className='text-neutral-400 text-lg'>My Stuff</p>
                        </div>
                        {myStuffButtons.map((buttonInfo) => buttonInfo.checkbox ? (
                            <button key={buttonInfo.id} className='flex flex-row justify-between h-14 w-full items-center px-5 border-transparent bg-transparent hover:bg-neutral-800 hover:border-transparent'>
                                <p className=' text-neutral-300 text-lg ml-11'>{buttonInfo.text}</p>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </button>
                        ) : (
                            <Link to={buttonInfo.url} key={buttonInfo.id} className='flex flex-row gap-9 h-14 items-center px-5 bg-transparent hover:bg-neutral-800 hover:border-transparent'>
                                <p className=' text-neutral-300 text-lg ml-11'>{buttonInfo.text}</p>
                            </Link>
                        ))}
                    </div>
                    <div className="border-b-2 border-neutral-800">
                        <div className='flex flex-row gap-4  h-14 items-center px-5'>
                            <EyeIcon className=" w-7 h-7 stroke-neutral-500" />
                            <p className='text-neutral-400 text-lg'>View Options</p>
                        </div>
                        <button className='flex flex-row justify-between h-14 w-full items-center px-5 border-transparent bg-transparent hover:bg-neutral-800 hover:border-transparent'>
                            <p className=' text-neutral-300 text-lg ml-11'>Dark Mode</p>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </button>
                    </div>


                    <button onClick={() => { dispatch(logout()); navigate('/') }} className='flex flex-row h-14 gap-4 items-center px-5 mt-5 border-transparent bg-transparent stroke-neutral-500 hover:stroke-red-500  hover:text-red-500 hover:bg-neutral-800 hover:border-transparent'>
                        <ArrowLeftStartOnRectangleIcon className=" w-7 h-7  stroke-inherit" />
                        <p className='text-inherit text-lg'>Logout</p>
                    </button>
                </div>
            </Popover.Panel>
        </Popover>
    )
}

export default HeaderProfilePopover