import React, {Component} from 'react';
import {RoomContext} from "../context";
//тестовый комит с новым емаилом https://youtu.be/LXJOvkVYQqA?t=6800
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