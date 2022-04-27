import React, {useContext, useState} from 'react';
import DatePicker from "react-datepicker";
import {send} from 'emailjs-com';
import swal from 'sweetalert';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import {RoomContext} from "../context";
import {registerLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';
import {numWord} from "./numWord";

registerLocale('ru', ru)

function Form() {
    const {rooms} = useContext(RoomContext)
    let nights = 1
    const ONEDAY = 24 * 60 * 60 * 1000;
    let initialState = {
        room_type: 'Номер-студия',
        room_quantity: '1',
        people_quantity: 'Гостей',
        name_comments: '',
        phone: '',
        email: '',
    }
    let dateArrival = new Date();
    let dateDeparture = new Date()
    const [toSend, setToSend] = useState(initialState);
    const [startDate, setStartDate] = useState(dateArrival);
    dateDeparture = dateDeparture.setDate(startDate.getDate() + 1)
    const [endDate, setEndDate] = useState(dateDeparture);

    const roomsQuantityArr = Array.from(Array(6).keys())
    roomsQuantityArr.shift()
    const nightsQuantityArr = Array.from(Array(15).keys())
    nightsQuantityArr.shift()
    const guestsQuantityArr = Array.from(Array(15).keys())
    guestsQuantityArr[0] = 'Гостей'


    nights = Math.round(Math.abs((startDate - endDate) / ONEDAY))

    // eslint-disable-next-line
    const regExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g

    const setStartDateHandler = (date) => {
        setStartDate(date)
        let newEndDate = new Date(date);
        newEndDate = newEndDate.setDate(date.getDate() + 1)
        setEndDate(newEndDate)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        (startDate.setHours(0, 0, 0, 0) <
            new Date().setHours(0, 0, 0, 0))
            ? swal("Начало бронирования не может быть ранее текущей даты") :
            !toSend.email ? swal("Пожалуйста введите адрес электронной почты") :
                !regExp.test(toSend.phone)
                    ? swal("Номер телефона введен некорректно. Пожалуйста введите номер в ином формате") :
                    (startDate.setHours(0, 0, 0, 0) >
                        endDate.setHours(0, 0, 0, 0)) ?
                        swal("Начало бронирования не может быть ранее конца бронирования") :
                    send(
                        process.env.REACT_APP_SERVICE_ID,
                        process.env.REACT_APP_TEMPLATE_ID,
                        {
                            ...toSend,
                            startDate: `${startDateTrimmed}`,
                            endDate: `${endDateTrimmed}`,
                            message: message1 + message2,
                            nights_quantity: `${nights}`
                        },
                        process.env.REACT_APP_USER_ID,
                    )
                        .then((response) => {
                            swal("Ваша заявка принята, спасибо! " +
                                `\n${message1 + message2}\n` +
                                "В ближайшее время с Вами свяжется наш сотрудник")
                            setToSend(initialState)
                            setStartDate(dateArrival)
                            dateDeparture = new Date()
                            dateDeparture = dateDeparture.setDate(dateDeparture.getDate() + 1)
                            setEndDate(dateDeparture)
                            nights = 1
                            console.log('SUCCESS!', response.status, response.text);
                        }).then(

                    )
                        .catch((err) => {
                            console.log('FAILED...', err);
                            swal("что-то пошло не так")
                        });
        send(
            process.env.REACT_APP_SERVICE_ID_2,
            process.env.REACT_APP_TEMPLATE_ID_2,
            {
                ...toSend,
                startDate: `${startDateTrimmed}`,
                endDate: `${endDateTrimmed}`,
                message: message1 + message2,
                nights_quantity: `${nights}`
            },
            process.env.REACT_APP_USER_ID_2,
        )
    };

    const handleChange = (e) => {
        setToSend({...toSend, [e.target.name]: e.target.value});
    };
    const startDateTrimmed = moment(startDate).format("DD/MM/YYYY")
    const endDateTrimmed = moment(endDate).format("DD/MM/YYYY")
    const datesArr = [...Array(nights).keys()]
    let datesFilled = datesArr.map((el, i) => {
            let fullDate = new Date(startDate)
            fullDate = fullDate.setDate(fullDate.getDate() + i)
            return moment(fullDate).format("DD/MM/YYYY")
        }
    )
    // console.log("datesFilled", datesFilled)
    let message1 = 'Выберите параметры и мы рассчитаем стоимость'
    let message2 = ''
    if (toSend.room_type === "Тип комнаты" || toSend.room_quantity === "Количество номеров") {
        message1 = 'Выберите параметры и мы рассчитаем стоимость'
    } else {
        if (toSend.room_type === "Апартаменты-студия" && rooms.length === 3) {
            let priceList = rooms[1].priceList
            let price = datesFilled.map(el => priceList[`${el}`] ? priceList[`${el}`] : null)
            let total = price.reduce((a, b) => a + b, 0)
            let messageCount1 = `Ваше бронирование: ${toSend.room_quantity} ${numWord(toSend.room_quantity, ['номер', 'номера', 'номеров'])} "${toSend.room_type}"\n`
                + `c ${startDateTrimmed} по ${endDateTrimmed} на ${nights} ${numWord(nights, ['ночь', 'ночи', 'ночей'])}, тариф ${((Math.ceil((total * toSend.room_quantity / 0.9) / 100)) * (100)).toLocaleString('ru')} руб.\n`
            let messageCount2 = `c учетом скидки "БРОНИРОВАНИЕ НА САЙТЕ" стоимость ${(total * toSend.room_quantity).toLocaleString('ru')} руб.`
            message1 = messageCount1
            message2 = messageCount2
        } else if (toSend.room_type === "Номер-студия" && rooms.length === 3) {
            let priceList = []
            priceList = rooms[0].priceList
            let price = datesFilled.map(el => priceList[`${el}`] ? priceList[`${el}`] : null)
            let total = price.reduce((a, b) => a + b, 0)
            let messageCount1 = `Ваше бронирование: ${toSend.room_quantity} ${numWord(toSend.room_quantity, ['номер', 'номера', 'номеров'])} "${toSend.room_type}"\n`
                + `c ${startDateTrimmed} по ${endDateTrimmed} на ${nights} ${numWord(nights, ['ночь', 'ночи', 'ночей'])}, тариф ${((Math.ceil((total * toSend.room_quantity / 0.9) / 100)) * (100)).toLocaleString('ru')} руб.\n`
            let messageCount2 = `c учетом скидки "БРОНИРОВАНИЕ НА САЙТЕ" стоимость ${(total * toSend.room_quantity).toLocaleString('ru')} руб.`
            message1 = messageCount1
            message2 = messageCount2
        } else if (toSend.room_type === "Апартаменты" && rooms.length === 3) {
            let priceList = rooms[2].priceList
            let price = datesFilled.map(el => priceList[`${el}`] ? priceList[`${el}`] : null)
            let total = price.reduce((a, b) => a + b, 0)
            let messageCount1 = `Ваше бронирование: ${toSend.room_quantity} ${numWord(toSend.room_quantity, ['номер', 'номера', 'номеров'])} "${toSend.room_type}"\n`
                + `c ${startDateTrimmed} по ${endDateTrimmed} на ${nights} ${numWord(nights, ['ночь', 'ночи', 'ночей'])}, тариф ${((Math.ceil((total * toSend.room_quantity / 0.9) / 100)) * (100)).toLocaleString('ru')} руб.\n`
            let messageCount2 = `c учетом скидки "БРОНИРОВАНИЕ НА САЙТЕ" стоимость ${(total * toSend.room_quantity).toLocaleString('ru')} руб.`
            message1 = messageCount1
            message2 = messageCount2
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="container">
                    <h1 className="d-flex justify-content-center">Заявка</h1>
                    <p className="d-flex justify-content-center">{message1}</p>
                    <p className="d-flex justify-content-center"><b>{message2}</b></p>
                    <label htmlFor="exampleFormControlSelect2">Тип комнаты</label>
                    <select name='room_type' className="form-select my-2" aria-label="Default select example"
                            value={toSend.room_type}
                            onChange={handleChange}
                    >
                        <option value="Номер-студия">Номер-студия</option>
                        <option value="Апартаменты-студия">Апартаменты-студия</option>
                        <option value="Апартаменты">Апартаменты</option>
                    </select>
                    <label htmlFor="exampleFormControlSelect2">Количество номеров</label>
                    <select name='room_quantity' className="form-select my-2" aria-label="Default select example"
                            value={toSend.room_quantity}
                            onChange={handleChange}>
                        {roomsQuantityArr.map((el, i) => <option key={i}>{el}</option>)}
                    </select>
                    <div className="d-flex">
                        <div style={{width: '600px'}} className="mx-2 text-center">Заезд
                            <DatePicker dateFormat="dd/MM/yyyy" locale="ru" name="date_arrival"
                                        className="form-select my-2 text-center"
                                        selected={startDate}
                                        value={toSend.date_arrival}
                                        onChange={(date) => setStartDateHandler(date)}/>
                        </div>
                        <div style={{width: '600px'}} className="mx-2 text-center">Выезд
                            <DatePicker dateFormat="dd/MM/yyyy" locale="ru" name="date_departure"
                                        className="form-select my-2 text-center"
                                        selected={endDate}
                                        value={toSend.date_departure}
                                        onChange={(date) => setEndDate(date)}/>
                        </div>
                        <select name="people_quantity" className="form-select my-2 mx-2 text-center"
                                aria-label="Default select example"
                                value={toSend.people_quantity}
                                onChange={handleChange}>>>
                            {guestsQuantityArr.map((el, i) => <option key={i}>{el}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                        <input name='email' type="email" className="form-control" id="exampleFormControlInput1"
                               aria-describedby="emailHelp"
                               placeholder="name@example.com"
                               value={toSend.email}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Имя / комментарии</label>
                        <textarea name="name_comments" className="form-control" id="exampleFormControlTextarea1"
                                  rows="3"
                                  value={toSend.name_comments}
                                  onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Телефон</label>
                        <textarea name="phone" className="form-control" id="exampleFormControlTextarea1" rows="1"
                                  value={toSend.phone}
                                  placeholder="+79123456789"
                                  onChange={handleChange}/>
                    </div>
                    <button className='btn-primary'>
                        ОТПРАВИТЬ
                    </button>
                </div>
            </form>
        </>
    );
}

export default Form;
