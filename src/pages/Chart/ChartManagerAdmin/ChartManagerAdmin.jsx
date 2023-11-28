import React, { useLayoutEffect, useState } from 'react'
import {Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale} from 'chart.js'
import {Bar} from 'react-chartjs-2';
import Axios from 'axios';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale)

function ChartManagerAdmin({navigate}) {
    let [manager, setManager] = useState([]);
    let [countBid, setCountBid] = useState([]);
    
    let getChartManagerAdmin = () =>{
        Axios.get('http://localhost:9090/getChartManagerAdmin').then((response)=>{
          if(response.data.status === "success") {
              setManager(response.data.manager);
              setCountBid(response.data.bid)
          }
          else{
              navigate('/error')
          };
        })
      }
    
      useLayoutEffect(()=>{
        getChartManagerAdmin();
      }, [])

    let data = {
        labels: [...manager],
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
    <>
        <div>
            <h2>Статистика по количеству заявок в обработке по менеджерам</h2>
            <Bar
            data={data}
            width={100}
            height={30}
            />
        </div>
    </>
  )
}

export default ChartManagerAdmin