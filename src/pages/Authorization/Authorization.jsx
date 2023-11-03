import Axios from 'axios'
import React, { useState} from 'react'
import { Link} from 'react-router-dom'

function Authorization({setRole, setStatus, navigate, setLoginPassword}) {
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState('')
    const [msg, setMsg] = useState('')

    const Auth = ()=>{
        Axios.post('http://localhost:9090/login', {password: password, login: login}).then((response)=>{
            if(response.data.status === "success") {
                if(response.data?.client_status === "active"){
                    navigate('/')
                    setLoginPassword(login, password);
                    setRole(response.data.role);
                } else if(response.data?.client_status === "blocked"){
                    setMsg("Ваш аккаунт был заблокирован! Для разблокировки обратитесь в службу поддержки!");
                } else if(response.data?.client_status === "deleted"){
                    setMsg("Ваш аккаунт был удален! Желаете вернуть аккаунт?");
                } else{
                    setRole(response.data.role);
                    navigate('/')
                    setLoginPassword(login, password);
                }
            }
            else if(response.data.status === "not found"){
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