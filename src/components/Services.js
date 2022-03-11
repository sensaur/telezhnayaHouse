import React, {Component} from 'react';
import Title from "./Title"
import {FaHotel, FaBed, FaShuttleVan, FaMapMarkedAlt} from "react-icons/all";

class Services extends Component {
    state = {
        services: [
            {
                icon: <FaHotel/>,
                title: "Великолепное расположение",
                info: "Апарт-отель «Тележная House» с бесплатным Wi-Fi расположены в Санкт-Петербурге, недалеко от Музея Анны Ахматовой и Музея Фаберже. Из окон открывается вид на город."
            },
            {
                icon: <FaBed/>,
                title: "Удобства",
                info: "В числе удобств апартаментов стиральная машина, полностью оборудованная мини-кухня с микроволновой печью и собственная ванная комната с феном. Среди прочих удобств — холодильник, варочная поверхность и чайник."
            },
            {
                icon: <FaMapMarkedAlt/>,
                title: "Локация",
                info: "Апарт-отель «Тележная House» находится в 2,9 км от храма Спаса на Крови и в 2,6 км от Государственного Русского музея. Расстояние от апарт-отеля «Тележная House» до ближайшего международного аэропорта Пулково составляет 15 км."
            },
            {
                icon: <FaShuttleVan/>,
                title: "Отзывы",
                info:
                    "Это любимая часть города Санкт-Петербург среди наших гостей согласно независимым отзывам.\n" +
                    "Парам особенно нравится расположение — они оценили проживание в этом районе для поездки вдвоем на 8,8."
            },
        ]
    }

    render() {
        return (
            <>
                <section className='services'>
                    <Title title='О НАС' />
                <div className='services-center'>
                    {this.state.services.map((item, index) => {
                        return <article key={index} className="service">
                            <a href="https://yandex.ru/maps/org/telezhnaya_house/67582907284/features/?ll=30.373749%2C59.926603&z=15">
                            <span>{item.icon}</span>
                            </a>
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
