import React, {Component} from 'react';
import {RoomContext} from "../context";
import loading from './Loading'
import Loading from "./Loading";
//тестовый комит с новым емаилом https://youtu.be/LXJOvkVYQqA?t=6800
class FeaturedRooms extends Component {
    static contextType = RoomContext

    render() {
        const {name, greeting} = this.context;
        const {featuredRooms: rooms} = this.context
        console.log(rooms)
        return (
            <div>
                {greeting} from {name} Featured rooms
            <Loading/>
            </div>
        );
    }
}

export default FeaturedRooms;