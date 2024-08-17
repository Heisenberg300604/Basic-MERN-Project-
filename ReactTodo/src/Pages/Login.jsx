import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { Link,Navigate,useNavigate } from 'react-router-dom'
import { Context } from '../main';
import axios from 'axios';

const Login = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "api/v1/login",
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            )
            //   console.log(email,password)
            toast.success(data.message);
            setIsAuthenticated(true)
            // navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    if (isAuthenticated) return <Navigate to="/" />;
    return (
        <div>
            <section>
                <div class="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div class="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 class="text-center text-2xl font-bold leading-tight text-black">
                            Log in to Let's Do it
                        </h2>
                        <p class="mt-2 text-center text-sm text-gray-600 ">
                            Don't have an account?
                            <Link
                                to="/register"
                                title=""
                                class="font-semibold text-black transition-all duration-200 hover:underline ml-2"
                            >
                                Sign up
                            </Link>
                        </p>
                        <form onSubmit={handleLogin} class="mt-8">
                            <div class="space-y-5">
                                <div>
                                    <label for="" class="text-base font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <div class="mt-2">
                                        <input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label for="" class="text-base font-medium text-gray-900">
                                        Password
                                    </label>
                                    <div class="mt-2">
                                        <input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        Login{" "}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Login
