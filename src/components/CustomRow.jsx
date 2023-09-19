import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { SavedItemsContextProvider } from "../context/SavedItemsContext"
import Movie from "./Movie"
import { useEffect, useRef } from "react"

const Custom = ({ title, movies }) => {
    const slider = useRef()

    function slideTo(direction) {
        if (direction === 'left') {
            slider.current.scrollLeft = slider.current.scrollLeft - 500
        } else if (direction === 'right') {
            slider.current.scrollLeft = slider.current.scrollLeft + 500
        }
    }

    return (
        <>
            <h2 className="text-white font-bold md:text-xl p-4">{ title }</h2>
            <div className="relative flex items-center group">
                <MdChevronLeft onClick={ () => {
                    slideTo('left')
                } }
                    className="bg-white left-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block " size={ 40 } />

                <SavedItemsContextProvider>

                    <div ref={ slider } className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
                        {
                            movies?.map((item) => (
                                <Movie
                                    key={ item.id }
                                    item={ item }
                                />
                            )
                            )
                        }
                    </div>

                </SavedItemsContextProvider>

                <MdChevronRight onClick={ () => {
                    slideTo('right')
                } }
                    className="bg-white right-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" size={ 40 } />
            </div>
        </>
    )
}
export default Custom