import { SiViaplay } from 'react-icons/si'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { MdLogin, MdLogout } from 'react-icons/md'
import { FaSignOutAlt } from 'react-icons/fa'
import SearchBox from './SearchBox'
import { profile } from '../assets'
import { useEffect, useState } from 'react'


const NavBar = () => {
    const navigate = useNavigate()
    const { user, logOut, userName } = UserAuth()
    const [scrolled, setScrolled] = useState(false)
    // console.log(user?.email)

    const handleLogout = async () => {
        try {
            await logOut()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        })
    }, [])

    return (
        <div className={ `flex items-center justify-between p-4 z-[100] w-full  ${scrolled ? 'fixed bg-yellow-400/20 backdrop-blur-sm h-14' : 'absolute'}` }>
            <Link to={ '/' }>
                <h1 className="text-yellow-600 flex items-center gap-2 text-4xl font-bold cursor-pointer">
                    <SiViaplay className='sm:text-white text-yellow-600' title='Movieez' /> <span className='font-[900] hidden sm:inline'>MOVIEEZ!</span>
                </h1>
            </Link>

            <SearchBox />

            {
                user?.email ? (
                    <div className="flex items-center justify-between p-4   ">
                        <Link to={ '/account' }>
                            <button className="text-white pr-4  place-items-center flex items-center gap-2">
                                <p className='font-bold text-white'>Hi, { userName }</p>
                                <img
                                    className='w-10 aspect-square object-cover rounded-full '
                                    src={ profile } alt={ 'Account' } />
                            </button>
                        </Link>


                        <button
                            onClick={ handleLogout }
                            className="sm:bg-yellow-600 sm:px-6 py-2 rounded cursor-pointer text-white flex items-center justify-around sm:gap-2 gap-1">  <FaSignOutAlt className='rotate-180' />
                            <span className='hidden sm:inline'> Log Out</span>
                        </button>

                    </div>
                ) : (
                    <div className="flex items-center justify-between p-4   ">
                        <Link to={ '/login' }>
                            <button className="text-white pr-4 flex items-center gap-1">
                                <MdLogin size={ 30 } className='' /><span className='hidden sm:inline'> Login</span></button>
                        </Link>

                        <Link to={ '/signup' }>
                            <button className="bg-yellow-600  px-2 py-1 rounded cursor-pointer text-white">Sign Up</button>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}
export default NavBar