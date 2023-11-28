import React, { useState } from 'react'
import Axios from 'axios'
import formatDate from '../../../function/FormanDate'

function AddBid({navigate, id}) {
    const [type, setType] = useState('')
    const [typeUser, setTypeUser] = useState('')
    const [description, setDescription] = useState('')

    let setChecked = (event) =>{
        if(event.target.checked){
            setTypeUser(event.target.value);
        }
    }

    const AddBid = () => {
        Axios.post('http://localhost:9090/addbid', {id: id, type: type, description:description, typeUser: typeUser, dataStart: formatDate(new Date())}).then((response)=>{
            if(response.data.status === "success"){
                navigate('/')
            } else{
                navigate('/error')
            }
        })
    };

  return (
    <div>
        <fieldset>
            <legend>Выберите кем вы являетесь:</legend>

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
        </fieldset>
        <input type="text" placeholder='Введите краткое описание задачи' onChange={(event)=>{setType(event.target.value)}}/>
        <textarea col = "30" row = "20" placeholder='Введите дополнительную информацию' onChange={(event)=>{setDescription(event.target.value)}}/>
        <button onClick={AddBid}>Отправить</button>
    </div>
  )
}

export default AddBid