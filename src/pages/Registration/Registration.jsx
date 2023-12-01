import React from 'react'
import { useState } from 'react';
import Axios from 'axios'
import PhoneInput from '../../components/PhoneInput/PhoneInput';

function Registration({setRole, navigate, setUser}) {
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [msg, setMsg] = useState('')

    const phoneInput = ({ target: { value } }) => setPhone(value);

    const AddUser = ()=>{
        Axios.post('http://localhost:9090/app/user/registration', {password: password, login: login, name: name, surname:surname, patronymic:patronymic, email: email, phone:phone}).then((response)=>{
            if(response.data.status === "success"){
                setUser(login, password, response.data.id);
                setRole("CLIENT");
                navigate('/')
            } else if(response.data.status === "duplicate"){
                setMsg("Логин занят");
            } else{
                navigate('/error')
            }
        })
    };
    return (
        <div className='form'>
            <input className='person__value' type="text" placeholder='Введите вашу фамилию' onChange={(event)=>{setSurname(event.target.value)}}/>
            <input className='person__value' type="text" placeholder='Введите ваше имя' onChange={(event)=>{setName(event.target.value)}}/>
            <input className='person__value' type="text" placeholder='Введите ваше отчество' onChange={(event)=>{setPatronymic(event.target.value)}}/>
            <input className='person__value' type="email" placeholder='Введите ваш email' onChange={(event)=>{setEmail(event.target.value)}}/>
            <PhoneInput className='person__value' value={phone} onChange={phoneInput}/>
            <input className='person__value' type="text" placeholder='Введите логин' onChange={(event)=>{setPassword(event.target.value)}}/>
            <input className='person__value' type="password" placeholder='Придумайте пароль' onChange={(event)=>{setLogin(event.target.value)}}/>
            <button className='btn save-btn' onClick={AddUser}>Зарегистрироваться</button>
            <p>{msg}</p>
        </div>
    )
}

export default Registration