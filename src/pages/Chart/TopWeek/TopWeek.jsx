import React, { useEffect, useLayoutEffect, useState } from 'react'
import formatDate from '../../../function/FormanDate'
import Axios from 'axios';
import './topWeek.css'

function TopWeek({navigate}) {
    let [manager, setManager] = useState([]);
    let getTopManager = () =>{
        let dateStart = new Date();
        let dateEnd = new Date();
        dateEnd.setDate(dateEnd.getDate() - 7)
        Axios.post('http://localhost:9090/app/statistic/topManagers', {dateStart: formatDate(dateStart), dateEnd : formatDate(dateEnd)}).then((response)=>{
          if(response.data.status === "success") {
              setManager(response.data.manager);
          }
          else{
              navigate('/error')
          };
        })
      }

      useLayoutEffect(()=>{
        getTopManager();
      }, [])

  return (
    <>
        <div>
            <h2>Топ 3 менеджера недели</h2>
            <div className='top'>
                <div className='top__item'>
                    <p>Имя менеджера</p>
                    <p>Количество успешных заявок</p>
                    <p>Принесенная прибыль</p>
                </div>
                {manager.map((el, i)=>
                    <div className='top__item' key={i}>
                        <p>{el.fullname}</p>
                        <p>{el.count}</p>
                        <p>{el.price}</p>
                    </div>
                )}
            </div>
        </div>
    </>
  )
}

export default TopWeek