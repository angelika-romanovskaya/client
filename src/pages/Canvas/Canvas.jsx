import  Axios  from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import SignaturePad from 'react-signature-canvas'

function Canvas({id, navigate, blob}) {
    const [sigPad, setSigPad] = useState(blob);
    
    useEffect(()=>{
        console.log(blob)
        sigPad.fromDataURL(blob);
    }, []);

    let save = function(){
        let data = sigPad.current.getTrimmedCanvas().toDataURL('image/png',  1.0);
        console.log(data);
        Axios.post('http://localhost:9090/saveSignature', {id:id, signature: data}).then((response)=>{
            if(response.data.status === "success") {
                
            }
            else{
                navigate('/error')
            };
        })
    }

    return (
    <div>
        <button onClick={save}>Сохранить</button>
        <SignaturePad canvasProps={{width: 300, height: 200}} penColor='red'
            ref={data => setSigPad(data)}
        />
    </div>
  )
}

export default Canvas