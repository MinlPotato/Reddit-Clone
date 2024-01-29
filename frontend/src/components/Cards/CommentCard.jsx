import { useState } from 'react'
import profilePic from '../../assets/profile_pic.jpg'

function CommentCard(params) {
    
    const [Hide, setHide] = useState(false)

    return (
        <>  
            <div className="flex flex-row items-center gap-2">
                <img src={profilePic} alt="" className='rounded-full w-10 h-10' />
                <div className='flex flex-row items-center gap-2 '>
                    <p className='font-semibold'>username</p>
                    <p className='text-neutral-500'>·</p>
                    <p className='text-neutral-500'>date</p>
                </div>               
            </div>
            <div className='flex flex-row gap-7 pl-4'>
                <div onClick={() => setHide(true)} className='w-[2px] h-20 bg-neutral-500 hover:bg-white'></div>
                <p hidden={Hide} className='text-start font-semibold text-lg'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex veniam sint, reiciendis error adipisci quas amet cum laborum aperiam ratione.
                </p>
            </div>
            
        </>
    )
}

export default CommentCard