import React from 'react'
import InputMask from 'react-input-mask';

function PhoneInput(props) {
  return (
    <InputMask 
      mask='+375 (99) 999-99-99' 
      value={props.value} 
      onChange={props.onChange}
      placeholder = 'Введите ваш номер телефона'>
    </InputMask>
  )
}

export default PhoneInput