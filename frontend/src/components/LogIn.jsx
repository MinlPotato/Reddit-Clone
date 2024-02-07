import logoGoogle from "../assets/google.png"
import logoApple from "../assets/apple.png"
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./State/Counter/AuthUser"
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
        }).catch(err => ({
            valid: err.response?.data?.valid ?? false,
            data: {
                message: err.response?.data?.data?.message ?? "Validation failed"
            }
        }));
        e.target.username.value = ""
        e.target.password.value = ""
    }

    return (

        <div className="w-full flex flex-col justify-center items-center">
            <Link to="/" className="text-left">Go back</Link>
            <div className="lg:w-2/3 md:w-full flex flex-col bg-neutral-900 rounded-md border border-neutral-700 justify-start px-24 py-12">

                <p className="text-4xl text-left mb-3">Log In</p>
                <p className="text-lg text-left mb-9">
                    By continuing, you agree to our <a href="">User Agreement</a>  and acknowledge that you understand the <a href="">Privacy Policy</a>.
                </p>
                <div className="flex flex-col gap-5">
                    <button disabled className="flex flex-row h-14 items-center w-full bg-neutral-100 rounded-full disabled:bg-neutral-300">
                        <img className="w-10" src={logoGoogle} alt="" />
                        <p className="w-full text-lg text-neutral-700">Continue with Google</p>
                    </button>

                    <button disabled className="flex flex-row h-14 items-center w-full bg-neutral-100 rounded-full disabled:bg-neutral-300">
                        <img className="w-8" src={logoApple} alt="" />
                        <p className="w-full text-lg text-neutral-700">Continue with Apple</p>
                    </button>
                </div>

                <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-neutral-600"></div>
                    <span className="flex-shrink mx-4 text-md font-semibold border-neutral-600">OR</span>
                    <div className="flex-grow border-t border-neutral-600"></div>
                </div>

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

                        <p className="text-start text-md font-semibold">New to Reddit? <Link to={"/register"}>Sign Up</Link></p>
                    </div>

                    <input type="submit" className="w-full h-14 bg-orange-500 hover:bg-orange-600 rounded-full mt-6 text-xl font-bold" />
                </form>
            </div>

        </div>

    );
}

export default LogIn