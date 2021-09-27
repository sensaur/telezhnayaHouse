import React, {Component} from 'react';
import Title from "./Title"
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from "react-icons/all";

class Services extends Component {
    state = {
        services: [
            {
                icon: <FaCocktail/>,
                title: "Free coctails",
                info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, repellat!"
            },
            {
                icon: <FaHiking/>,
                title: "Endless hiking",
                info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, repellat!"
            },
            {
                icon: <FaShuttleVan/>,
                title: "Free Shuttle",
                info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, repellat!"
            },
            {
                icon: <FaBeer/>,
                title: "Strongest beer",
                info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, repellat!"
            },
        ]
    }

    render() {
        return (
            <>
                <section className='services'>
                    <Title title='services' />
                <div className='services-center'>
                    {this.state.services.map((item, index) => {
                        return <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    })}
                </div>
                </section>
            </>
        );
    }
}

export default Services;
