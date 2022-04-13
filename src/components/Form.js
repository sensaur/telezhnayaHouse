import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import {send} from 'emailjs-com';
import swal from 'sweetalert';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";

function Form() {
    const [startDate, setStartDate] = useState(new Date());
    let roomPrice = new Map();
    roomPrice.set('Номер-студио', 1250)
    roomPrice.set('Апартаменты-студио', 1750)
    roomPrice.set('Апартаменты', 2000)

    const [toSend, setToSend] = useState({
        room_type: '',
        room_quantity: '',
        nights_quantity: '',
        people_quantity: '',
        name_comments: '',
        phone: '',
    });

    // console.log(startDate)
    const regExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g
    // console.log(re.test(toSend.phone))
    // console.log(Date.now())
    // console.log(startDate.setHours(0,0,0,0) >= new Date().setHours(0,0,0,0))
    // console.log(toSend)
    // console.log(toSend.hasOwnProperty('email'))

    const onSubmit = (e) => {
        e.preventDefault();
        (startDate.setHours(0,0,0,0) < new Date().setHours(0,0,0,0)) ? swal("Начало бронирования не может быть ранее текущей даты") :
            !toSend.hasOwnProperty('email') ? swal("Пожалуйста введите адрес электронной почты") :
                !regExp.test(toSend.phone) ? swal("Номер введен некорректно. Пожалуйста введите номер в ином формате") :
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
    let message = ''
    if (toSend.room_quantity !== "" & toSend.room_type !== "" & toSend.nights_quantity !== "") {
        let messageCount = `Ваше бронирование: ${toSend.room_quantity} ${toSend.room_type} на ${toSend.nights_quantity} ночь / ночей стоимость от ${toSend.room_quantity * toSend.nights_quantity * roomPrice.get(`${toSend.room_type}`)} руб`
        message = messageCount
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="container">
                    <h1 className="d-flex justify-content-center">Заявка</h1>
                    <p className="d-flex justify-content-center">{message}</p>
                    <select name='room_type' className="form-select my-2" aria-label="Default select example"
                            value={toSend.room_type}
                            onChange={handleChange}>
                        <option selected>Тип комнаты</option>
                        <option selected>Тип комнаты</option>
                        <option value="Номер-студио">Номер-студио</option>
                        <option value="Апартаменты-студио">Апартаменты-студио</option>
                        <option value="Апартаменты">Апартаменты</option>
                    </select>
                    <select name='room_quantity' className="form-select my-2" aria-label="Default select example"
                            value={toSend.room_quantity}
                            onChange={handleChange}>
                        <option selected>Количество номеров</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <div className="d-flex">
                        <div style={{width: '600px'}}>Дата заезда
                            {/*<DatePicker name="date_arrival" className="form-select my-2" selected={startDate}*/}
                            {/*            onChange={(date) => setStartDate(date)}/>*/}
                            <DatePicker name="date_arrival" className="form-select my-2" selected={startDate}
                                        value={toSend.date_arrival}
                                        onChange={(date) => setStartDate(date)}/>
                        </div>
                        <select name='nights_quantity' className="form-select my-2 mx-2"
                                aria-label="Default select example"
                                value={toSend.nights_quantity}
                                onChange={handleChange}>>
                            <option selected>ночей</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                        </select>
                        <select name="people_quantity" className="form-select my-2" aria-label="Default select example"
                                value={toSend.people_quantity}
                                onChange={handleChange}>>>
                            <option selected>гостей</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
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
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Телефон</label>
                        <textarea name="phone" className="form-control" id="exampleFormControlTextarea1" rows="3"
                                  value={toSend.phone}
                                  placeholder="+79123456789"
                                  onChange={handleChange}></textarea>
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
