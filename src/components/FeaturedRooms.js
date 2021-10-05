import React, {Component} from 'react';
import {RoomContext} from "../context";

class FeaturedRooms extends Component {
    static contextType = RoomContext

    render() {
        const {name, greeting} = this.context;
        return (
            <div>
                {greeting} from {name} Featured rooms
            </div>
        );
    }
}

export default FeaturedRooms;