import React from 'react'
import InputMask from 'react-input-mask';

function PhoneInput(props) {
  return (
    <InputMask 
      className={props.className}
      mask='+375 (99) 999-99-99' 
      value={props.value} 
      disabled = {props.disabled}
      onChange={props.onChange}
      placeholder = '*Введите ваш номер телефона'>
    </InputMask>
  )
}

export default PhoneInput