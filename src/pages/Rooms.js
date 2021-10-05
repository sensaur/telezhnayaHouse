import Hero from "../components/Hero";
import Banner from "../components/Banner";
import {Link} from 'react-router-dom'
function Room() {
    return <Hero hero="roomsHero">
        <Banner title='our rooms'>
            <Link to='/' className='btn-primary'>
                return Home
            </Link>

        </Banner>
    </Hero>
}

export default Room;
