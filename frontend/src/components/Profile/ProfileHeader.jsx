function ProfileHeader(params) {

    return (
        <>
            <div className="absolute top-16 right-0 left-0 w-full h-14 border-b-[1px] border-neutral-700 bg-neutral-900">
                <div className="flex flex-row justify-center h-full">
                    <div className="flex flex-row mx-3 w-[78.5rem]">
                        <button className=" border-neutral-200 border-0 bg-transparent rounded-none hover:border-b-4">
                            <p className="text-lg font-semibold">OVERVIEW</p>
                        </button>
                        <button className=" border-neutral-200 border-0 bg-transparent rounded-none hover:border-b-4">
                            <p className="text-lg font-semibold">POSTS</p>
                        </button>
                        <button className=" border-neutral-200 border-0 bg-transparent rounded-none hover:border-b-4">
                            <p className="text-lg font-semibold">COMMENTS</p>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProfileHeader