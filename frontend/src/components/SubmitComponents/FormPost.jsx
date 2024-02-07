import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { PlusIcon, TagIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { useState, useEffect } from "react"
import QuillTextArea from "../QuillTextArea"
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux"
import { getUserData } from "../State/Counter/AuthUser"

function FormPost() {

    const userData = useSelector(getUserData)

    const [TitleLimitNumber, setTitleLimitNumber] = useState(0)
    const [TitleLimit, setTitleLimit] = useState(false)

    const [Fields, setFields] = useState({})
    const [Errors, setErrors] = useState([])

    const [TextAreaValue, setTextAreaValue] = useState('')
    const [TextTitleValue, setTextTitleValue] = useState('')

    useEffect(() => {
        setFields({
            title: TextTitleValue,
            description: TextAreaValue
        })

    }, [TextAreaValue, TextTitleValue])

    const handleValidation = () => {
        const formFields = { ...Fields }
        const formErrors = []
        let formIsValid = true

        //title
        if (!formFields["title"]) {
            formIsValid = false
            formErrors.push({ name: 'title', message: 'Cannot be empty' })
        }

        //description
        if (!formFields["description"]) {
            formIsValid = false;
            formErrors.push({ name: 'description', message: 'Cannot be empty' })
        }

        setErrors(formErrors)
        return formIsValid;
    }


    const handleSubmit = async (e) => {
        const queryParameters = new URLSearchParams(window.location.search)
        const community_id = queryParameters.get("community")

        if (community_id === null) {
            return alert('Community not Selected.')
        }

        if (handleValidation()) {
            const title = TextTitleValue
            const description = TextAreaValue
            const user_id = userData.id

            await axios.post(`http://127.0.0.1:8000/api/posts/publish/`, {
                title,
                description,
                user_id,
                community_id
            })
                .then(async function () {
                    e.preventDefault()
                    console.log('Post Submitted.');
                    setTextAreaValue('')
                    setTextTitleValue('')
                })
                .catch(function (error) {
                    console.log(error);
                })
        } else {
            e.preventDefault()
        }
    }

    const handleTitle = (e) => {
        setTextTitleValue(e.target.value)
        setTitleLimitNumber(e.target.value.length)
        if (e.target.value.length === e.target.maxLength) {
            setTitleLimit(true)
        } else {
            setTitleLimit(false)
        }
    }

    const QuillTextAreaInfo = { 
        value: TextAreaValue, 
        setValue: setTextAreaValue,
        placeholder: 'Text (optional)' 
    }

    return (
        <>
            <form onSubmit={handleSubmit} action="" className="flex flex-col gap-5 p-3 relative">
                
                <input maxLength={70} onChange={handleTitle} value={TextTitleValue} type="text" name="title" id="title" placeholder="Title"
                    className={TitleLimit ? "w-full bg-transparent rounded-md focus:border-red-500 focus:ring-0 " : "w-full bg-transparent rounded-md border-neutral-700 "} />
                <p className="absolute right-6 top-5 text-neutral-500">{TitleLimitNumber}/70</p>

                <QuillTextArea info={QuillTextAreaInfo} />

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

export default FormPost