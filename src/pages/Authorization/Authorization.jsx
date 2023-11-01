import Axios from 'axios'
import React, { useState} from 'react'
import { Link} from 'react-router-dom'

function Authorization({setRole, navigate, setLoginPassword}) {
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState('')
    const [msg, setMsg] = useState('')

    const Auth = ()=>{
        Axios.post('http://localhost:9090/login', {password: password, login: login}).then((response)=>{
            if(response.data.status === "success") {
                setRole(response.data.role);
                navigate('/')
                setLoginPassword(login, password);
            }
            else if(response.data.status === "not found"){
                // navigate('/registration')
                setMsg("Пользователь не найден! Пройдите регистрацию или проверьте ввод логина и пароля!")
            } else{
                navigate('/error')
            };
        })
    };

  return (
    <div>
        <Link to="/registration">Зарегистрироваться</Link>
        <input type="text" placeholder='Введите логин' onChange={(event)=>{setPassword(event.target.value)}}/>
        <input type="password" placeholder='Введите пароль' onChange={(event)=>{setLogin(event.target.value)}}/>
        <button onClick={() => Auth()}>Войти</button>
        <p>{msg}</p>
    </div>
  )
}

export default Authorization