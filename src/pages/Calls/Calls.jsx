import React, { useEffect, useState } from 'react'
import './calls.css'
import { FaPhone } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import  Axios  from 'axios';

function Calls({navigate}) {
  const [calls, setCalls] = useState([]);

  let getBell = () =>{
    Axios.get('http://localhost:9090/getbell').then((response)=>{
      if(response.data.status === "success") {
          setCalls(response.data.calls);
      }
      else{
          navigate('/error')
      };
    })
  }

  useEffect(()=>{
      getBell();
  }, [])

  let deleteCall = (event, id)=>{
    event.preventDefault();
    Axios.post('http://localhost:9090/deleteCalls', {id: id}).then((response)=>{
      if(response.data.status === "success"){
          navigate('/calls')
          getBell();
      } else{
          navigate('/error')
      }
  })
  }

  return (
    <div className='calls'>
        {calls.map((item, i)=>
            <div className='calls__item' key={i}>
                <p className='calls__name'>{item.name}</p>
                <a href={'tel:' + item.phone} className='calls__phone'><button className='btn call-btn'><FaPhone/></button>{item.phone}</a>
                <p className='calls__theme'>{item.theme}</p>
                <button onClick={(event) => deleteCall(event, item.id)} className='remove-btn'><TiDelete/></button>
            </div>
        )}
    </div>
  )
}

export default Calls