import { useEffect, useState } from "react";
import { img_originial, requests } from "../Requests";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserSaved } from "../context/SavedItemsContext";
import { UserAuth } from "../context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import { db } from "../firebase";

const Main = () => {
    const [films, setFilms] = useState([]);
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        axios
            .request(requests.popular)
            .then((response) => {
                setFilms(response.data.results);
            });
    }, []);

    useEffect(() => {
        if (films.length > 0) {
            const randomMovie = films[Math.floor(Math.random() * films.length)];
            setMovie(randomMovie);
        }
    }, [films]);

    // console.log(movie);

    const truncateString = (string, num) => {
        if (string?.length > num) {
            return string?.slice(0, num) + '...'
        } else {
            return string
        }
    }


    const [like, setLike] = useState(false)
    // const [saved, setSaved] = useState(false)
    const movies = UserSaved()?.movies
    const deleteSaved = UserSaved()?.deleteSaved
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
        <main className="w-full h-[550px] text-white">
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
            <div className="w-full h-full">
                <div className="absolute w-full h-[550px] bg-gradient-to-r from-black" />
                { movie && (
                    <img
                        className="w-full h-full object-cover"
                        src={ `${img_originial}${movie?.backdrop_path}` }
                        alt={ movie.title }
                    />
                ) }

                <div className="absolute w-full top-[20%] p-4 md:p-8">
                    <h1 className="text-3xl md:text-5xl font-bold">{ movie?.title }</h1>
                    <div className="my-4">
                        <Link to={ `/details/${movie?.id}` } className="border bg-gray-300 text-black border-gray-300 py-2 px-5"
                        > Open</Link>
                        <button className="border  text-white border-gray-300 py-2 px-5 ml-4"
                            onClick={ () => {
                                saveMovie(movie?.id)
                            } }
                        >Watch later</button>
                    </div>
                    <p className="text-gray-400 text-sm">Released: { films?.released_date }</p>
                    <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
                        { truncateString(movie?.overview, 150) }
                    </p>
                </div>

            </div>

        </main>
    );
};

export default Main;
