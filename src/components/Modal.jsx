import React, { useState } from 'react'
import ReactModal from 'react-modal'
import Axios from 'axios'
import PhoneInput from './PhoneInput';

function Modal({login, password, navigate}) {
    const [active, setActive] = useState(false);
    const [theme, setTheme] = useState('')
    const [phone, setPhone] = useState('')

    const phoneInput = ({ target: { value } }) => setPhone(value);

    const openModal = ()=>{
        setActive(true);
    }
    const closeModal = ()=>{
        setActive(false)
    }

    const addBell = ()=>{
        Axios.post('http://localhost:9090/addBell', {password: password, login: login, theme: theme, phone: phone}).then((response)=>{
            if(response.data.status === "success") {}
            else{
                navigate('/error')
            };
            setActive(false);
        })
    }

  return (
    <div>
        <button onClick={openModal}>open</button>
        <ReactModal isOpen={active} onRequestClose={closeModal}>
            <button onClick={closeModal}>X</button>
            <div>
                {password === '' && login === '' ? (
                    <PhoneInput value={phone} onChange={phoneInput}/>
                ):(<></>)}
                <textarea name="theme" id="theme" cols="30" rows="10" style={{resize: false}} onChange={(event)=>{setTheme(event.target.value)}}></textarea>
                <button onClick={addBell}>Подать заявку на звонок</button>
            </div>
        </ReactModal>
    </div>
  )
}

export default Modal