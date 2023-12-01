import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './manager.css'

function Managers({navigate}) {
    const [managers, setManagers] = useState([]);

    const getManagers = ()=>{
        Axios.get('http://localhost:9090/app/manager/getmanagers').then((response)=>{
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
        Axios.post('http://localhost:9090/app/manager/deleteManager', {id: id}).then((response)=>{
            if(response.data.status === "success"){
                navigate('/managers')
                getManagers();
            } else{
                navigate('/error')
            }
        })
    }

  return (
    <div className='manager'>
        <Link className='link' to="/managers/addManager">Добавить</Link>
        <div className='manager__wrap'>
            {managers.map((item, i)=>
                <div className='manager__item' key={i}>
                    <p>{item.name}</p>
                    <p>{item.surname}</p>
                    <p>{item.phone}</p>
                    <button  className = 'btn delete-btn' onClick={(event) => {deleteManager(event, item.id)}}>Удалить</button>
                </div>
            )}
        </div>
    </div>
  )
}

export default Managers