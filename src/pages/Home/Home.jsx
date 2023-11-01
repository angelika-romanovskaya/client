import React from 'react'
import Nav from '../../components/Nav'


function Home({role, setRole, navigate}) {
    return(
        <Nav role={role} setRole={setRole} navigate={navigate}/>
    )
}

export default Home