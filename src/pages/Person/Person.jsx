import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import PhoneInput from '../../components/PhoneInput'
import Canvas from '../Canvas/Canvas';

function Person({role, password, login, navigate, setLoginPassword, setRole}) {
    const [id, setId] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [passwords, setPasswords] = useState('')
    const [logins, setLogins] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [blob, setBlob] = useState('');

    const phoneInput = ({ target: { value } }) => setPhone(value);
    const nameInput = ({ target: { value } }) => setName(value);
    const surnameInput = ({ target: { value } }) => setSurname(value);
    const patronymicInput = ({ target: { value } }) => setPatronymic(value);
    const loginsInput = ({ target: { value } }) => setLogins(value);
    const passwordsInput = ({ target: { value } }) => setPasswords(value);
    const emailInput = ({ target: { value } }) => setEmail(value);


    const getInfo = ()=>{
        Axios.post('http://localhost:9090/getpersoninfo', {role: role, password: password, login:login}).then((response)=>{
            if(response.data.status === "success") {
                setId(response.data.info.id)
                setPhone(response.data.info?.phone)
                setName(response.data.info?.name)
                setSurname(response.data.info?.surname)
                setPatronymic(response.data.info?.patronymic)
                setEmail(response.data.info?.email)
                setLogins(response.data.info.login)
                setPasswords(response.data.info.password)
                setBlob(response.data.info?.signature)
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
            Axios.post('http://localhost:9090/updatepersoninfo', {id:id, role: role, password: passwords, login: logins, name: name, surname: surname,patronymic: patronymic, phone: phone, email: email}).then((response)=>{
                if(response.data.status === "success") {
                    setLoginPassword(logins, passwords);
                }
                else{
                    navigate('/error')
                };
            })
        } else if(role === "MANAGER"){
            Axios.post('http://localhost:9090/updatepersoninfo', {id:id, role: role, password: passwords, login: logins, name: name, surname: surname, phone: phone}).then((response)=>{
                if(response.data.status === "success") {
                    setLoginPassword(logins, passwords);
                }
                else{
                    navigate('/error')
                };
            })
        } else{
            Axios.post('http://localhost:9090/updatepersoninfo', {id:id, role: role, password: passwords, login: logins}).then((response)=>{
                if(response.data.status === "success") {
                    setLoginPassword(logins, passwords);
                }
                else{
                    navigate('/error')
                };
            })
        }
        setDisabled(true);
    }

    const deleteClient = ()=>{
        Axios.post('http://localhost:9090/deleteClient', {id:id}).then((response)=>{
            if(response.data.status === "success") {
                navigate('/')
                setLoginPassword('', '');
                setRole('')
            }
            else{
                navigate('/error')
            };
        })
    }

  return (
    <div>
        {role === "ADMIN" ? (
            <>
                <input disabled = {disabled} type='text' value={logins} onChange={loginsInput}/>
                <input disabled = {disabled} type='password' value={passwords} onChange={passwordsInput}/>
                <p>Оставьте подпись для подтверждения документов</p>
                <Canvas id = {id} navigate={navigate} blob={blob}/>
            </>
        ) : (
            role === "CLIENT" ? (
                <>
                    <input disabled = {disabled} type='text' value={name} onChange={nameInput}/>
                    <input disabled = {disabled} type='text' value={surname} onChange={surnameInput}/>
                    <input disabled = {disabled} type='text' value={patronymic} onChange={patronymicInput}/>
                    <input disabled = {disabled} type='email' value={email} onChange={emailInput}/>
                    <PhoneInput disabled = {disabled} value={phone} onChange={phoneInput}/>
                    <input disabled = {disabled} type='text' value={logins} onChange={loginsInput}/>
                    <input disabled = {disabled} type='password' value={passwords} onChange={passwordsInput}/>
                    <button onClick={deleteClient}>Удалить аккаунт</button>
                </>
            ) : (
                <>
                    <input disabled = {disabled} type='text' value={name} onChange={nameInput}/>
                    <input disabled = {disabled} type='text' value={surname} onChange={surnameInput}/>
                    <PhoneInput disabled = {disabled} value={phone} onChange={phoneInput}/>
                    <input disabled = {disabled} type='text' value={logins} onChange={loginsInput}/>
                    <input disabled = {disabled} type='password' value={passwords} onChange={passwordsInput}/>
                    <p>Оставьте подпись для подтверждения документов</p>
                    <Canvas id = {id} navigate={navigate} blob={blob}/>
                </>
            )
        )}
        <button id='update-btn' disabled = {!disabled} onClick={updateInfo}>Редактировать</button>
        <button id='save-btn' disabled = {disabled} onClick={saveInfo}>Сохранить</button>
    </div>
  )
}

export default Person