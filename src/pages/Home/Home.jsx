import React from 'react'
import { Link } from 'react-router-dom'

function Home({role, setRole, navigate}) {
  return (
    <div>
        {role === '' ? (
            <>
                <Link to="/registration">Зарегистрироваться</Link>
                <Link to="/authorization">Войти</Link>
            </>
        ) : (
            role === "CLIENT" ? (
                <>
                    <Link to="/bid">Заявки</Link>
                    <Link to="/registration">Зарегистрироваться</Link>
                    <button onClick={()=>{setRole(''); navigate('/')}}>Выйти</button>
                </>
            ) : (
                role === "ADMIN" ? (
                    <>
                        <Link to="/">Выйти</Link>
                    </>
                ) : (
                    <>
                        <Link to="/bid">Заявки</Link>
                        <Link to="/">Выйти</Link>
                    </>
                )
            )
        )}
    </div>
  )
}

export default Home