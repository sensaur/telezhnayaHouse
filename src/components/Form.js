import React, {useState} from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Form(props) {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <form>
            <div className="container">
                <h1 className="d-flex justify-content-center">Заявка</h1>
                <select className="form-select my-2" aria-label="Default select example">
                    <option selected>Тип комнаты</option>
                    <option value="1">Апартаменты</option>
                    <option value="2">Апартаменты-студио</option>
                    <option value="3">Номер-студио</option>
                </select>
                <select className="form-select my-2" aria-label="Default select example">
                    <option selected>Количество номеров</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <div className="d-flex">
                    <div style={{width : '600px'}} >Дата заезда
                        <DatePicker className="form-select my-2" selected={startDate}
                                    onChange={(date) => setStartDate(date)}/>
                    </div>
                    <select className="form-select my-2 mx-2" aria-label="Default select example">
                        <option selected>Количество ночей</option>
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
                    <select className="form-select my-2" aria-label="Default select example">
                        <option selected>Количество человек</option>
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
                    <input type="email" className="form-control" id="exampleFormControlInput1"
                           placeholder="name@example.com"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Имя / комментарии</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Телефон</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
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
