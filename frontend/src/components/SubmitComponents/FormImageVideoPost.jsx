import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { PlusIcon, TagIcon, PhotoIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { getUserData } from "../State/Slices/AuthUser"
import { useNavigate } from "react-router-dom"

function FormImageVideoPost() {

    const userData = useSelector(getUserData)

    const [TitleLimitNumber, setTitleLimitNumber] = useState(0)
    const [TitleLimit, setTitleLimit] = useState(false)
    const [ImageData, setImageData] = useState(null)

    const [Fields, setFields] = useState({})
    const [Errors, setErrors] = useState({})

    const handleValidation = () => {
        const formFields = { ...Fields };
        const formErrors = []
        let formIsValid = true;

        //community
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

        //file
        if (!formFields["file"]) {
            formIsValid = false
            formErrors.push({ name: 'file', message: 'Cannot be empty.' })
        }

        setErrors(formErrors)
        return [formIsValid, formErrors]
    }

    const handleChange = (e) => {
        setFields({
            ...Fields,
            [e.target.name]: e.target.value
        })
    }

    const HandleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const url = URL.createObjectURL(event.target.files[0])
            console.log(event.target.files);
            //fetch(event.target.files)
            setImageData(url);
            handleChange(event)

            return event.target.files
        }
    }

    const handleSubmit = async (e) => {
        
        const [formIsValid, formErrors] = handleValidation()

        if (formIsValid) {
            const queryParameters = new URLSearchParams(window.location.search)
            const community_id = queryParameters.get("community")

            const title = e.target.title.value
            const user_id = userData.id
            const image = e.target.file.files[0]
            const spoiler = e.target.spoiler.checked
            const nsfw = e.target.nsfw.checked


            await axios.post(`http://127.0.0.1:8000/api/posts/publish/`, {
                title,
                image,
                spoiler,
                nsfw,
                user_id,
                community_id,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(async function () {
                    console.log('Post Submitted.');
                })
                .catch(function (error) {
                    console.log(error);
                })
        } else {
            e.preventDefault()
            for (let index = 0; index < formErrors.length; index++) {
                alert(`${formErrors[index].name}: ${formErrors[index].message}`)
            }
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
                className={TitleLimit ? "w-full p-2 border bg-transparent rounded-md focus:border-red-500 focus:ring-0 " : "w-full p-2 bg-transparent placeholder:text-neutral-500 rounded-md border border-neutral-700 "} />
            <p className="absolute right-6 top-5 text-neutral-500">{TitleLimitNumber}/70</p>

            <div className="flex flex-col items-center ">
                <label
                    htmlFor="file"
                    className="mt-4 flex w-full gap-2 flex-col text-sm leading-6 items-center text-gray-600"
                >
                    {ImageData == null ? (
                        <div className="flex items-center w-full h-72 rounded-md border-dashed border  border-neutral-500">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300 stroke-neutral-700" aria-hidden="true" />
                        </div>
                    ) : (<img className="max-h-80 w-fit" src={ImageData} alt=""></img>)}
                    <span className="text-neutral-500 font-semibold hover:text-white">Upload a file</span>
                    <input id="file" name="file" accept="image/jpeg,image/png" onChange={HandleImageChange} type="file" className="sr-only" />
                </label>


                <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 10MB</p>
            </div>
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
    )
}

export default FormImageVideoPost