import { useEffect, useRef, useState } from "react"
import { img_500, img_originial, requests } from "../Requests"
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import CustomRow from "../components/CustomRow"
import Movie from "../components/Movie"
import { notfound } from "../assets"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { UserSaved } from "../context/SavedItemsContext"
import { UserAuth } from "../context/AuthContext"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify"


const Details = () => {
    const { details } = requests
    const [currentMovie, setCurrentMovie] = useState(null)
    const { id } = useParams()
    const slider = useRef()
    const [trailer, setTrailer] = useState('')
    const [cast, setCast] = useState([])
    const [crew, setCrew] = useState([])


    const [like, setLike] = useState(false)
    // const [saved, setSaved] = useState(false)
    const movies = UserSaved()?.movies
    const deleteSaved = UserSaved()?.deleteSaved
    // const movies  = UserSaved()?.movies
    const { user, userName } = UserAuth()
    const navigate = useNavigate()

    const likeMovieIds = movies?.map(movie => movie.id)

    const movieId = doc(db, 'users', `${user?.email}`)



    useEffect(() => {
        if (likeMovieIds?.includes(id)) {
            setLike(true)
        } else {
            setLike(false)
        }
    }, [currentMovie])

    function slideTo(direction) {
        if (direction === 'left') {
            slider.current.scrollLeft = slider.current.scrollLeft - 500
        } else if (direction === 'right') {
            slider.current.scrollLeft = slider.current.scrollLeft + 500
        }
    }


    function fetchData() {
        const options = { ...details, url: details.url + id }
        axios
            .request(options)
            .then(function (response) {
                setCurrentMovie(response.data)
                setTrailer(response.data.videos.results.filter(vid => (vid.type === 'Trailer'))[0])
                setCast(response.data.credits.cast)
                setCrew(response.data.credits.crew)

            })
            .catch(function (error) {
                console.error(error)
            });
    }


    const saveMovie = async () => {
        if (user?.email) {
            setLike(!like)
            // setSaved(true)
            await updateDoc(movieId, {
                savedMovies: arrayUnion({
                    id: currentMovie.id,
                    title: (currentMovie.title ? currentMovie.title : currentMovie.name),
                    img: currentMovie.backdrop_path
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
            await deleteSaved(currentMovie?.id)
        } else {
            toast('Please Login first')
        }
    }

    useEffect(() => {
        fetchData()
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }, [id])



    return (
        <>
            <div >
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
                <main className="w-full h-[550px] text-white">
                    <div className="w-full h-full">
                        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black" />
                        {
                            // movie && (
                            <img
                                className="w-full h-full object-cover"
                                src={ img_originial + currentMovie?.backdrop_path }
                                alt={ currentMovie?.title }
                            />
                            // ) 

                        }

                        <div className="absolute w-full top-[20%] p-4 md:p-8 sm:flex md:mt-4">
                            <div className="flex-1">
                                <h1 className="text-3xl md:text-5xl font-bold">{ currentMovie?.title }</h1>
                                <div className="my-4">
                                    {/* <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">Like</button> */ }
                                    <button className="border  text-white border-gray-300 py-2 px-5 ml-4" >   {
                                        like ? <FaHeart
                                            onClick={ unlike }
                                            className="text-gray-300" /> :
                                            <FaRegHeart
                                                onClick={ saveMovie }
                                                className="text-gray-300" /> }</button>
                                </div>
                                <p className="text-gray-400 text-sm">Released: { currentMovie?.released_date }</p>
                                <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
                                    { currentMovie?.overview }
                                </p>

                                <h3 className="text-yellow-500">Keywords</h3>
                                <div className="flex items-center flex-wrap gap-1 ">{
                                    currentMovie?.keywords.keywords.map((keyword, index) => {
                                        if (index < 10) return (<p key={ keyword.id } className="bg-yellow-500/60 p-2 text-black w-fit rounded ">{ keyword.name }</p>)
                                    })
                                }</div>
                            </div>

                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold mt-10 pl-5 text-yellow-600">Trailer</h1>
                        <div className=' aspect-video px-4 flex-auto sm:mt-0 mt-8' >
                            <iframe
                                className=' h-full w-full rounded-lg'
                                src={ `https://www.youtube.com/embed/${trailer?.key}` }
                                width="100%"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
                            </iframe>
                        </div>

                        <div className="mt-12">
                            <h2 className=" font-bold md:text-xl p-4 text-yellow-600">Cast</h2>
                            <div className="relative flex items-center group">
                                <MdChevronLeft onClick={ () => {
                                    slideTo('left')
                                } }
                                    className="bg-white left-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block " size={ 40 } />



                                <div ref={ slider } className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative ">
                                    {
                                        cast?.map((item) => (
                                            <div key={ item.id } className="w-[250px] sm:2-[200px] lg:w-[200px] inline-block cursor-pointer  relative p-2">
                                                { item.profile_path ? <img
                                                    className='w-2/3 aspect-auto object-contain '
                                                    src={ img_originial + item.profile_path }
                                                    alt={ item.name } /> :
                                                    <img
                                                        className='w-2/3 aspect-auto object-cover '
                                                        src={ `https://dummyimage.com/500x500/eee/000.gif?text=${item.name}` }
                                                        alt={ item.name } />
                                                }
                                                <p className="w-fulsl font-bold">{ item.name }</p>
                                                <p className="w-full">as</p>
                                                <p className="w-full text-yellow-400">{ item.character }</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <MdChevronRight onClick={ () => {
                                slideTo('right')
                            } }
                                className="bg-white right-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" size={ 40 } />
                        </div>
                        <div className="mt-10">
                            <h2 className=" font-bold md:text-xl p-4 text-yellow-600">Similar</h2>
                            <div className="relative flex items-center group">
                                <MdChevronLeft onClick={ () => {
                                    slideTo('left')
                                } }
                                    className="bg-white left-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block " size={ 40 } />



                                <div ref={ slider } className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative ">
                                    {
                                        currentMovie?.similar?.results.map(item => (
                                            <Link to={ `/details/${item.id}` } key={ item.id } className="w-[160px] sm:2-[200px] lg:w-[200px] inline-block cursor-pointer relative p-2">
                                                <img className="w-full h-auto block" src={ img_originial + item?.poster_path } alt={ item.title } />
                                                <div className="absolute top-0 left-0 w-full h-full sm:hover:bg-black/80 sm:opacity-0 sm:hover:opacity-100 text-white">
                                                    <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center whitespace-break-spaces  h-full text-center opacity-0 sm:opacity-100">
                                                        { item?.title }{ item?.name }
                                                    </p>

                                                </div>
                                                <p>
                                                    { item?.name && <FaTv className="absolute top-4 right-4 text-gray-300 bg-yellow-600 p-1 rounded box-content" title="TV Show" /> }
                                                </p>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>

                            <MdChevronRight onClick={ () => {
                                slideTo('right')
                            } }
                                className="bg-white right-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" size={ 40 } />
                        </div>

                        <div className="mt-10">
                            <h2 className="text-white font-bold md:text-xl p-4">You might also like</h2>
                            <div className="relative flex items-center group">
                                <MdChevronLeft onClick={ () => {
                                    slideTo('left')
                                } }
                                    className="bg-white left-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block " size={ 40 } />



                                <div ref={ slider } className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative ">
                                    {
                                        currentMovie?.recommendations.results.map(item => (
                                            <Link to={ `/details/${item.id}` } key={ item.id } className="w-[160px] sm:2-[200px] lg:w-[200px] inline-block cursor-pointer relative p-2">
                                                <img className="w-full h-auto block" src={ item.poster_path ? (img_originial + item?.poster_path) : notfound } alt={ item.title } />
                                                <div className="absolute top-0 left-0 w-full h-full sm:hover:bg-black/80 sm:opacity-0 sm:hover:opacity-100 text-white">
                                                    <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center whitespace-break-spaces  h-full text-center opacity-0 sm:opacity-100">
                                                        { item?.title }{ item?.name }
                                                    </p>

                                                </div>
                                                <p>
                                                    { item?.name && <FaTv className="absolute top-4 right-4 text-gray-300 bg-yellow-600 p-1 rounded box-content" title="TV Show" /> }
                                                </p>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>

                            <MdChevronRight onClick={ () => {
                                slideTo('right')
                            } }
                                className="bg-white right-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" size={ 40 } />
                        </div>

                    </div>

                </main>

            </div>


        </>
    )
}
export default Details