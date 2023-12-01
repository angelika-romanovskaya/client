import Axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import './summary.css'

function Summary({navigate}) {
    const [managerInfo, setManagerInfo] = useState([]);
    const [clientInfo, setClientInfo] = useState([]);
    const [sum, setSum] = useState(0);

    let getBid = () =>{
        Axios.get('http://localhost:9090/app/statistic/summaryBid').then((response)=>{
          if(response.data.status === "success") {
              setManagerInfo(response.data.manager);
              setClientInfo(response.data.client);
          }
          else{
              navigate('/error')
          };
        })
      }

      let getSum = () =>{
        Axios.get('http://localhost:9090/app/statistic/sumPrice').then((response)=>{
          if(response.data.status === "success") {
              setSum(response.data.sum.sum);
          }
          else{
              navigate('/error')
          };
        })
      }

      useEffect(()=>{
        getBid();
        getSum();
      }, [])

  return (
    <div className='summary'>
      <p>Сводка по менеджерам</p>
        {managerInfo.map((item, i)=>
            <div className='summary__item' key={i}>
                <p>{item.name}</p>
                <p>{item.surname}</p>
                <p>{item.phone}</p>
                <p>{item.sum ? item.sum.toFixed(2) : 0}</p>
            </div>
        )}
        <hr/>
        <p>Сводка по клиентам</p>
        {clientInfo.map((item, i)=>
            <div  className='summary__item' key={i}>
                <p>{item.name}</p>
                <p>{item.surname}</p>
                <p>{item.phone}</p>
                <p>{item.email}</p>
                <p>{item.sum ? item.sum.toFixed(2) : 0}</p>
            </div>
        )}
        <hr/>
        <p  className='summary__result'>Итого: <span>{sum ? sum.toFixed(2) : 0}</span></p>
    </div>
  )
}

export default Summary