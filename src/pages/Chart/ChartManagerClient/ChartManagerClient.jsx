import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, elements } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import  Axios  from 'axios';
import './chartManagerClient.css'

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function ChartManagerClient({id, navigate}) {
    let [manager, setManager] = useState([]);
    let [countBid, setCountBid] = useState([]);

    let [arr, setArr] = useState([])

    let getChartManagerClient = () =>{
        Axios.post('http://localhost:9090/app/statistic/getChartManagerClient', {id:id}).then((response)=>{
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
        getChartManagerClient();
      }, [])

      useEffect(()=>{
        setPieData()
      }, [manager, countBid])

      let setPieData = () => {
        let labels = ["На утверждении", "Отказ",  "Отправлена", "Просмотрена", "Утверждена"];
        let arrData = [];
        let arr_1 = [...new Set(manager)];
        arr_1.map(el => {
            let data = [0,0,0,0,0];
            countBid.filter(elements => elements.manager === el).map((e, i)=>{
                data[labels.indexOf(e.status.split('').map((e,i)=> i === 0 ? e.toUpperCase(): e).join(''))] = e.count
            })
            let pieChartData = {
                labels: [...labels],
                datasets: [{
                    data: [...data],
                    label: "Bid",
                    backgroundColor: ["#de8500", "#b40000", "#00e5ff", "#0013de", "#00de07"],
                    hoverBackgroundColor: ["#9a5c00", "#800000", "#0293a3", "#000b85", "#008104"]
                }]
            };
            let obj = {
                manager: el,
                data: pieChartData
            }
            arrData.push(obj);
        })
        console.log(arrData)
        setArr([...arrData])
      }

  return (
    <div className='charts-manager'>
        {arr.map(el=><div className='charts-manager__item'>
            <p>{el.manager}</p>
            <Pie
                type="pie"
                width={'300'}
                height={'300'}
                options={{
                legend: {
                    display: true,
                    position: "left"
                }
                }}
                data={el.data}
            />
        </div>
        )}
    </div>
    )
}

export default ChartManagerClient