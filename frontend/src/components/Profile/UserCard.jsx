import profilePic from '../../assets/profile_pic.jpg'
import moment from 'moment'
import { CakeIcon } from '@heroicons/react/24/outline'

function UserCard(params) {
    
    const infoCard = params.info

    return (
        <div className="hidden md:hidden lg:flex flex-col gap-7 min-w-[20rem]">
            <div className="w-full p-4 text-start bg-neutral-900 rounded-md border border-neutral-700">
                <div className="-m-4 rounded-t-md h-20 bg-sky-500"></div>
                <div className="flex justify-start">
                    <div className="flex flex-col items-start gap-1 mb-1">
                        <img src={profilePic} alt="" className="w-24 rounded-md border-4 border-neutral-800 " />
                        <p className="text-md font-semibold text-neutral-500">u/{infoCard.username}</p>
                    </div>
                </div>
                <div className="flex flex-row border-b-2 pb-6 pt-6 border-neutral-800">
                    <div className='flex flex-col'>
                        <p className="text-lg font-semibold ">Cake day</p>
                        <div className='flex flex-row gap-1'>
                            <CakeIcon className='w-5 h-5'/>
                            <p className="text-md font-semibold text-neutral-500">{moment(infoCard.date_joined).format('MMMM Do YYYY')}</p>
                        </div>                   
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default UserCard