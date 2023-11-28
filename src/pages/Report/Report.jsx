import React, { useState } from 'react'
import jsPDF from 'jspdf'
import  Axios from 'axios';
import '../../font/TimesNewRomanRegular-normal'


function Report({navigate}) {
    const [start, setDateStart] = useState('');
    const [end, setDateEnd] = useState('');
    const [bid, setBid] = useState('');
    const [sumBid, setSumBid] = useState('');
    const [bidStatus, setBidStatus] = useState('');

    let pdfGeneration = () =>{
        Axios.post('http://localhost:9090/getReport', {start:start, end:end}).then((response)=>{
            if(response.data.status === "success") {
                setBid(response.data.bid);
                setSumBid(response.data.sumBid);
                setBidStatus(response.data.bidStatus);
            }
            else{
                navigate('/error')
            };
        })
    }

    let pdfDownload = () =>{
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
                doc.text(`${element.price.toFixed(2)}`, 150, 70 + i*10)
                doc.line(10, 75 + i*10, 200, 75 + i*10)
            });
        }
        doc.save(`Report${start}_${end}.pdf`)
    }

    return (
        <div>
            <div>
                <div>
                    <span>с</span>
                    <input type="date" name="datestart" id="datestart" onChange={(event)=>{setDateStart(event.target.value)}}/>
                </div>
                <div>
                    <span>по</span>
                    <input type="date" name="dateend" id="dateend" onChange={(event)=>{setDateEnd(event.target.value)}}/>
                </div>
            </div>
            <button onClick={()=>pdfGeneration()}>Сгенерировать PDF</button>
            <button onClick={()=>pdfDownload()}>Download PDF</button>
        </div>
      )
}

export default Report