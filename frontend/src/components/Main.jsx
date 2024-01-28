import CreatePost from "./CreatePost"
import Card from "./Card"

import { useState, useEffect, useRef } from "react"
import { json } from "react-router-dom"
import Policies from "./Policies"
import RecentPosts from "./RecentPosts"
import axios from "axios"

function Main() {

    const infoDiv = useRef(null)
    const [Posts, setPosts] = useState(null)

    const resizeDiv = () => {
        const div = infoDiv.current
        const newHeight = document.body.scrollHeight - 90
        div.style.height = `${newHeight}px`
    }

    useEffect(() => {
        window.addEventListener('resize', resizeDiv())
        return (
            window.removeEventListener('resize', resizeDiv())
        )

    }, [resizeDiv])

    let getPosts = async (e) => (
        axios.get('http://127.0.0.1:8000/api/posts?search=')
            .then(function (response) {
                setPosts(response.data)
            })
            .catch(function (error) {
                console.log(error);
            }))
            
    useEffect(() => {
        getPosts()
    }, [])


    return (
        <div className="mt-14">
            <div className="flex flex-row h-screen justify-center w-full gap-7">
                <div className="flex flex-col lg:w-2/3 gap-7">
                    <CreatePost />
                    {(Posts != null) ? (      
                        Posts.map((Post) => (
                            <div key={Post.id}>
                                <Card info={Post}></Card>
                            </div>
                        ))  
                    ) : (
                        <p>Loading...</p>
                    )}

                </div>
                <div ref={infoDiv} id="infoDiv" className="hidden md:hidden lg:flex flex-col w-1/3 gap-7">
                    <div className="w-full h-24 bg-neutral-900 rounded-md border border-neutral-700"></div>
                    <RecentPosts />
                    <Policies />
                </div>
            </div>
        </div>

    )
}


export default Main


