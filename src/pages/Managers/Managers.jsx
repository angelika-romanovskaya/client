import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Managers({navigate}) {
    const [managers, setManagers] = useState([]);

    const getManagers = ()=>{
        Axios.get('http://localhost:9090/getmanagers').then((response)=>{
            if(response.data.status === "success") {
                setManagers(response.data.managers);
            }
            else{
                navigate('/error')
            };
        })
    }

    useEffect(()=>{
        getManagers();
    }, [])

    const deleteManager = (event, id)=>{
        event.preventDefault();
        Axios.post('http://localhost:9090/deleteManager', {id: id}).then((response)=>{
            if(response.data.status === "success"){
                navigate('/managers')
                getManagers();
            } else{
                navigate('/error')
            }
        })
    }

  return (
    <div>
        <Link to="/managers/addManager">Добавить</Link>
        <Link to="/">Главная</Link>
        {managers.map((item, i)=>
            <div key={i}>
                <p>{item.name}</p>
                <p>{item.surname}</p>
                <p>{item.phone}</p>
                <button onClick={(event) => {deleteManager(event, item.id)}}>Удалить</button>
            </div>
        )}
    </div>
  )
}

export default Managers