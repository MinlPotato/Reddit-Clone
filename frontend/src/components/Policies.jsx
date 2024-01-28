function Policies(params) {

    return (
        <div className="sticky top-20 flex flex-col w-full bg-neutral-900 rounded-md border border-neutral-700">
            <div className="m-3 flex flex-row justify-center border-b">
                <div className="flex w-1/2 flex-col text-left gap-2 mb-3">
                    <a className="text-neutral-300 w-fit hover:text-neutral-200">User Agreement</a>
                    <a className="text-neutral-300 w-fit hover:text-neutral-200">Privacy Policy</a>
                </div>
                <div className="flex w-1/2 flex-col text-left gap-2 mb-3">
                    <a className="text-neutral-300 w-fit hover:text-neutral-200">Content Policy</a>
                    <a className="text-neutral-300 w-fit hover:text-neutral-200">Moderator Code Of Conduct</a>
                </div>

            </div>
            <div className="m-3 flex flex-row justify-center border-b">
                <div className="flex w-1/2 flex-col text-left gap-2 mb-3">
                    <a className="text-neutral-300 w-fit hover:text-neutral-200">English</a>
                    <a className="text-neutral-300 w-fit hover:text-neutral-200">Francais</a>
                    <a className="text-neutral-300 w-fit hover:text-neutral-200">Italiano</a>
                </div>
                <div className="flex w-1/2 flex-col text-left gap-2 mb-3">
                    <a className="text-neutral-300 w-fit hover:text-neutral-200">Deutsch</a>
                    <a className="text-neutral-300 w-fit hover:text-neutral-200">Español</a>
                    <a className="text-neutral-300 w-fit hover:text-neutral-200">Portugues</a>
                </div>

            </div>
            <p className="text-left m-3">Reddit, Inc. © 2023. All rights reserved.</p>
        </div>
    )
}

export default Policies