import React from 'react'
import ChartManagerAdmin from './ChartManagerAdmin/ChartManagerAdmin'
import ChartClientAdmin from './ChartClientAdmin/ChartClientAdmin'
import './chart.css'
import TopWeek from './TopWeek/TopWeek'

function Chart({role, navigate}) {
  return (
    <div className='chart'>
        {role.role === "ADMIN" ? (<div className='chart__wrap'>
            <TopWeek navigate={navigate}/>
            <ChartManagerAdmin navigate={navigate}/>
            <ChartClientAdmin navigate={navigate}/>
        </div>) : (<></>)}
    </div>
  )
}

export default Chart