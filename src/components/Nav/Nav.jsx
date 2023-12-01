import React from 'react'
import { Link } from 'react-router-dom';
import './nav.css'

function Nav({role, setInfoNull, navigate, location}) {
    return (
        <nav className='nav'>
            {role === '' ? (
                <>
                    <Link className={location.pathname === '/' ? 'nav__item active' : 'nav__item' } to="/">Главная</Link>
                    <Link className={location.pathname === '/authorization' ? 'nav__item active' : 'nav__item' } to="/authorization">Войти</Link>
                </>
            ) : (
                role.role === "CLIENT" ? (
                    <>
                        <Link className={location.pathname === '/' ? 'nav__item active' : 'nav__item' } to="/">Главная</Link>
                        <Link className={location.pathname === '/person' ? 'nav__item active' : 'nav__item' } to="/person">Личный кабинет</Link>
                        <Link className={location.pathname === '/bid' ? 'nav__item active' : 'nav__item' } to="/bid">Заявки</Link>
                        <button className='btn delete-btn' onClick={()=>{setInfoNull(); navigate('/')}}>Выйти</button>
                    </>
                ) : (
                    role.role === "ADMIN" ? (
                        <>
                            <Link className={location.pathname === '/' ? 'nav__item active' : 'nav__item' } to="/">Главная</Link>
                            <Link className={location.pathname === '/person' ? 'nav__item active' : 'nav__item' } to="/person">Личный кабинет</Link>
                            <Link className={location.pathname === '/managers' ? 'nav__item active' : 'nav__item' } to="/managers">Менеджеры</Link>
                            <Link className={location.pathname === '/clients' ? 'nav__item active' : 'nav__item' } to="/clients">Клиенты</Link>
                            <Link className={location.pathname === '/bid' ? 'nav__item active' : 'nav__item' } to="/bid">Заявки</Link>
                            <Link className={location.pathname === '/summary' ? 'nav__item active' : 'nav__item' } to="/summary">Сводка</Link>
                            <Link className={location.pathname === '/chart' ? 'nav__item active' : 'nav__item' } to="/chart">Статистика</Link>
                            <Link className={location.pathname === '/report' ? 'nav__item active' : 'nav__item' } to="/report">Отчеты</Link>
                            <button className='btn delete-btn' onClick={()=>{setInfoNull(); navigate('/')}}>Выйти</button>
                        </>
                    ) : (
                        <>
                            <Link className={location.pathname === '/' ? 'nav__item active' : 'nav__item' } to="/">Главная</Link>
                            <Link className={location.pathname === '/person' ? 'nav__item active' : 'nav__item' } to="/person">Личный кабинет</Link>
                            <Link className={location.pathname === '/bid' ? 'nav__item active' : 'nav__item' } to="/bid">Заявки</Link>
                            <Link className={location.pathname === '/calls' ? 'nav__item active' : 'nav__item' } to="/calls">Звонки</Link>
                            <button className='btn delete-btn' onClick={()=>{setInfoNull(); navigate('/')}}>Выйти</button>
                        </>
                    )
                )
            )}
        </nav>
      )
}

export default Nav