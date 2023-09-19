import { loadingImg } from "../assets"

const Loading = () => {
    return (
        <div
            className="relative w-screen h-screen top-0 right-0 bg-black/40 grid place-items-center"
        >
            <img className="w-1/3 aspect-auto object-contain m-auto" src={ loadingImg } alt="/" />
        </div>
    )
}
export default Loading