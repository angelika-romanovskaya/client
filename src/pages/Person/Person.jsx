import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import PhoneInput from '../../components/PhoneInput/PhoneInput'
import './person.css'

function Person({role, id, navigate, setUser, setRole}) {
    const [disabled, setDisabled] = useState(true);
    const [passwords, setPasswords] = useState('')
    const [logins, setLogins] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const [msg, setMsg] = useState('')

    const phoneInput = ({ target: { value } }) => setPhone(value);
    const nameInput = ({ target: { value } }) => setName(value);
    const surnameInput = ({ target: { value } }) => setSurname(value);
    const patronymicInput = ({ target: { value } }) => setPatronymic(value);
    const loginsInput = ({ target: { value } }) => setLogins(value);
    const passwordsInput = ({ target: { value } }) => setPasswords(value);
    const emailInput = ({ target: { value } }) => setEmail(value);

    const getInfo = ()=>{
        Axios.post('http://localhost:9090/app/person/getpersoninfo', {role: role, id:id}).then((response)=>{
            if(response.data.status === "success") {
                setPhone(response.data.info?.phone)
                setName(response.data.info?.name)
                setSurname(response.data.info?.surname)
                setPatronymic(response.data.info?.patronymic)
                setEmail(response.data.info?.email)
                setLogins(response.data.info.login)
                setPasswords(response.data.info.password)
            }
            else{
                navigate('/error')
            };
        })
    }

    useEffect(()=>{
        getInfo();
    }, [])

    const updateInfo = ()=>{
        setDisabled(false);
    }

    const saveInfo = () =>{
        if(role === "CLIENT"){
            if(passwords === '' || logins === '' || name === '' || surname === '' || patronymic === '' || phone === '' || email === ''){
                setMsg("Поля со * обязательны к заполнению")
            } else{
                Axios.post('http://localhost:9090/app/person/updatepersoninfo', {id:id, role: role, password: passwords, login: logins, name: name, surname: surname, patronymic: patronymic, phone: phone, email: email}).then((response)=>{
                    if(response.data.status === "success") {
                        setUser(logins, passwords, id);
                    }
                    else{
                        navigate('/error')
                    };
                })
                setMsg('')
            }
        } else if(role === "MANAGER"){
            if(passwords === '' || logins === '' || name === '' || surname === '' || phone === ''){
                setMsg("Поля со * обязательны к заполнению")
            } else{
                Axios.post('http://localhost:9090/app/person/updatepersoninfo', {id:id, role: role, password: passwords, login: logins, name: name, surname: surname, phone: phone}).then((response)=>{
                    if(response.data.status === "success") {
                        setUser(logins, passwords, id);
                    }
                    else{
                        navigate('/error')
                    };
                })
                setMsg('')
            }
        } else{
            if(passwords === '' || logins === ''){
                setMsg("Поля со * обязательны к заполнению")
            } else{
                Axios.post('http://localhost:9090/app/person/updatepersoninfo', {id:id, role: role, password: passwords, login: logins}).then((response)=>{
                    if(response.data.status === "success") {
                        setUser(logins, passwords, id);
                    }
                    else{
                        navigate('/error')
                    };
                })
                setMsg('')
            }
        }
        setDisabled(true);
    }

    const deleteClient = ()=>{
        Axios.post('http://localhost:9090/app/client/deleteClient', {id:id}).then((response)=>{
            if(response.data.status === "success") {
                navigate('/')
                setUser('', '', '');
                setRole('')
            }
            else{
                navigate('/error')
            };
        })
    }

  return (
    <div className='person'>
        {role === "ADMIN" ? (
            <>
                <div className='person__item'>
                    <span className='person__type'>*Логин:</span>
                    <input className='person__value' disabled = {disabled} type='text' value={logins} onChange={loginsInput}/>
                </div>
                <div className='person__item'>
                    <span className='person__type'>*Пароль:</span>
                    <input className='person__value'  disabled = {disabled} type='password' value={passwords} onChange={passwordsInput}/>
                </div>
                <div className='person__btn'>
                    <button className='btn update-btn' id='update-btn' disabled = {!disabled} onClick={updateInfo}>Редактировать</button>
                    <button className='btn save-btn' id='save-btn' disabled = {disabled} onClick={saveInfo}>Сохранить</button>
                </div>
            </>
        ) : (
            role === "CLIENT" ? (
                <>
                    <div className='person__item'>
                        <span className='person__type'>*Фамилия:</span>
                        <input className='person__value' disabled = {disabled} type='text' value={surname} onChange={surnameInput}/>
                    </div>
                    <div className='person__item'>
                        <span className='person__type'>*Имя:</span>
                        <input className='person__value' disabled = {disabled} type='text' value={name} onChange={nameInput}/>
                    </div>
                    <div className='person__item'>
                        <span className='person__type'>*Отчество:</span>
                        <input className='person__value' disabled = {disabled} type='text' value={patronymic} onChange={patronymicInput}/>
                    </div>
                    <div className='person__item'>
                        <span className='person__type'>*E-mail:</span>
                        <input className='person__value' disabled = {disabled} type='email' value={email} onChange={emailInput}/>
                    </div>
                    <div className='person__item'>
                        <span className='person__type'>*Телефон:</span>
                        <PhoneInput className='person__value' disabled = {disabled} value={phone} onChange={phoneInput}/>
                    </div>
                    <div className='person__item'>
                        <span className='person__type'>*Логин:</span>
                        <input className='person__value' disabled = {disabled} type='text' value={logins} onChange={loginsInput}/>
                    </div>
                    <div className='person__item'>
                        <span className='person__type'>*Пароль:</span>
                        <input className='person__value'  disabled = {disabled} type='password' value={passwords} onChange={passwordsInput}/>
                    </div>
                    <div className='person__btn'>
                        <button className='btn delete-btn' onClick={deleteClient}>Удалить</button>
                        <button className='btn update-btn' id='update-btn' disabled = {!disabled} onClick={updateInfo}>Редактировать</button>
                        <button className='btn save-btn' id='save-btn' disabled = {disabled} onClick={saveInfo}>Сохранить</button>
                    </div>
                </>
            ) : (
                <>
                    <div className='person__item'>
                        <span className='person__type'>*Фамилия:</span>
                        <input className='person__value' disabled = {disabled} type='text' value={surname} onChange={surnameInput}/>
                    </div>
                    <div className='person__item'>
                        <span className='person__type'>*Имя:</span>
                        <input className='person__value' disabled = {disabled} type='text' value={name} onChange={nameInput}/>
                    </div>
                    <div className='person__item'>
                        <span className='person__type'>*Телефон:</span>
                        <PhoneInput className='person__value' disabled = {disabled} value={phone} onChange={phoneInput}/>
                    </div>
                    <div className='person__item'>
                        <span className='person__type'>*Логин:</span>
                        <input className='person__value' disabled = {disabled} type='text' value={logins} onChange={loginsInput}/>
                    </div>
                    <div className='person__item'>
                        <span className='person__type'>*Пароль:</span>
                        <input className='person__value'  disabled = {disabled} type='password' value={passwords} onChange={passwordsInput}/>
                    </div>
                    <div className='person__btn'>
                        <button className='btn update-btn' id='update-btn' disabled = {!disabled} onClick={updateInfo}>Редактировать</button>
                        <button className='btn save-btn' id='save-btn' disabled = {disabled} onClick={saveInfo}>Сохранить</button>
                    </div>
                </>
            )
        )}
        <p className='msg'>{msg}</p>
    </div>
  )
}

export default Person