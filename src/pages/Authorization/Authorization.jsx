import Axios from 'axios'
import React, { useState} from 'react'
import { Link} from 'react-router-dom'
import './authorization.css'

function Authorization({setRole, navigate, setUser}) {
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState('')
    const [msg, setMsg] = useState('')

    const Auth = ()=>{
        if(password === '' || login === ''){
            setMsg('Поля со * обязательны к заполнению')
        } else{
            Axios.post('http://localhost:9090/app/user/login', {password: password, login: login}).then((response)=>{
                if(response.data.status === "success") {
                    console.log(response.data)
                    if(response.data?.client_status === "active"){
                        navigate('/')
                        setUser(login, password, response.data.id);
                        setRole(response.data.role);
                    } else if(response.data?.client_status === "blocked"){
                        setMsg("Ваш аккаунт был заблокирован! Для разблокировки обратитесь в службу поддержки!");
                    } else if(response.data?.client_status === "deleted"){
                        setMsg("Ваш аккаунт был удален! Желаете вернуть аккаунт?");
                    } else{
                        setRole(response.data.role);
                        navigate('/')
                        setUser(login, password, response.data.id);
                    }
                }
                else if(response.data.status === "not found"){
                    setMsg("Пользователь не найден! Пройдите регистрацию или проверьте ввод логина и пароля!")
                } else{
                    navigate('/error')
                };
            })
        }
    };

    const Yes = ()=>{
        Axios.post('http://localhost:9090/app/client/restoreClient', {password: password, login: login}).then((response)=>{
            if(response.data.status === "success") {
                navigate('/')
                setUser(login, password, response.data.id);
                setRole(response.data.role);
            }
            else{
                navigate('/error')
            };
        })
    }

    const No = ()=>{
        setMsg("");
        navigate('/authorization')
    }

    const Registration = ()=>{
        navigate('/registration')
    }


  return (
    <div className='form'>
        <span className='msg'>Нет аккаунта? Не беда, кликни 'Зарегистрироваться'!</span>
        <Link className='link' to="/registration">Зарегистрироваться</Link>
        <input className='person__value'  type="text" placeholder='*Введите логин' onChange={(event)=>{setPassword(event.target.value)}}/>
        <input className='person__value'  type="password" placeholder='*Введите пароль' onChange={(event)=>{setLogin(event.target.value)}}/>
        <button className='btn save-btn' onClick={() => Auth()}>Войти</button>
        <p className='msg'>{msg}</p>
        {msg === "Ваш аккаунт был удален! Желаете вернуть аккаунт?" ? (
            <>
                <button className='btn read-btn' onClick={() => Yes()}>Да</button>
                <button className='btn delete-btn' onClick={() => No()}>Нет</button>
                <button className='btn update-btn' onClick={() => Registration()}>Зарегистрировать новый</button>
            </>
        ) : (
            <></>
        )}
    </div>
  )
}

export default Authorization