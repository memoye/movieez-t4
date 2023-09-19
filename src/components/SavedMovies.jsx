import { MdChevronLeft, MdChevronRight, MdDelete } from "react-icons/md"

import { useRef, useState, useEffect, useContext } from "react"
import { img_500, img_originial } from "../Requests"
import { UserAuth } from "../context/AuthContext"

import { UserSaved } from "../context/SavedItemsContext"


const SavedMovies = () => {
    const slider = useRef()
    const { movies, deleteSaved } = UserSaved()


    function slideTo(direction) {
        if (direction === 'left') {
            slider.current.scrollLeft = slider.current.scrollLeft - 500
        } else if (direction === 'right') {
            slider.current.scrollLeft = slider.current.scrollLeft + 500
        }
    }


    return (
        <>
            <h2 className="text-white font-bold md:text-xl p-4">My Favorites</h2>
            <div className="relative flex items-center group">
                <MdChevronLeft onClick={ () => {
                    slideTo('left')
                } }
                    className="bg-white left-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block " size={ 40 } />

                <div ref={ slider } className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
                    {
                        movies?.map((item) => (
                            <div key={ item.id } className="w-[250px] sm:2-[200px] lg:w-[200px] inline-block cursor-pointer relative p-2">
                                <img className="w-full h-auto block" src={ img_originial + item.img } alt={ item.title } />
                                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                                    <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center whitespace-break-spaces  h-full text-center">
                                        { item?.title }{ item?.name }
                                    </p>
                                    <p
                                        onClick={ () => {
                                            deleteSaved(item.id)
                                        } }
                                    >
                                        { <MdDelete className="absolute top-4 left-4 text-gray-300" /> }
                                    </p>
                                </div>
                                <p>
                                    { item?.name && <FaTv className="absolute top-4 right-4 text-gray-300 bg-yellow-600 p-1 rounded box-content" title="TV Show" /> }
                                </p>
                            </div>
                        )
                        )
                    }
                </div>

                <MdChevronRight onClick={ () => {
                    slideTo('right')
                } }
                    className="bg-white right-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" size={ 40 } />
            </div >
        </>
    )
}
export default SavedMovies