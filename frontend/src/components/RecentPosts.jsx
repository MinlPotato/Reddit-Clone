function RecentPosts() {

    return (
        <div className="w-full h-80 bg-neutral-900 rounded-md border border-neutral-700">
            <p className="m-3 font-semibold text-neutral-300 text-sm text-left">RECENT POSTS</p>
            <div className="mx-3">
                <div className="border-b border-neutral-700 flex flex-row gap-3">
                    <img className="w-20 object-cover mt-4 mb-7 bg-neutral-800 rounded-md border border-neutral-400"  alt="" />
                    <div className="row row-col">
                        <p className="font-medium mt-4 text-lg text-left overflow-clip">How galaxies were born born born...</p>
                        <p className=" text-left mb-3 text-neutral-500">123 points • comments 123 • 3h</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default RecentPosts