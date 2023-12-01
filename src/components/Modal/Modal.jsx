import React, { useState } from 'react'
import ReactModal from 'react-modal'
import Axios from 'axios'
import PhoneInput from '../PhoneInput/PhoneInput';
import './modal.css'

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
        Axios.post('http://localhost:9090/app/bell/addBell', {password: password, login: login, theme: theme, phone: phone}).then((response)=>{
            if(response.data.status === "success") {}
            else{
                navigate('/error')
            };
            setActive(false);
        })
    }

  return (
    <div className='modal'>
        <button className='open--model' onClick={openModal}>open</button>
        <ReactModal  overlayClassName="Overlay" className='modal__window' ariaHideApp={false} isOpen={active} onRequestClose={closeModal}>
            <button className='close--model' onClick={closeModal}>X</button>
            <div className='model__content'>
                <h1 className='model__title'>Заказать звонок</h1>
                {password === '' && login === '' ? (
                    <PhoneInput value={phone} onChange={phoneInput}/>
                ):(<></>)}
                <textarea placeholder='Ваше сообщение' name="theme" id="theme" cols="30" rows="10" style={{resize: false}} onChange={(event)=>{setTheme(event.target.value)}}></textarea>
                <button className='modal__btn' onClick={addBell}>Подать заявку на звонок</button>
            </div>
        </ReactModal>
    </div>
  )
}

export default Modal