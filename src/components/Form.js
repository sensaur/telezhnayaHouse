import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import {send} from 'emailjs-com';
import swal from 'sweetalert';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";

function Form() {
    const roomsQuantityArr = Array.from(Array(6).keys())
    roomsQuantityArr.shift()
    const nightsQuantityArr = Array.from(Array(15).keys())
    nightsQuantityArr.shift()
    const guestsQuantityArr = Array.from(Array(15).keys())
    guestsQuantityArr[0] = 'Гостей'

    let dateArrival = new Date();
    let dateDeparture = new Date()
    const oneDay = 24 * 60 * 60 * 1000;
    dateDeparture = dateDeparture.setDate(dateDeparture.getDate()+1)

    const [startDate, setStartDate] = useState(dateArrival);
    const [endDate, setEndDate] = useState(dateDeparture);
    const nights = Math.round(Math.abs((startDate - endDate) / oneDay))
    // console.log("startDate==>",startDate)
    // console.log("dateDeparture==>",dateDeparture)
    // console.log("endDate==>",endDate)
    console.log(nights);

    let roomPrice = new Map();
    roomPrice.set('Номер-студио', 1250)
    roomPrice.set('Апартаменты-студио', 1750)
    roomPrice.set('Апартаменты', 2000)
    const [toSend, setToSend] = useState({
        room_type: 'Номер-студио',
        room_quantity: '1',
        nights_quantity: '1',
        people_quantity: 'Гостей',
        name_comments: '',
        phone: '',
        email: '',
    });

    console.log(toSend);

    // eslint-disable-next-line
    const regExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g
    const onSubmit = (e) => {
        e.preventDefault();
        (startDate.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) ? swal("Начало бронирования не может быть ранее текущей даты") :
            !toSend.email ? swal("Пожалуйста введите адрес электронной почты") :
                !regExp.test(toSend.phone) ? swal("Номер телефона введен некорректно. Пожалуйста введите номер в ином формате") :
                    send(
                        process.env.REACT_APP_SERVICE_ID,
                        process.env.REACT_APP_TEMPLATE_ID,
                        {...toSend, startDate: `${startDateTrimmed}`, message},
                        process.env.REACT_APP_USER_ID,
                    )
                        .then((response) => {
                            swal("Ваша заявка принята, спасибо! " +
                                "В ближайшее время с Вами свяжется наш сотрудник")
                            console.log('SUCCESS!', response.status, response.text);
                        })
                        .catch((err) => {
                            console.log('FAILED...', err);
                            swal("что-то пошло не так")
                        });
    };

    const handleChange = (e) => {
        setToSend({...toSend, [e.target.name]: e.target.value});
    };
    const startDateTrimmed = moment(startDate).format("LL")
    // const endDateTrimmed = moment(endDate).format("LL")


    let message = 'Выберите параметры и мы рассчитаем стоимость'
    if (toSend.room_type === "Тип комнаты" || toSend.room_quantity === "Количество номеров") {
        message = 'Выберите параметры и мы рассчитаем стоимость'
    } else {
        let messageCount = `Ваше бронирование: ${toSend.room_quantity} ${toSend.room_type} на ${nights} ночь / ночей стоимость от ${toSend.room_quantity * nights * roomPrice.get(`${toSend.room_type}`)} руб`
        message = messageCount
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="container">
                    <h1 className="d-flex justify-content-center">Заявка</h1>
                    <p className="d-flex justify-content-center">{message}</p>
                    <label htmlFor="exampleFormControlSelect2">Тип комнаты</label>
                    <select name='room_type' className="form-select my-2" aria-label="Default select example"
                            value={toSend.room_type}
                            onChange={handleChange}
                    >
                        <option value="Номер-студио">Номер-студио</option>
                        <option value="Апартаменты-студио">Апартаменты-студио</option>
                        <option value="Апартаменты">Апартаменты</option>
                    </select>
                    <label htmlFor="exampleFormControlSelect2">Количество номеров</label>
                    <select name='room_quantity' className="form-select my-2" aria-label="Default select example"
                            value={toSend.room_quantity}
                            onChange={handleChange}>
                        {roomsQuantityArr.map((el, i) => <option key={i}>{el}</option>)}
                    </select>
                    <div className="d-flex">
                        <div style={{width: '600px'}} className="mx-2">Дата заезда
                            <DatePicker name="date_arrival" className="form-select my-2" selected={startDate}
                                value={toSend.date_arrival}
                                        onChange={(date) => setStartDate(date)}/>
                        </div>
                        <div style={{width: '600px'}} className="mx-2">Дата выезда
                            <DatePicker name="date_departure" className="form-select my-2" selected={endDate}
                                value={toSend.date_departure}
                                        onChange={(date) => setEndDate(date)}/>
                        </div>
                        <select name="people_quantity" className="form-select my-2 mx-2" aria-label="Default select example"
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
