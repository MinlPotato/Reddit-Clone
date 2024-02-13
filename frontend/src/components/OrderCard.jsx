import { FireIcon, ClockIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline"
import { useNavigate, useLocation } from "react-router-dom"

function OrderCard() {

    const navigate = useNavigate()
    const location = useLocation()

    const handleChange = (e) => {
        navigate(location.pathname+`?sort=${e.target.value}`)
    }

    return (
        <div className="flex flex-row items-center w-full gap-3 px-2 py-3 bg-neutral-900 rounded-md border border-neutral-700">
            <ul className="flex flex-row gap-3 w-full sm:justify-start justify-center">
                <div>
                    <input defaultChecked onChange={handleChange} type="radio" name="orderSelect" id="hot" value='Hot' className="hidden peer" />
                    <label htmlFor="hot" 
                        className="flex flex-row items-center gap-1 rounded-full py-2 px-4 
                    peer-checked:bg-neutral-800 hover:bg-neutral-800 stroke-neutral-500 peer-checked:stroke-white text-neutral-500 peer-checked:text-white">
                        <FireIcon className="w-8 h-8  stroke-inherit" />
                        <p className="text-lg font-semibold text-inherit">Hot</p>
                    </label>
                </div>
                <div>
                    <input onChange={handleChange} type="radio" name="orderSelect" id="new" value='New' className="hidden peer" />
                    <label htmlFor="new"
                        className="flex flex-row items-center gap-1 rounded-full py-2 px-4 
                    peer-checked:bg-neutral-800 hover:bg-neutral-800 stroke-neutral-500 peer-checked:stroke-white text-neutral-500 peer-checked:text-white">
                        <ClockIcon className="w-8 h-8 stroke-inherit" />
                        <p className="text-lg font-semibold text-inherit">New</p>
                    </label>
                </div>
                <div>
                    <input onChange={handleChange} type="radio" name="orderSelect" id="top" value='Top' className="hidden peer" />
                    <label htmlFor="top"
                        className="flex flex-row items-center gap-1 rounded-full py-2 px-4 
                    peer-checked:bg-neutral-800 hover:bg-neutral-800 stroke-neutral-500 peer-checked:stroke-white text-neutral-500 peer-checked:text-white">
                        <ArrowTrendingUpIcon className="w-8 h-8 stroke-inherit" />
                        <p className="text-lg font-semibold text-inherit">Top</p>
                    </label>
                </div>
            </ul>       
        </div>
    )
}

export default OrderCard