import { useState } from "react";
import Loading from "../components/Loading";
import Main from "../components/Main"
import Row from "../components/Row"
import { requests } from "../Requests";

const Home = () => {
    const [loading, setLoading] = useState(false)

    if (loading) {
        return <Loading />
    }


    return (
        <>
            <Main setLoading={ setLoading } />
            <Row title={ 'Upcoming' } fetchOptions={ requests.upcoming } setLoading={ setLoading } />
            <Row title={ 'Popular' } fetchOptions={ requests.popular } setLoading={ setLoading } />
            <Row title={ 'Trending' } fetchOptions={ requests.trending } setLoading={ setLoading } />
            <Row title={ 'Top rated' } fetchOptions={ requests.topRated } setLoading={ setLoading } />
            <Row title={ 'Horror' } fetchOptions={ requests.horror } setLoading={ setLoading } />
        </>

    )
}
export default Home