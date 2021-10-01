import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {RoomProvider} from './context'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

ReactDOM.render(
        <RoomProvider>
            <Router>
                <App/>
            </Router>
        </RoomProvider>,
    document.getElementById('root')
);
