import React, { useState } from 'react'
import PhoneInput from '../../../components/PhoneInput/PhoneInput'
import Axios from 'axios'

function AddManager({navigate}) {
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [msg, setMsg] = useState('')

    const handleInput = ({ target: { value } }) => setPhone(value);

    const AddManager = (event)=>{
        event.preventDefault();
        Axios.post('http://localhost:9090/app/manager/addmanager', {password: password, login: login, name: name, surname:surname, phone:phone}).then((response)=>{
            if(response.data.status === "success"){
                navigate('/managers')
            } else if(response.data.status === "duplicate"){
                setMsg("Логин занят");
            } else{
                navigate('/error')
            }
        })
    };
    return (
        <form className='form'>
            <input className='person__value' type="text" placeholder='Введите фамилию' onChange={(event)=>{setSurname(event.target.value)}}/>
            <input className='person__value' type="text" placeholder='Введите имя' onChange={(event)=>{setName(event.target.value)}}/>
            <PhoneInput className='person__value' value={phone} onChange={handleInput}/>
            <input className='person__value' type="text" placeholder='Введите логин' onChange={(event)=>{setPassword(event.target.value)}}/>
            <input className='person__value' type="password" placeholder='Придумайте пароль' onChange={(event)=>{setLogin(event.target.value)}}/>
            <button className='btn read-btn' type='submit' onClick={(event) => AddManager(event)}>Добавить менеджера</button>
            <p>{msg}</p>
        </form>
    )
}

export default AddManager