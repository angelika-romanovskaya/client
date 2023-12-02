import React, { useState } from 'react'
import jsPDF from 'jspdf'
import  Axios from 'axios';
import '../../font/TimesNewRomanRegular-normal'
import './report.css'


function Report({navigate}) {
    const [start, setDateStart] = useState('');
    const [end, setDateEnd] = useState('');
    const [bid, setBid] = useState('');
    const [sumBid, setSumBid] = useState('');
    const [bidStatus, setBidStatus] = useState('');

    const [msg, setMsg] = useState('')

    let pdfGeneration = () =>{
        if(start === '' || end === ''){
            setMsg('Поля со * обязательны к заполнению')
        } else{
            Axios.post('http://localhost:9090/app/statistic/getReport', {start:start, end:end}).then((response)=>{
                if(response.data.status === "success") {
                    setBid(response.data.bid);
                    setSumBid(response.data.sumBid);
                    setBidStatus(response.data.bidStatus);
                }
                else{
                    navigate('/error')
                };
            })
            setMsg('')
        }
    }

    let pdfDownload = () =>{
        if(bid.length === 0 || sumBid === 0 || bidStatus.length === 0){
            setMsg('В данный период нет заявок, выберите другой диапазон дат')
        } else{
            let doc = new jsPDF();
            doc.setFont('TimesNewRomanRegular', 'normal');
            doc.setFontSize(14);
            doc.text(`Всего подано заявок за данный период: ${sumBid}`, 10, 10)
            if(sumBid === 0){
                doc.text("")
            } else{
                doc.text('из них:', 10, 20)
                doc.line(10, 25, 200, 25)
                bidStatus.forEach((element, i) => {
                    doc.text(`${element.status} : ${element.count}`, 10, 30 + i*10)
                    doc.line(10, 35 + i*10, 200, 35 + i*10)
                });
                doc.text("Имя менеджера", 10, 60)
                doc.text("Количество заявок", 50, 60)
                doc.text("Тип клиента", 100, 60)
                doc.text("Сумма", 150, 60)
                doc.line(10, 65, 200, 65)
                bid.forEach((element, i) => {
                    doc.text(`${element.fullname}`, 10, 70 + i*10)
                    doc.text(`${element.count}`, 50, 70 + i*10)
                    doc.text(`${element.type_user}`, 100, 70 + i*10)
                    doc.text(`${element.price ? element.price.toFixed(2) : 0}`, 150, 70 + i*10)
                    doc.line(10, 75 + i*10, 200, 75 + i*10)
                });
            }
            doc.save(`Report${start}_${end}.pdf`)
        }
    }

    return (
        <div className='form'>
            <div className='form__data'>
                <div>
                    <span>*с </span>
                    <input className='person__value' type="date" name="datestart" id="datestart" onChange={(event)=>{setDateStart(event.target.value)}}/>
                </div>
                <div>
                    <span>*по </span>
                    <input className='person__value' type="date" name="dateend" id="dateend" onChange={(event)=>{setDateEnd(event.target.value)}}/>
                </div>
            </div>
            <button className='btn update-btn' onClick={()=>pdfGeneration()}>Сгенерировать PDF</button>
            <button className='btn read-btn' onClick={()=>pdfDownload()}>Download PDF</button>
            <p className='msg'>{msg}</p>
        </div>
      )
}

export default Report