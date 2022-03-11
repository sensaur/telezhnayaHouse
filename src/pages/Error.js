import Hero from "../components/Hero"
import Banner from "../components/Banner";
import {Link} from 'react-router-dom'

function Error() {
    return (
        <Hero>
            <Banner title='404' subtitle="страница не найдена">
                <Link to='/' className='btn-primary'>
                    назад
                </Link>
            </Banner>
        </Hero>
    )
}


export default Error;
