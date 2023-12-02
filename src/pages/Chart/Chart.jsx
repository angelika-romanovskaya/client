import React from 'react'
import ChartManagerAdmin from './ChartManagerAdmin/ChartManagerAdmin'
import ChartClientAdmin from './ChartClientAdmin/ChartClientAdmin'
import './chart.css'
import TopWeek from './TopWeek/TopWeek'
import ChartManagerClient from './ChartManagerClient/ChartManagerClient'

function Chart({role, navigate, id}) {
  return (
    <div className='chart'>
        {role === "ADMIN" ? (<div className='chart__wrap'>
            <TopWeek navigate={navigate}/>
            <ChartManagerAdmin navigate={navigate}/>
            <ChartClientAdmin navigate={navigate}/>
        </div>) : (<div className='chart__wrap'>
            <ChartManagerClient id= {id} navigate={navigate}/>
        </div>)}
    </div>
  )
}

export default Chart