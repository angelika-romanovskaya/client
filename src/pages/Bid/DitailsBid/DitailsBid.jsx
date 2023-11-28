import React, { useState } from 'react'
import Axios from 'axios'
import formatDate from '../../../function/FormanDate'

function DitailsBid({bid, navigate, role}) {
    const [msg, setMsg] = useState('');
    const [day, setDay] = useState(0);
    const [price, setPrice] = useState(0);

    let approveBid = (item) =>{
        if(role === "MANAGER"){
            let date = new Date(item.data_start);
            date.setDate(new Date(item.data_start).getDate() + +day);
            Axios.post('http://localhost:9090/approveBid', {id: item.id, msg:msg, role:role, data_end: formatDate(date), price:price}).then((response)=>{
                if(response.data.status === "success") {
                    navigate("/bid")
                }
                else{
                    navigate('/error')
                };
            })
        } else{
            Axios.post('http://localhost:9090/approveBid', {id: item.id, msg:msg, role:role}).then((response)=>{
                if(response.data.status === "success") {
                    navigate("/bid")
                }
                else{
                    navigate('/error')
                };
            })
        }
    }

    let rejectBid = (id) =>{
        Axios.post('http://localhost:9090/rejectBid', {id:id, msg:msg}).then((response)=>{
            if(response.data.status === "success") {
                navigate("/bid")
            }
            else{
                navigate('/error')
            };
        })
    }

    let generetionDocument = (item) =>{

    }

  return (
    <div>
        {role === "MANAGER" ? (
         <>
            <p>{bid.name}</p>
            <p>{bid.surname}</p>
            <p>{bid.phone}</p>
            <p>{bid.email}</p>
            <p>{bid.data_start}</p>
            <p>{bid.data_end}</p>
            <p>{bid.type_user}</p>
            <p>{bid.type}</p>
            <p>{bid.description}</p>
            <p>{bid.price}</p>
            <p>{bid.status}</p>
            {bid.id_status === 1 || bid.id_status === 2 ? (
                <>
                    <input type='number' step={0.01} onChange={(event) => {setPrice(event.target.value)}}/> 
                    <input type='number' min={1} max={100} onChange={(event) => {setDay(event.target.value)}}/>
                    <textarea placeholder='Введите сообщение для клиента' onChange={(event)=>{setMsg(event.target.value)}}/>
                    <button onClick={() => approveBid(bid)}>Одобрить</button>
                    <button onClick={() => rejectBid(bid.id)}>Отклонить</button>
                </>
            ) : (bid.id_status === 6 ? (
                <>
                    <button onClick={() => generetionDocument(bid)}>Оформить договор</button>
                </>
            ) : (
                <>
                    <button onClick={() => rejectBid(bid.id)}>Отклонить</button>
                </>
            )
            )}
        </>
        ) : (
            <>
                <p>{bid.nameManager}</p>
                <p>{bid.surnameManager}</p>
                <p>{bid.name}</p>
                <p>{bid.surname}</p>
                <p>{bid.phone}</p>
                <p>{bid.email}</p>
                <p>{bid.data_start}</p>
                <p>{bid.data_end}</p>
                <p>{bid.type_user}</p>
                <p>{bid.type}</p>
                <p>{bid.description}</p>
                <p>{bid.price}</p>
                <p>{bid.status}</p>
                <textarea placeholder='Введите сообщение для клиента' onChange={(event)=>{setMsg(event.target.value)}}/>
                <button onClick={() => approveBid(bid)}>Утвердить</button>
                <button onClick={() => rejectBid(bid.id)}>Отклонить</button>
            </>
        )}
    </div>
  )
}

export default DitailsBid