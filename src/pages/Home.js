import Hero from "../components/Hero";
import Banner from "../components/Banner";
import {Link} from 'react-router-dom'
import Services from '../components/Services';
import FeaturedRooms from "../components/FeaturedRooms";

function Home() {
    return (
        <>
            <Hero hero="defaultHero">
                <Banner
                    title="Скоро открытие"
                    subtitle="уютные номера от 2500₽">
                    <Link to="/rooms" className="btn-primary">
                        номера
                    </Link>
                </Banner>
            </Hero>
            <Services/>
            <FeaturedRooms  />
        </>
    )
}

export default Home

