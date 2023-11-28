import Axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react'

function Summary({navigate}) {
    const [managerInfo, setManagerInfo] = useState([]);
    const [clientInfo, setClientInfo] = useState([]);
    const [sum, setSum] = useState(0);

    let getBid = () =>{
        Axios.get('http://localhost:9090/summaryBid').then((response)=>{
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
        Axios.get('http://localhost:9090/sumPrice').then((response)=>{
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
    <div>
        {managerInfo.map((item, i)=>
            <div key={i}>
                <p>{item.name}</p>
                <p>{item.surname}</p>
                <p>{item.phone}</p>
                <p>{item.sum.toFixed(2)}</p>
            </div>
        )}
        <hr/>
        {clientInfo.map((item, i)=>
            <div key={i}>
                <p>{item.name}</p>
                <p>{item.surname}</p>
                <p>{item.phone}</p>
                <p>{item.email}</p>
                <p>{item.sum.toFixed(2)}</p>
            </div>
        )}
        <hr/>
        <p>Итого: <span>{sum.toFixed(2)}</span></p>
    </div>
  )
}

export default Summary