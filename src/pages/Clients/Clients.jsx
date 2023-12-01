import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import './client.css'

function Clients({navigate}) {
    const [clients, setClients] = useState([]);

    const getClients = ()=>{
        Axios.get('http://localhost:9090/app/client/getclients').then((response)=>{
            if(response.data.status === "success") {
                setClients(response.data.clients);
            }
            else{
                navigate('/error')
            };
        })
    }

    useEffect(()=>{
        getClients();
    }, [])

    const blockedClient = (event, id)=>{
        event.preventDefault();
        Axios.post('http://localhost:9090/app/client/blockedClient', {id: id}).then((response)=>{
            if(response.data.status === "success"){
                getClients();
                navigate('/clients')
            } else{
                navigate('/error')
            }
        })
    }

    const unblockedClient = (event, id)=>{
        event.preventDefault();
        Axios.post('http://localhost:9090/app/client/unblockedClient', {id: id}).then((response)=>{
            if(response.data.status === "success"){
                getClients();
                navigate('/clients')
            } else{
                navigate('/error')
            }
        })
    }

  return (
    <div className='client'>
        {clients.map((item, i)=>
            <div className='client__item' key={i}>
                <p>{item.login}</p>
                <p>{item.status}</p>
                <p>{item.name}</p>
                <p>{item.surname}</p>
                <p>{item.patronymic}</p>
                <p>{item.email}</p>
                <p>{item.phone}</p>
                {item.status === "active" ? (
                    <>
                        <button className='btn delete-btn' onClick={(event) => {blockedClient(event, item.id)}}>Заблокировать</button>
                    </>
                ):(item.status === "blocked" ?
                <>
                    <button className='btn read-btn' onClick={(event) => {unblockedClient(event, item.id)}}>Разблокировать</button>
                </> : <></>
                )}
            </div>
        )}
    </div>
  )
}

export default Clients