//rsf сниппет создает функциональный компонент реакта
import RoomFilter from './RoomFilter'
import RoomList from './RoomList'
import {withRoomConsumer} from "../context";
import Loading from "./Loading";

function RoomContainer({context}) {
    const {loading, sortedRooms, rooms} = context;
    if (loading) {
        return <Loading/>
    }
    return (
        <>
            <RoomFilter rooms={rooms}/>
            <RoomList rooms={sortedRooms}/>
        </>
    );
}

export default withRoomConsumer(RoomContainer);

// ниже альтернатива без HOC

// import RoomFilter from './RoomFilter'
// import RoomList from './RoomList'
// import {RoomConsumer} from "../context";
// import Loading from "./Loading";
//
// function RoomContainer() {
//     return (
//         <RoomConsumer>
//             {value => {
//                 const {loading, sortedRooms, rooms} = value
//                 if (loading) {
//                     return <Loading/>
//                 }
//                 return (
//                     <div    >
//                         Hello from rooms container
//                         <RoomFilter rooms={rooms}/>
//                         <RoomList rooms={sortedRooms}/>
//                     </div>
//                 );
//             }}
//         </RoomConsumer>
//     );
// }
//
// export default RoomContainer;