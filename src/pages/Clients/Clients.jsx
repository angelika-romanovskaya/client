import Axios from 'axios';
import React, { useEffect, useState } from 'react'

function Clients({navigate}) {
    const [clients, setClients] = useState([]);

    const getClients = ()=>{
        Axios.get('http://localhost:9090/getclients').then((response)=>{
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
        Axios.post('http://localhost:9090/blockedClient', {id: id}).then((response)=>{
            if(response.data.status === "success"){
                navigate('/clients')
                getClients();
            } else{
                navigate('/error')
            }
        })
    }

  return (
    <div>
        {clients.map((item, i)=>
            <div key={i}>
                <p>{item.login}</p>
                <p>{item.status}</p>
                <p>{item.name}</p>
                <p>{item.surname}</p>
                <p>{item.patronymic}</p>
                <p>{item.email}</p>
                <p>{item.phone}</p>
                <button onClick={(event) => {blockedClient(event, item.id)}}>Заблокировать</button>
            </div>
        )}
    </div>
  )
}

export default Clients