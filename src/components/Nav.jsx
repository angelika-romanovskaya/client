import React from 'react'
import { Link } from 'react-router-dom';

function Nav({role, setInfoNull, navigate}) {
    return (
        <div>
            {role === '' ? (
                <>
                    <Link to="/">Главная</Link>
                    <Link to="/authorization">Войти</Link>
                </>
            ) : (
                role === "CLIENT" ? (
                    <>
                        <Link to="/person">Личный кабинет</Link>
                        <Link to="/">Главная</Link>
                        <Link to="/bid">Заявки</Link>
                        <button onClick={()=>{setInfoNull(); navigate('/')}}>Выйти</button>
                    </>
                ) : (
                    role === "ADMIN" ? (
                        <>
                            <Link to="/">Главная</Link>
                            <Link to="/person">Личный кабинет</Link>
                            <Link to="/managers">Менеджеры</Link>
                            <Link to="/clients">Клиенты</Link>
                            <button onClick={()=>{setInfoNull(); navigate('/')}}>Выйти</button>
                        </>
                    ) : (
                        <>
                            <Link to="/person">Личный кабинет</Link>
                            <Link to="/">Главная</Link>
                            <Link to="/bid">Заявки</Link>
                            <Link to="/calls">Звонки</Link>
                            <button onClick={()=>{setInfoNull(); navigate('/')}}>Выйти</button>
                        </>
                    )
                )
            )}
        </div>
      )
}

export default Nav