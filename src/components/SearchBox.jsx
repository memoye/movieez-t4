import { useEffect, useRef, useState } from "react"
import { img_500, img_originial, requests } from "../Requests"
import axios from "axios"
import { Link } from "react-router-dom"

const SearchBox = () => {
    const searchBox = useRef()

    const [searchQuery, setSearchQuery] = useState('')
    const [results, setResults] = useState([])
    const [resultsOpen, setResultsOpen] = useState('')
    const { search } = requests



    function fetchData() {
        // console.log('fetching')
        axios
            .request({ ...search, params: { ...search.params, query: searchQuery } })
            .then((response) => {
                setResults(response.data.results)
                // console.log(title, response.data.results);
                return response
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    function handleChange(e) {
        setResultsOpen(true)
        setSearchQuery(e.target.value)
    }

    function handleFormSubmit(e) {
        e.preventDefault()
        const userInput = e.target.userQuery.value
        console.log(userInput)
    }

    useEffect(() => {
        fetchData()
    }, [searchQuery])

    useEffect(() => {

    }, [])

    return (
        <div className="relative ml-2" ref={ searchBox }>
            <form
                onSubmit={ handleFormSubmit }
            >
                <input
                    className="bg-gray-500 outline-none text-white px-2 py-1 w-[150px] sm:w-[200px] placeholder:text-gray-200"
                    id='userQuery'
                    onFocus={ () => {
                        setResultsOpen(true)
                    } }
                    type="text"
                    name={ 'searchQuery' }
                    value={ searchQuery }
                    onChange={ handleChange }
                    placeholder="Search Movies and TV Shows" />
            </form>
            { (results[0] && resultsOpen) && (
                <div
                    onClick={ () => {
                        setResultsOpen(false)
                    } }
                    className="absolute left-1/2 -translate-x-1/2 top-10 bg-white/30 grid gap-1 p-4 rounded h-fit max-h-[450px] overflow-y-scroll scrollbar-hide">
                    {
                        results.map((result, index) => {

                            // if (index < 10) {
                            return (
                                <Link
                                    to={ `/details/${result.id}` }

                                    className="flex bg-slate-900 rounded p-2 gap-2 border-2 border-transparent hover:border-white">

                                    <img src={ img_originial + result.poster_path } className="w-10 aspect-auto object-contain rounded" alt={ result.title } />

                                    <div className="flex flex-col justify-between font-extrabold rounded w-[200px] ">
                                        { result.title ?
                                            (<>
                                                <p className="font-bold text-yellow-500">{ result.title.slice(0, 20) }{ result.title.length > 20 && '...' }</p>
                                                {/* <p>{ result.media_type }</p> */ }
                                                <p className="text-slate-500">{ result.release_date?.slice(0, 4) }</p>
                                            </>) :
                                            (<>
                                                <p>{ result.name }</p>
                                                {/* <p>{ result.media_type }</p> */ }
                                                <p>{ result.first_air_date?.slice(0, 4) }</p>
                                            </>)
                                        }

                                    </div>

                                </Link>
                            )
                            // }
                        })
                    }
                    {/* <button className="bg-yellow-500 p-2 rounded hover:bg-yellow-700 font-bold text-white">
                        More
                    </button> */}
                </div>
            ) }
        </div>
    )
}
export default SearchBox