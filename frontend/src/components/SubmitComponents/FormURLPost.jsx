import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { PlusIcon, TagIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { useState, useEffect } from "react"
import QuillTextArea from "../QuillTextArea"
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux"
import { getUserData } from "../State/Slices/AuthUser"

function FormURLPost() {

    const userData = useSelector(getUserData)

    const [TitleLimitNumber, setTitleLimitNumber] = useState(0)
    const [TitleLimit, setTitleLimit] = useState(false)

    const [Fields, setFields] = useState({})
    const [Errors, setErrors] = useState([])


    const handleChange = (e) => {
        setFields({
            ...Fields,
            [e.target.name]: e.target.value
        })
    }

    function isURL(str) {
        let urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlRegex.test(str);
    }

    const handleValidation = () => {
        const formFields = { ...Fields }
        const formErrors = []
        let formIsValid = true

        //community id
        const queryParameters = new URLSearchParams(window.location.search)
        const community_id = queryParameters.get("community")

        if (community_id === null) {
            formIsValid = false
            formErrors.push({ name: 'community', message: 'Community not selected' })
        }

        //title
        if (!formFields["title"]) {
            formIsValid = false
            formErrors.push({ name: 'title', message: 'Cannot be empty.' })
        }

        //url
        if (!formFields["url"]) {
            formIsValid = false;
            formErrors.push({ name: 'url', message: 'Cannot be empty.' })

        }
        if (isURL(formFields["url"]) == false) {
            formIsValid = false;
            formErrors.push({ name: 'url', message: 'link does not look right.' })
        }

        setErrors(formErrors)
        return [formIsValid, formErrors]
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const [formIsValid, formErrors] = handleValidation()

        if (formIsValid) {
            const queryParameters = new URLSearchParams(window.location.search)
            const community_id = queryParameters.get("community")

            const title = Fields.title
            const link = Fields.url
            const user_id = userData.id
            const spoiler = e.target.spoiler.checked
            const nsfw = e.target.nsfw.checked

            await axios.post(`http://127.0.0.1:8000/api/posts/publish/`, {
                title,
                link,
                spoiler,
                nsfw,
                user_id,
                community_id
            })
                .then(async function () {
                    console.log('Post Submitted.');
                })
                .catch(function (error) {
                    console.log(error);
                })
        } else {
            for (let index = 0; index < formErrors.length; index++) {
                alert(`${formErrors[index].name}: ${formErrors[index].message}`)
            }
        }
    }

    const handleTitle = (e) => {
        setTitleLimitNumber(e.target.value.length)
        if (e.target.value.length === e.target.maxLength) {
            setTitleLimit(true)
        } else {
            setTitleLimit(false)
        }
    }

    return (
        <>
            <form onChange={handleChange} onSubmit={handleSubmit} action="" className="flex flex-col gap-5 p-3 relative">

                <input maxLength={70} onChange={handleTitle} type="text" name="title" id="title" placeholder="Title"
                    className={TitleLimit ? "w-full p-2 bg-transparent rounded-md border focus:border-red-500 focus:ring-0 " : "w-full p-2 bg-transparent placeholder:text-neutral-500 rounded-md border border-neutral-700 "} />
                <p className="absolute right-6 top-5 text-neutral-500">{TitleLimitNumber}/70</p>

                <textarea name="url" id="url" placeholder="Url"
                    className="p-3 w-full h-full min-h-[5rem] max-h-[6rem] rounded-md bg-transparent border border-neutral-700 text-white placeholder:text-neutral-500"></textarea>

                <div className="flex flex-row flex-wrap gap-3 justify-start border-b-2 border-neutral-700 pb-5">
                    <div>
                        <input name="spoiler" id="spoiler" type="checkbox" className="hidden peer" />
                        <label htmlFor="spoiler" type="button" className="flex flex-row px-5 py-2 items-center gap-1 peer-checked:text-black peer-checked:bg-white border border-neutral-700 rounded-full">
                            <PlusIcon className="w-7 h-7" />
                            <p className="text-inherit  text-lg font-semibold">Spoiler</p>
                        </label>
                    </div>
                    <div>
                        <input name="nsfw" id="nsfw" type="checkbox" className="hidden peer" />
                        <label htmlFor="nsfw" type="button" className="flex flex-row px-5 py-2 items-center gap-1 peer-checked:text-black peer-checked:bg-red-500 border border-neutral-700 peer-checked:border-none rounded-full">
                            <PlusIcon className="w-7 h-7" />
                            <p className="text-inherit  text-lg font-semibold">NSFW</p>
                        </label>
                    </div>
                </div>
                <div className="flex flex-row justify-end items-center">
                    <input type="submit" value="Post" className="h-full py-2 px-7 text-center font-semibold text-xl text-black items-center bg-neutral-100 hover:bg-neutral-300 rounded-full" />
                </div>
            </form>
            {Errors ? (
                Errors.map((error, index) => (
                    <div key={index} className="fixed right-5 w-1/3 bottom-0 p-4 mb-4 text-md text-white rounded-lg bg-red-500">
                        <span className="font-medium">Form error!</span> {error.name} {error.message}.
                    </div>
                ))
            ) : <></>}
        </>
    )
}

export default FormURLPost