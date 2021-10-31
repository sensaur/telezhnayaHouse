import Hero from "../components/Hero";
import Banner from "../components/Banner";
import {Link} from 'react-router-dom'
import RoomContainer from "../components/RoomContainer";

function Room() {

    return (
        <>
            <Hero hero="roomsHero">
                <Banner title='our rooms'>
                    <Link to='/' className='btn-primary'>
                        НА ГЛАВНУЮ
                    </Link>
                </Banner>
            </Hero>
            <RoomContainer/>
        </>
    )
}

export default Room;
