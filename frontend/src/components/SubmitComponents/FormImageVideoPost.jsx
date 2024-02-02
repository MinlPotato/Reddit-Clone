import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { PlusIcon, TagIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { useState } from "react"

function FormImageVideoPost(params) {

    const [TitleLimitNumber, setTitleLimitNumber] = useState(0)
    const [TitleLimit, setTitleLimit] = useState(false)

    const [Fields, setFields] = useState({})
    const [Errors, setErrors] = useState({})

    const handleValidation = () => {
        const formFields = { ...Fields };
        const formErrors = {};
        let formIsValid = true;

        //title
        if (!formFields["title"]) {
            formIsValid = false;
            formErrors["title"] = "Cannot be empty";
        }

        //description
        if (!formFields["description"]) {
            formIsValid = false;
            formErrors["description"] = "Cannot be empty";
        }

        setErrors(formErrors)
        return formIsValid;
    }

    const handleChange = (e) => {
        setFields({
            ...Fields,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async (e) => {
        const queryParameters = new URLSearchParams(window.location.search)
        const community_id = queryParameters.get("community")

        if (community_id === null) {
            return alert('Community not Selected.')
        }

        if (handleValidation()) {
            const title = e.target.title.value
            const description = e.target.description.value
            const user_id = userData.id

            await axios.post(`http://127.0.0.1:8000/api/posts/publish/`, {
                title,
                description,
                user_id,
                community_id
            })
                .then(async function (response) {
                    console.log('Post Submitted.');
                })
                .catch(function (error) {
                    console.log(error);
                })
        } else {
            e.preventDefault()
            alert('error')
        }



    }

    const handleTitleLimit = (e) => {
        setTitleLimitNumber(e.target.value.length)
        if (e.target.value.length === e.target.maxLength) {
            setTitleLimit(true)
        } else {
            setTitleLimit(false)
        }
    }
    
    return (
        <form onChange={handleChange} onSubmit={handleSubmit} action="" className="flex flex-col gap-5 p-3 relative">
            <input maxLength={70} onChange={handleTitleLimit} type="text" name="title" id="title" placeholder="Title"
                className={TitleLimit ? "w-full bg-transparent rounded-md focus:border-red-500 focus:ring-0 " : "w-full bg-transparent rounded-md border-neutral-700 "} />
            <p className="absolute right-6 top-5 text-neutral-500">{TitleLimitNumber}/70</p>
            <input type="file" name="file" id="file" />
            <textarea name="description" id="description" placeholder="Text (optional)"
                className="w-full min-h-[17rem] bg-transparent border rounded-md border-neutral-700 text-base" />
            <div className="flex flex-row flex-wrap gap-3 justify-start border-b-2 border-neutral-700 pb-5">
                <div>
                    <input name="spoiler" id="spoiler" type="checkbox" className="hidden peer" />
                    <label htmlFor="spoiler" type="button" className="flex flex-row px-5 py-3 items-center gap-1 peer-checked:text-black peer-checked:bg-white border border-neutral-700 rounded-full">
                        <PlusIcon className="w-7 h-7" />
                        <p className="text-inherit  text-lg font-semibold">Spoiler</p>
                    </label>
                </div>
                <div>
                    <input name="nsfw" id="nsfw" type="checkbox" className="hidden peer" />
                    <label htmlFor="nsfw" type="button" className="flex flex-row px-5 py-3 items-center gap-1 peer-checked:text-black peer-checked:bg-white border border-neutral-700 rounded-full">
                        <PlusIcon className="w-7 h-7" />
                        <p className="text-inherit  text-lg font-semibold">NSFW</p>
                    </label>
                </div>

                <button type="button" disabled className="flex flex-row items-center gap-2 border border-neutral-700 rounded-full">
                    <TagIcon className=" w-7 h-7 stroke-neutral-600" />
                    <p className="text-neutral-600 text-lg">Flair</p>
                    <ChevronDownIcon className=" w-7 h-7 fill-neutral-600" />
                </button>
            </div>
            <div className="flex flex-row gap-3 h-12 justify-end items-center">
                <button type="button" className="h-full flex items-center rounded-full bg-transparent border border-neutral-700">
                    <p className="text-neutral-400 text-lg">Save Draft</p>
                </button>
                <input type="submit" value="Post" className="h-full w-20 text-center text-xl text-black items-center bg-neutral-100 rounded-full" />
            </div>
        </form>
    )
}

export default FormImageVideoPost