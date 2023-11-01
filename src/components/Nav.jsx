import React from 'react'
import { Link } from 'react-router-dom';

function Nav({role, setRole, navigate}) {
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
                        <button onClick={()=>{setRole(''); navigate('/')}}>Выйти</button>
                    </>
                ) : (
                    role === "ADMIN" ? (
                        <>
                            <Link to="/">Главная</Link>
                            <Link to="/managers">Менеджеры</Link>
                            <button onClick={()=>{setRole(''); navigate('/')}}>Выйти</button>
                        </>
                    ) : (
                        <>
                            <Link to="/person">Личный кабинет</Link>
                            <Link to="/">Главная</Link>
                            <Link to="/bid">Заявки</Link>
                            <button onClick={()=>{setRole(''); navigate('/')}}>Выйти</button>
                        </>
                    )
                )
            )}
        </div>
      )
}

export default Nav