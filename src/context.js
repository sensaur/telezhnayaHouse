// 01-38-16
import React, {Component} from "react"

const RoomContext = React.createContext()

class RoomProvider extends Component {
    state = {
        greeting: "hello",
        name: "John",
    }

    render() {
        return (
            <RoomContext.Provider value={{...this.state}}>
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer

// export default RoomProvider;
export {RoomProvider, RoomConsumer, RoomContext}