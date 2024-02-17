import CreatePost from "./CreatePost"
import Card from "./Card"
import { useState, useEffect, useRef, useMemo } from "react"
import Policies from "./Policies"
import RecentPosts from "./RecentPosts"
import axios from "axios"
import OrderCard from "./OrderCard"
import { cachePosts } from "./State/Slices/PostsSlice"
import { getPostsCached } from "./State/Slices/PostsSlice"
import { useSelector, useDispatch } from "react-redux"
import HomeCard from "./Cards/HomeCard"
import { getUserData } from "./State/Slices/AuthUser"

function Main() {

    const postConf = useSelector(getPostsCached)
    const userData = useSelector(getUserData)
    const dispatch = useDispatch()


    let start = postConf.start
    let limit = postConf.limit
    let seed = postConf.seed

    const infoDiv = useRef(null)
    const postDiv = useRef(null)
    const [reload, setReload] = useState(false)
    const [ReachedBottom, setReachedBottom] = useState(false)

    let getPosts = async (start = 0, limit = 1, seed) => (
        axios.get(`http://127.0.0.1:8000/api/posts/?limit=${limit}&start=${start}&seed=${seed}`)
            .then(function (response) {
                if (response.data.length == 0) {
                    return
                }
                dispatch(cachePosts(response.data))
                setReload(false)
            })
            .catch(function (error) {
                console.log(error);
                setReload(true)
            }))

    useEffect(() => {
        if (ReachedBottom || reload) {
            getPosts(start, limit, seed)
        }
    }, [ReachedBottom, reload])

    useEffect(() => {
        setReload(true)
    }, [])


    const resizeDiv = () => {
        const div1 = infoDiv.current
        const div2 = postDiv.current
        div1.style.height = div2.style.height
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
    }, [postDiv.current])


    return (
        <>
            <div className="mt-16 w-full xl:w-[75rem]">
                <div className="flex flex-row  w-full gap-7">
                    <div ref={postDiv} className="flex flex-col w-full lg:w-2/3 gap-7">
                        <CreatePost />
                        <OrderCard />
                        {(postConf.posts != null) ? (
                            <div className="flex flex-col w-full gap-3">
                                {postConf.posts.map((Post, index) => (
                                    <div className="w-full" key={index}>
                                        <Card info={Post}></Card>
                                    </div>
                                ))}
                            </div>

                        ) : !reload ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="flex justify-center">
                                <button onClick={getPosts} className="w-1/4 rounded-full text-black bg-white hover:bg-neutral-100">Reload</button>
                            </div>
                        )}
                    </div>
                    <div ref={infoDiv} id="infoDiv" className="hidden lg:flex flex-col lg:w-1/3 gap-7">
                        {userData.isLogged && <HomeCard />}
                        <RecentPosts />

                    </div>
                </div>
            </div>
        </>


    )
}


export default Main


