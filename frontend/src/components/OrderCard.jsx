import { FireIcon, ClockIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline"


function OrderCard(params) {
    

    return (
        <div className="flex flex-row items-center w-full gap-3 px-2 py-1 bg-neutral-900 rounded-md border border-neutral-700">
            <button className="flex flex-row items-center gap-2 rounded-full border-transparent bg-transparent hover:bg-neutral-800">
                <FireIcon className="w-8 h-8 stroke-neutral-500"/>
                <p className="text-lg font-semibold text-neutral-500">Hot</p>
            </button>
            <button className="flex flex-row items-center gap-2 rounded-full border-transparent bg-transparent hover:bg-neutral-800">
                <ClockIcon className="w-8 h-8 stroke-neutral-500"/>
                <p className="text-lg font-semibold text-neutral-500">New</p>
            </button>
            <button className="flex flex-row items-center gap-2 rounded-full border-transparent bg-transparent hover:bg-neutral-800">
                <ArrowTrendingUpIcon className="w-8 h-8 stroke-neutral-500"/>
                <p className="text-lg font-semibold text-neutral-500">Top</p>
            </button>
        </div>
    )
}

export default OrderCard