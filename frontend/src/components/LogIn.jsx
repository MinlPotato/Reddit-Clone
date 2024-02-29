import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./State/Slices/AuthUser"
import { useNavigate } from "react-router-dom";

function LogIn() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let loginUser2 = async (e) => {
        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value

        await axios.post("http://127.0.0.1:8000/api/token/", {
            username,
            password,
        }
        ).then((response) => {
                dispatch(login(response.data))
                navigate('/')
        }).catch((err) => {
            const errors = err.response.data
            for (const [key, value] of Object.entries(errors)) {        
                alert(`${key}: ${value}`)        
            }
        })
        e.target.username.value = ""
        e.target.password.value = ""
    }

    return (

        <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="flex w-full lg:w-2/3 justify-start mb-3"><Link to="/" className="text-neutral-500 hover:underline">Go back</Link></div>
            <div className="lg:w-2/3 md:w-full flex flex-col bg-neutral-900 rounded-md border border-neutral-700 justify-start px-10 sm:px-24 py-12">

                <p className="text-4xl text-left mb-3">Log In</p>
                <p className="text-lg text-left mb-9">
                    By continuing, you agree to our 
                    <span className="font-semibold text-neutral-200"> User Agreement </span>
                    and acknowledge that you understand the 
                    <span className="font-semibold text-neutral-200"> Privacy Policy</span>.
                </p>


                <form onSubmit={loginUser2}>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="username" className="text-start text-lg font-semibold">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="w-full h-16 flex-1 rounded-full placeholder:text-lg 
                                        bg-neutral-800 py-5 pl-5 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="username"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-start text-lg font-semibold">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="password"
                                className="w-full h-16 flex-1 rounded-full placeholder:text-lg 
                                        bg-neutral-800 py-5 pl-5 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="password"
                            />
                        </div>

                        <p className="text-start text-md font-semibold">New to Reddit? <Link to={"/register"} className="hover:underline">Sign Up</Link></p>
                    </div>

                    <input type="submit" className="w-full h-14 bg-orange-500 hover:bg-orange-600 rounded-full mt-6 text-xl font-bold" />
                </form>
            </div>

        </div>

    );
}

export default LogIn