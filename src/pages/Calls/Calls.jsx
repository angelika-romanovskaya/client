import React from 'react'

function Calls({calls}) {
    console.log(calls)
  return (
    <div>
        {calls.map((item, i)=>
            <div key={i}>
                <p>{item.name}</p>
                <p>{item.phone}</p>
                <p>{item.theme}</p>
            </div>
        )}
    </div>
  )
}

export default Calls