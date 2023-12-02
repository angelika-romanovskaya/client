import React, { useState } from 'react'
import Axios from 'axios'
import formatDate from '../../../function/FormanDate'
import './addBid.css'

function AddBid({navigate, id}) {
    const [type, setType] = useState('')
    const [typeUser, setTypeUser] = useState('')
    const [description, setDescription] = useState('')
    const [msg, setMsg] = useState('')

    let setChecked = (event) =>{
        if(event.target.checked){
            setTypeUser(event.target.value);
        }
    }

    const AddBid = () => {
        if(type === '' || typeUser === '') {
            setMsg('Поля со * обязательны к заполнению')
        } else{
            Axios.post('http://localhost:9090/app/bid/addbid', {id: id, type: type, description:description, typeUser: typeUser, dataStart: formatDate(new Date())}).then((response)=>{
                if(response.data.status === "success"){
                    navigate('/')
                } else{
                    navigate('/error')
                }
            })
        }
    };

  return (
    <div className='form'>
        <fieldset className='form__type'>
            <legend className='form__legend'>*Выберите кем вы являетесь:</legend>

            <div className='form__wrap'>
                <div>
                    <input type="radio" id="gos" name="type_user" value="Гос. учреждение" onChange={(event) => setChecked(event)}/>
                    <label htmlFor="gos">Гос. учреждение</label>
                </div>

                <div>
                    <input type="radio" id="ur" name="type_user" value="Иное юр. лицо" onChange={(event) => setChecked(event)}/>
                    <label htmlFor="ur">Иное юр. лицо</label>
                </div>

                <div>
                    <input type="radio" id="fis" name="type_user" value="Физ. лицо" onChange={(event) => setChecked(event)}/>
                    <label htmlFor="fis">Физ. лицо</label>
                </div>
            </div>
        </fieldset>
        <input className='person__value' type="text" placeholder='*Введите краткое описание задачи' onChange={(event)=>{setType(event.target.value)}}/>
        <textarea className='person__value'  col = "30" row = "20" placeholder='Введите дополнительную информацию' onChange={(event)=>{setDescription(event.target.value)}}/>
        <button className='btn read-btn' onClick={AddBid}>Отправить</button>
        <p className='msg'>{msg}</p>
    </div>
  )
}

export default AddBid