import React, { useLayoutEffect, useState } from 'react'
import {Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale} from 'chart.js'
import {Bar} from 'react-chartjs-2';
import Axios from 'axios';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale)

function ChartClientAdmin({navigate}) {
    let [client, setClient] = useState([]);
    let [countBid, setCountBid] = useState([]);
    let getChartClientAdmin = () =>{
        Axios.get('http://localhost:9090/getChartClientAdmin').then((response)=>{
          if(response.data.status === "success") {
              setClient(response.data.client);
              setCountBid(response.data.bid)
          }
          else{
              navigate('/error')
          };
        })
      }
    
      useLayoutEffect(()=>{
        getChartClientAdmin();
      }, [])

    let data = {
        labels: [...client],
        datasets: [
          {
            label: 'Количество заявок',
            backgroundColor: 'rgba(99, 255, 203, 0.2)',
            borderColor: '#63ffbb',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(99, 255, 169, 0.4)',
            hoverBorderColor: '#63ffa4',
            data: [...countBid]
          }
        ]
      };



  return (
    <div>
        <h2>Статистика по количеству заявок по типу клиента</h2>
        <Bar
        data={data}
        width={100}
        height={30}
        />
    </div>
  )
}

export default ChartClientAdmin