import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { signupbg } from "../assets"
import { UserAuth } from "../context/AuthContext"


const Login = () => {
    const navigate = useNavigate()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { user, logIn } = UserAuth()

    const handleSubmit = async (e) => {


        e.preventDefault()
        setError('')

        try {
            await logIn(email, password)
            navigate('/')
        } catch (error) {
            setError(error.message)
            console.log(error)
        }
    }

    return (
        <div className="w-full h-screen">
            <img className="hidden sm:block absolute w-full h-full object-cover" src={ signupbg } alt={ 'sign up to Movieez!' } />
            <div className="bg-black/60 fixed top-0 left-0 w-full h-screen">

            </div>
            <div className="fixed w-full px-4 py-4 z-50 ">
                <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
                    <div className="max-w-[320px] mx-auto py-16">
                        <h1 className="text-3xl font-bold">Login</h1>
                        { error ? <p className='p-3 bg-red-400 my-2'>{ error }</p> : null }
                        <form onSubmit={ handleSubmit } className="w-full flex flex-col py-4">
                            <input
                                onChange={ (e) => setEmail(e.target.value) }
                                className="p-3 my-2 bg-gray-700 rounded "
                                type="email"
                                placeholder="Email"
                                autoComplete="email" />
                            <input
                                onChange={ (e) => setPassword(e.target.value) }
                                className="p-3 my-2 bg-gray-700 rounded "
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password" />
                            <button className='bg-yellow-600 py-3 my-6 rounded font-bold text-center'>Sign In</button>
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <p><input className="mr-2" type="checkbox" /> Remember me</p>
                                <p>Need Help?</p>
                            </div>
                            <p className="py-4"><span className="text-gray-600 py-8">Don't have an account?</span>{ ' ' }
                                <Link to={ '/signup' }> Sign Up</Link>
                            </p>
                        </form>
                    </div>
                </div>

            </div>
        </div >
    )
}
export default Login