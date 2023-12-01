import React, { useState } from 'react'
import Axios from 'axios'
import formatDate from '../../../function/FormanDate'
import './ditailsBid.css'

function DitailsBid({bid, navigate, role}) {
    const [msg, setMsg] = useState('');
    const [day, setDay] = useState(0);
    const [price, setPrice] = useState(0);

    let approveBid = (item) =>{
        if(role === "MANAGER"){
            let date = new Date(item.data_start);
            date.setDate(new Date(item.data_start).getDate() + +day);
            Axios.post('http://localhost:9090/app/bid/approveBid', {id: item.id, msg:msg, role:role, data_end: formatDate(date), price:price}).then((response)=>{
                if(response.data.status === "success") {
                    navigate("/bid")
                }
                else{
                    navigate('/error')
                };
            })
        } else{
            Axios.post('http://localhost:9090/app/bid/approveBid', {id: item.id, msg:msg, role:role}).then((response)=>{
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
        Axios.post('http://localhost:9090/app/bid/rejectBid', {id:id, msg:msg}).then((response)=>{
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
    <div className='ditails'>
        {role === "MANAGER" ? (
         <>
            <div className='ditails__item'>
                <span className='ditails__type'>Имя клиента: </span>
                <p className='ditails__info'>{bid.name}</p>
            </div>
            <div className='ditails__item'>
                <span className='ditails__type'>Фамилия клиента: </span>
                <p className='ditails__info'>{bid.surname}</p>
            </div>
            <div className='ditails__item'>
                <span className='ditails__type'>Телефон клиента: </span>
                <p className='ditails__info'>{bid.phone}</p>
            </div>
            <div className='ditails__item'>
                <span className='ditails__type'>Почта клиента: </span>
                <p className='ditails__info'>{bid.email}</p>
            </div>
            <div className='ditails__item'>
                <span className='ditails__type'>Дата подачи заявки: </span>
                <p className='ditails__info'>{bid.data_start}</p>
            </div>
            <div className='ditails__item'>
                <span className='ditails__type'>Дата окончания выполнения: </span>
                <p className='ditails__info'>{bid.data_end ? bid.data_end : '-'}</p>
            </div>
            <div className='ditails__item'>
                <span className='ditails__type'>Тип клиента: </span>
                <p className='ditails__info'>{bid.type_user}</p>
            </div>
            <div className='ditails__item'>
                <span className='ditails__type'>Тип заявки: </span>
                <p className='ditails__info' >{bid.type}</p>
            </div>
            <div className='ditails__item'>
                <span className='ditails__type'>Описание заявки: </span>
                <p className='ditails__info'>{bid.description}</p>
            </div>
            <div className='ditails__item'>
                <span className='ditails__type'>Стоимость услуги: </span>
                <p className='ditails__info'>{bid.price ? bid.price : '-'}</p>
            </div>
            <div className='ditails__item'>
                <span className='ditails__type'>Статус заявки: </span>
                <p className='ditails__info'>{bid.status}</p>
            </div>
            {bid.statusId === 10 || bid.statusId === 11 ? (
                <>
                    <div className='ditails__item'>
                        <span className='ditails__type'>Цена выполнения: </span>
                        <input className='person__value' type='number' step={0.01} onChange={(event) => {setPrice(event.target.value)}}/> 
                    </div>
                    <div className='ditails__item'>
                        <span className='ditails__type'>Количество требуемых дней: </span>
                        <input className='person__value' type='number' min={1} max={100} onChange={(event) => {setDay(event.target.value)}}/>
                    </div>
                    <textarea className='person__value' placeholder='Введите сообщение для клиента' onChange={(event)=>{setMsg(event.target.value)}}/>
                    <button className='btn read-btn' onClick={() => approveBid(bid)}>Одобрить</button>
                    <button className='btn delete-btn' onClick={() => rejectBid(bid.id)}>Отклонить</button>
                </>
            ) : (bid.statusId === 14 ? (
                <>
                    
                </>
            ) : (
                <>
                    <button className='btn delete-btn' onClick={() => rejectBid(bid.id)}>Отклонить</button>
                </>
            )
            )}
        </>
        ) : (
            <>
                <div className='ditails__item'>
                    <span className='ditails__type'>Имя менеджера: </span>
                    <p className='ditails__info'>{bid.nameManager}</p>
                </div>
                <div className='ditails__item'>
                    <span className='ditails__type'>Фамилия менеджера: </span>
                    <p className='ditails__info'>{bid.surnameManager}</p>
                </div>
                <div className='ditails__item'>
                    <span className='ditails__type'>Имя клиента: </span>
                    <p className='ditails__info'>{bid.name}</p>
                </div>
                <div className='ditails__item'>
                    <span className='ditails__type'>Фамилия клиента: </span>
                    <p className='ditails__info'>{bid.surname}</p>
                </div>
                <div className='ditails__item'>
                    <span className='ditails__type'>Телефон клиента: </span>
                    <p className='ditails__info'>{bid.phone}</p>
                </div>
                <div className='ditails__item'>
                    <span className='ditails__type'>Почта клиента: </span>
                    <p className='ditails__info'>{bid.email}</p>
                </div>
                <div className='ditails__item'>
                    <span className='ditails__type'>Дата подачи заявки: </span>
                    <p className='ditails__info'>{bid.data_start}</p>
                </div>
                <div className='ditails__item'>
                    <span className='ditails__type'>Дата окончания выполнения: </span>
                    <p className='ditails__info'>{bid.data_end ? bid.data_end : '-'}</p>
                </div>
                <div className='ditails__item'>
                    <span className='ditails__type'>Тип клиента: </span>
                    <p className='ditails__info'>{bid.type_user}</p>
                </div>
                <div className='ditails__item'>
                    <span className='ditails__type'>Тип заявки: </span>
                    <p className='ditails__info' >{bid.type}</p>
                </div>
                <div className='ditails__item'>
                    <span className='ditails__type'>Описание заявки: </span>
                    <p className='ditails__info'>{bid.description}</p>
                </div>
                <div className='ditails__item'>
                    <span className='ditails__type'>Стоимость услуги: </span>
                    <p className='ditails__info'>{bid.price ? bid.price : '-'}</p>
                </div>
                <div className='ditails__item'>
                    <span className='ditails__type'>Статус заявки: </span>
                    <p className='ditails__info'>{bid.status}</p>
                </div>
                <textarea placeholder='Введите сообщение для клиента' onChange={(event)=>{setMsg(event.target.value)}}/>
                <button className='btn read-btn' onClick={() => approveBid(bid)}>Утвердить</button>
                <button className='btn delete-btn' onClick={() => rejectBid(bid.id)}>Отклонить</button>
            </>
        )}
    </div>
  )
}

export default DitailsBid