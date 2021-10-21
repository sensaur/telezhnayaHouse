import Room from './Room'

function RoomList({rooms}) {
    if (rooms.length === 0) {
        return <div className="empty-search">
            <h3>
                Unfortunatelly no rooms matched your search parameters
            </h3>
        </div>
    }


    return (
        <div>
            Hello from room list
        </div>
    );
}

export default RoomList;