import React, {Component} from 'react';
import {RoomContext} from "../context";
import Room from "./Room";
import Title from "./Title";
import Loading from "./Loading";

class FeaturedRooms extends Component {
    static contextType = RoomContext

    render() {
        let {loading, rooms} = this.context;
        // console.log(this.context)
        rooms = rooms.map(room => {
            return <Room key={room.id} room={room}/>
        })
        return (
            <section className="featured-rooms">
                <Title title="номера"/>
                <div className="featured-rooms-center">
                        {loading ? <Loading/> : rooms}
                </div>
            </section>
        );
    }
}

export default FeaturedRooms;
