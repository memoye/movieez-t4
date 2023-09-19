import { Link, useNavigate } from "react-router-dom"
import { signupbg } from "../assets"
import { UserAuth } from "../context/AuthContext"
import { useState } from "react"

const Signup = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')

    const { user, signUp } = UserAuth()

    const handleSubmit = async (e) => {

        e.preventDefault()
        // const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const passwordRegex = /^[A-Za-z0-9]{8}$/;

        if (password !== confirm) return setError('Passwords do no match')
        if (!passwordRegex.test(password)) return setError('Password must be alphanumeric and at least 8 digits long')

        try {
            setLoading(true)
            await signUp(email, password)
            navigate('/')
        } catch (error) {
            console.log(error)
            setE
        }
    }


    return (
        <>
            <div className="w-full h-screen">
                <img className="hidden sm:block absolute w-full h-full object-cover" src={ signupbg } alt={ 'sign up to Movieez!' } />
                <div className="bg-black/60 fixed top-0 left-0 w-full h-screen">

                </div>
                <div className="fixed w-full px-4 py-4 z-50 ">
                    <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
                        <div className="max-w-[320px] mx-auto py-16">
                            <h1 className="text-3xl font-bold">Sign Up</h1>
                            { error ? <p className='p-3 bg-red-400 my-2'>{ error }</p> : null }
                            <form onSubmit={ handleSubmit } className="w-full flex flex-col py-4">
                                <input
                                    onChange={ (e) => setEmail(e.target.value) }
                                    className="p-3 my-2 bg-gray-700 rounded " type="email" placeholder="Email" autoComplete="email" />
                                <input
                                    onChange={ (e) => setPassword(e.target.value) }
                                    className="p-3 my-2 bg-gray-700 rounded " type="password" placeholder="Password" />

                                <input
                                    onChange={ (e) => setConfirm(e.target.value) }
                                    className="p-3 my-2 bg-gray-700 rounded " type="password" placeholder="Confirm password" />
                                <button className='bg-yellow-600 py-3 my-6 rounded font-bold text-center'>Sign up</button>
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <p><input className="mr-2" type="checkbox" /> Remember me</p>
                                    <p>Need Help?</p>
                                </div>
                                <p className="py-4"><span className="text-gray-600 py-8">Already have an account?</span>{ ' ' }
                                    <Link to={ '/login' }>Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
}
export default Signup