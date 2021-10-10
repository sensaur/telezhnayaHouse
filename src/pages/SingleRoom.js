import React, {Component} from 'react';
import defaultBCG from '../images/room-1.jpeg'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import {RoomContext} from "../context";


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
        const {name, description, capacity, size, extras, breakfast, pets, images} = room
        return (
            <Hero hero='roomsHero'>
                <Banner title={`${name} room`}>
                    <Link to='/rooms' className='btn-primary'>back to rooms</Link>
                </Banner>
            </Hero>
        )
    }
}

export default SingleRoom;
