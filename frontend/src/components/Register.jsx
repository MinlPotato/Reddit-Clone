import logoGoogle from "../assets/google.png"
import logoApple from "../assets/apple.png"
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate()

    const handleValidation = (data) => {
        const formErrors = []
        let formIsValid = true

        if (!data['username']) {
            formErrors.push({ name: 'username', message: "Cannot be empty." })
            formIsValid = false
        }

        if (data['username'].length < 4) {
            formErrors.push({ name: 'username', message: "Username too short. At least 4 characters." })
            formIsValid = false
        }

        if (!data['password']) {
            formErrors.push({ name: 'password', message: "Cannot be empty." })
            formIsValid = false
        }

        if (data['password'].length < 8) {
            formErrors.push({ name: 'password', message: "Password too short. At least 8 characters." })
            formIsValid = false
        }

        return [formIsValid, formErrors]
    }

    const onRegister = async (e) => {
        e.preventDefault()

        let username = e.target.username.value
        let email = e.target.email.value
        let password = e.target.password.value

        const [formIsValid, formErrors] = handleValidation({username: username, email: email, password: password})

        if (formIsValid) {
            await axios.post("http://127.0.0.1:8000/api/users/register/", {
            email,
            username,
            password,
        }
        ).then(() => {
            navigate('/login')
        }).catch((err) => {
            const errors = err.response.data
            for (const [key, value] of Object.entries(errors)) {
                for (let i = 0; i < value.length; i++) {
                    alert(`${key}: ${value[i]}`)
                }
            }
        })
        } else {
            for (let index = 0; index < formErrors.length; index++) {
                alert(`${formErrors[index].name}: ${formErrors[index].message}`)
            }
        }

        
    }

    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="flex w-full lg:w-2/3 justify-start mb-3"><Link to="/" className="text-neutral-500 hover:underline">Go back</Link></div>
            <div className="lg:w-2/3 md:w-full flex flex-col bg-neutral-900 rounded-md border border-neutral-700 justify-start px-10 sm:px-24 py-12">
                <p className="text-4xl text-left mb-3">Sign Up</p>
                <p className="text-lg text-left mb-9">
                    By continuing, you agree to our <a href="">User Agreement</a>  and acknowledge that you understand the <a href="">Privacy Policy</a>.
                </p>

                <form onSubmit={onRegister}>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-start flex flex-row items-top gap-2 text-lg font-semibold">
                                Email <span className="text-neutral-500 text-sm">*Not needed</span>
                            </label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                className="w-full h-16 flex-1 rounded-full placeholder:text-lg 
                    bg-neutral-800 py-5 pl-5 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Email"
                            />
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="username" className="text-start text-lg font-semibold">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
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
                                    className="w-full h-16 flex-1 rounded-full placeholder:text-lg 
                                        bg-neutral-800 py-5 pl-5 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="password"
                                />
                            </div>
                            <p className="text-start text-md font-semibold">Already a redditor? <Link to={"/login"} className="hover:underline">Log in</Link></p>
                        </div>
                        <input type="submit" className="w-full h-14 bg-orange-500 hover:bg-orange-600 rounded-full mt-4 text-xl font-bold" />
                    </div>
                </form>

            </div>

        </div>
    );
}

export default Register


