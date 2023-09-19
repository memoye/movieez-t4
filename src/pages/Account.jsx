import { signupbg } from "../assets"
import SavedMovies from "../components/SavedMovies"
import { UserAuth } from "../context/AuthContext";
import { SavedItemsContextProvider, UserSaved } from '../context/SavedItemsContext';

const Account = () => {
    const { userName } = UserAuth()
    const movies = UserSaved()?.movies

    console.log('mm', movies)
    return (
        <>
            <div className='w-full text-white'>
                <img
                    className='w-full h-[400px] object-cover'
                    src={ signupbg }
                    alt='/'
                />
                <div className='bg-black/60 fixed top-0 left-0 w-full h-[550px]' />
                <div className='absolute top-[20%] p-4 md:p-8'>
                    <h1 className='text-3xl md:text-5xl font-bold'><span className="capitalize">{ userName }</span>'s Favorites</h1>
                    { !movies && <p className='italic text-gray-200 text-xs mt-5 md:text-5xl '>Your saved movies will appear below</p> }
                </div>
            </div>
            <SavedItemsContextProvider>
                { movies && <SavedMovies /> }

            </SavedItemsContextProvider>
        </>
    )
}
export default Account

