import { PlusIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { useState, useEffect } from "react"
import QuillTextArea from "../QuillTextArea"
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux"
import { getUserData } from "../State/Slices/AuthUser"

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
            formErrors.push({ name: 'title', message: 'Cannot be empty' })
        }

        //description
        if (!formFields["description"]) {
            formIsValid = false;
            formErrors.push({ name: 'description', message: 'Cannot be empty' })
        }

        setErrors(formErrors)
        return [formIsValid, formErrors]
    }


    const handleSubmit = async (e) => {
         const [formIsValid, formErrors] = handleValidation()

         console.log(formIsValid);
         
        if (formIsValid) {
            const queryParameters = new URLSearchParams(window.location.search)
            const community_id = queryParameters.get("community")

            const title = TextTitleValue
            const description = TextAreaValue
            const user_id = userData.id
            const spoiler = e.target.spoiler.checked
            const nsfw = e.target.nsfw.checked

            await axios.post(`http://127.0.0.1:8000/api/posts/publish/`, {
                title,
                description,
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
            e.preventDefault()
            for (let index = 0; index < formErrors.length; index++) {
                alert(`${formErrors[index].name}: ${formErrors[index].message}`)
            }
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
                    className={TitleLimit ? "w-full p-2 bg-transparent rounded-md border focus:border-red-500 focus:ring-0 " : "w-full p-2 bg-transparent placeholder:text-neutral-500 rounded-md border border-neutral-700 "} />
                <p className="absolute right-6 top-5 text-neutral-500">{TitleLimitNumber}/70</p>

                <QuillTextArea info={QuillTextAreaInfo} />

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
        </>

    )
}

export default FormPost