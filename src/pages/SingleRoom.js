import React, {Component} from 'react';
import defaultBCG from '../images/room-1.jpeg'
// import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import {RoomContext} from "../context";
import StyledHero from "../components/StyledHero";


class SingleRoom extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props)
        this.state = {
            slug: this.props.match.params.slug,
            defaultBCG
        }
    }

    static contextType = RoomContext


    // componentDidMount() {}

    render() {
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug);
        if (!room) {
            return (<div className="error">
                <h3>no such room could be found...</h3>
                <Link to="/rooms" className="btn-primary">
                    back to rooms
                </Link>
            </div>)
        }
        const {name, description, capacity, size, extras, breakfast, images, price} = room
        return (
            <>
                <StyledHero img={images[0] || this.state.defaultBCG}>
                    <Banner title={`${name}`}>
                        <Link to='/rooms' className='btn-primary mx-1 my-1' >к номерам</Link>
                        <Link to='/request' className='btn-primary mx-1 my-1'>забронировать</Link>
                    </Banner>
                </StyledHero>
                <section className='single-room'>
                    <div className='single-room-images'>
                        {images.map((item, index) => {
                            return <img key={index} src={item} alt={name}/>
                        })}
                    </div>
                    <div className='single-room-info'>
                        <article className='desc'>
                            <h3>описание</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>информация</h3>
                            <h6>цена :  от {price} ₽</h6>
                            <h6>площадь : {size} м2</h6>
                            <h6>вместимость : {
                                capacity > 1 ? `${capacity} человек` : `${capacity} человек`
                            }
                            </h6>
                            {/*<h6>{pets ? "домашние животные" : "домашние животные не разрешены"}</h6>*/}
                            <h6>{breakfast && "завтрак включен"}</h6>
                        </article>
                    </div>
                </section>
                <section className='room-extras'>
                    <h6>Дополнительно</h6>
                    <ul className='extras'>
                        {extras.map((item, index) => {
                        return <li key={index}>- {item}</li>
                    })}
                    </ul>
                </section>
                <div className="container">
                    <Link to='/request' className='btn-primary d-flex justify-content-center my-5'>забронировать</Link>
                </div>
            </>
        )
    }

}

export default SingleRoom;
