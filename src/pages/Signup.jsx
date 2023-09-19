import { Link, useNavigate } from "react-router-dom"
import { signupbg } from "../assets"
import { UserAuth } from "../context/AuthContext"
import { useState } from "react"
import { FaCircleNotch, FaEye, FaEyeSlash } from "react-icons/fa"

const Signup = () => {
    const navigate = useNavigate()

    const [type, setType] = useState('password')

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')

    const { user, signUp } = UserAuth()

    const handleSubmit = async (e) => {

        e.preventDefault()
        setLoading(true)

        // const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // const passwordRegex = /^[A-Za-z0-9]{8}$/;
        console.log(password, confirm)
        // if (!passwordRegex.test(password)) return setError('Password must be alphanumeric and at least 8 digits long')
        console.log(password, email)

        try {
            await signUp(email, password)
            setLoading(false)
            if ((password !== confirm) && password === '') return setError('Passwords do no match')
            navigate('/login')

        } catch (error) {
            setLoading(false)
            console.log(error)
            setError(error.message)
        }
    }

    function toggleType() {
        if (type == 'password') {
            setType('text')
        } else {
            setType('password')
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
                                    className="p-3 my-2 bg-gray-700 rounded" type="email" placeholder="Email" autoComplete="email" />



                                <div className="relative ">
                                    <input
                                        onChange={ (e) => setPassword(e.target.value) }
                                        className="p-3 my-2 bg-gray-700 rounded w-full" type={ type } placeholder="Password" />
                                    <p onClick={ () => toggleType() }>
                                        { type == 'password' ? <FaEye className="absolute z-20 right-2 top-1/2 -translate-y-1/2 " /> :
                                            <FaEyeSlash className="absolute z-20 right-2 top-1/2 -translate-y-1/2  " /> }
                                    </p>
                                </div>

                                <div className="relative ">
                                    <input
                                        onChange={ (e) => setConfirm(e.target.value) }
                                        className="p-3 my-2 bg-gray-700 rounded w-full" type={ type } placeholder="Confirm password" />
                                    <p onClick={ () => toggleType() }>
                                        { type == 'password' ? < FaEye className="absolute z-20 right-2 top-1/2 -translate-y-1/2  " /> :
                                            <FaEyeSlash className="absolute z-20 right-2 top-1/2 -translate-y-1/2  " /> }
                                    </p>
                                </div>

                                <button disabled={ loading } className='bg-yellow-600 py-3 my-6 rounded font-bold text-center disabled:bg-slate-800'> { !loading ? 'Sign up' : 'Signin you up...' }</button>
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