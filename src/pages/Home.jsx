import Main from "../components/Main"
import Row from "../components/Row"
import { requests } from "../Requests";

const Home = () => {
    return (
        <>
            <Main />
            <Row title={ 'Upcoming' } fetchOptions={ requests.upcoming } />
            <Row title={ 'Popular' } fetchOptions={ requests.popular } />
            <Row title={ 'Trending' } fetchOptions={ requests.trending } />
            <Row title={ 'Top rated' } fetchOptions={ requests.topRated } />
            <Row title={ 'Horror' } fetchOptions={ requests.horror } />
        </>

    )
}
export default Home