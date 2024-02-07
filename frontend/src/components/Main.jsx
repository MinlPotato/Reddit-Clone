import CreatePost from "./CreatePost"
import Card from "./Card"
import { useState, useEffect, useRef } from "react"
import Policies from "./Policies"
import RecentPosts from "./RecentPosts"
import axios from "axios"
import OrderCard from "./OrderCard"

function Main() {

    const infoDiv = useRef(null)
    const [Posts, setPosts] = useState([])
    const [reload, setReload] = useState(false)
    const [ReachedBottom, setReachedBottom] = useState(false)

    const [Start, setStart] = useState(0)
    const [Limit, setLimit] = useState(3)

    const [Seed] = useState(Math.floor(Math.random() * 100))

    let getPosts = async (start = 0, limit = 1, seed) => (
        axios.get(`http://127.0.0.1:8000/api/posts/?limit=${limit}&start=${start}&seed=${seed}`)
            .then(function (response) {
                setPosts([...Posts, ...response.data])
                setReload(false)
            })
            .catch(function (error) {
                console.log(error);
                setReload(true)
            }))

    useEffect(() => {
        if (ReachedBottom) {
            getPosts(Start, Limit, Seed)
            setLimit(Limit + 3)
            setStart(Limit)
        }       
    }, [ReachedBottom])

    useEffect(() => {
        getPosts(Start, Limit, Seed)
        setStart(Limit)
        setLimit(Limit + 3)
    }, [])

    const resizeDiv = () => {
        const div = infoDiv.current
        const newHeight = document.body.scrollHeight - 200
        div.style.height = `${newHeight}px`
    }

    useEffect(() => {
        function handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (windowHeight + scrollTop >= documentHeight - 100) {
                setReachedBottom(true);         
            } else {
                setReachedBottom(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        window.addEventListener('resize', resizeDiv())
        return window.removeEventListener('resize', resizeDiv())
    }, [document.body.scrollHeight])


    return (
        <div className="top-10 mt-16 w-full xl:w-[75rem]">
            <div className="flex flex-row h-screen justify-center w-full gap-7">
                <div className="flex flex-col mx-10 w-full lg:mx-0 lg:w-2/3 gap-7">
                    <CreatePost />
                    <OrderCard />
                    {(Posts != null) ? (
                        Posts.map((Post, index) => (
                            <div key={index}>
                                <Card info={Post}></Card>
                            </div>
                        ))
                    ) : !reload ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="flex justify-center">
                            <button onClick={getPosts} className="w-1/4 rounded-full text-black bg-white hover:bg-neutral-100">Reload</button>
                        </div>
                    )}
                </div>
                <div ref={infoDiv} id="infoDiv" className="hidden lg:hidden xl:flex flex-col w-1/3 gap-7">
                    <div className="w-full h-24 bg-neutral-900 rounded-md border border-neutral-700"></div>
                    <RecentPosts />
                    <Policies />
                </div>
            </div>
        </div>

    )
}


export default Main


