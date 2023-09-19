import { useEffect, useState } from "react"
import { img_500, img_originial } from "../Requests"
import { FaHeart, FaOpencart, FaOpenid, FaRegHeart, FaTv } from 'react-icons/fa'
import { UserAuth } from '../context/AuthContext'
import { db } from "../firebase"
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { UserSaved } from "../context/SavedItemsContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom"
import { notfound } from "../assets"
import { MdDetails, MdMore, MdOpenInNewOff } from "react-icons/md"
import { SiOpencollective } from "react-icons/si"


const Movie = ({ item }) => {
    const [like, setLike] = useState(false)
    // const [saved, setSaved] = useState(false)
    const { movies, deleteSaved } = UserSaved()
    const { user, userName } = UserAuth()
    const navigate = useNavigate()

    const likeMovieIds = movies?.map(movie => movie.id)

    const movieId = doc(db, 'users', `${user?.email}`)

    useEffect(() => {
        if (likeMovieIds?.includes(item?.id)) {
            setLike(true)
        } else {
            setLike(false)
        }
    }, [movies])


    const saveMovie = async () => {
        if (user?.email) {
            setLike(!like)
            // setSaved(true)
            await updateDoc(movieId, {
                savedMovies: arrayUnion({
                    id: item.id,
                    title: (item.title ? item.title : item.name),
                    img: item.backdrop_path
                })
            })
            toast(<p>Successfully added to <Link to={ '/account' } className='underline text-yellow-500'>{ userName }'s account</Link></p>)

        } else {
            toast(<p>Please <Link to={ '/login' } className='underline text-yellow-500'>Log in</Link> to add to Favorites</p>)
        }
    }



    const unlike = async () => {
        if (user?.email) {
            setLike(!like)
            // setSaved(false)
            await deleteSaved(item?.id)
        } else {
            toast('Please Login first')
        }
    }

    return (
        <div key={ item.id } className="w-[160px] sm:2-[200px] lg:w-[200px] inline-block cursor-pointer relative p-2">
            <ToastContainer
                position="top-right"
                autoClose={ 5000 }
                hideProgressBar={ false }
                newestOnTop={ false }
                closeOnClick
                rtl={ false }
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <img className="w-full h-auto block" src={ item.poster_path ? (img_originial + item?.poster_path) : notfound } alt={ item.title } />
            <div className="absolute top-0 left-0 w-full h-full sm:hover:bg-black/80 sm:opacity-0 sm:hover:opacity-100 text-white">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center whitespace-break-spaces  h-full text-center opacity-0 sm:opacity-100">
                    { item?.title }{ item?.name }
                </p>
                <p>
                    {
                        like ? <FaHeart
                            onClick={ unlike }
                            className="absolute top-4 left-4 text-gray-300" /> :
                            <FaRegHeart
                                onClick={ saveMovie }
                                className="absolute top-4 left-4 text-gray-300" /> }
                    {
                        <MdOpenInNewOff
                            onClick={
                                () => {
                                    navigate(`/details/${item.id}`)
                                }
                            }
                            className="absolute top-10 left-4 text-gray-300" />
                    }
                </p>
            </div>
            <p>
                { item?.name && <FaTv className="absolute top-4 right-4 text-gray-300 bg-yellow-600 p-1 rounded box-content" title="TV Show" /> }
            </p>
        </div>
    )
}
export default Movie