import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import './bid.css'
import { GrPowerReset } from "react-icons/gr";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaUp } from "react-icons/fa";

function Bid({role, id, navigate, setBid, bid}) {
  const filterOption = useRef();
  const [filterData, setFilterData] = useState([]);

  let getBid = () =>{
    Axios.post('http://localhost:9090/getBid', {id:id, role:role}).then((response)=>{
      if(response.data.status === "success") {
          setBid(response.data.bid);
          setFilterData(response.data.bid)
      }
      else{
          navigate('/error')
      };
    })
  }

  useLayoutEffect(()=>{
    getBid();
  }, [id])

  let changeStatus = (id) =>{
    Axios.post('http://localhost:9090/viewedBid', {id:id}).then((response)=>{
      if(response.data.status === "success") {
        navigate("/bid/details/" + id)
      }
      else{
          navigate('/error')
      };
    })
  }

  let deleteBid = (id) =>{
    Axios.post('http://localhost:9090/deletedBid', {id:id}).then((response)=>{
      if(response.data.status === "success") {
        navigate("/bid")
      }
      else{
          navigate('/error')
      };
    })
  }

  let sortData_startASC = () =>{
    let data = bid.sort((x1,x2)=> {return new Date(x1.data_start) - new Date(x2.data_start)})
    setBid(data);
    navigate("/bid")
  }

  let sortData_startDESC = () =>{
    let data = bid.sort((x1,x2)=> {return new Date(x2.data_start) - new Date(x1.data_start)})
    setBid(data);
    navigate("/bid")
  }

  let filterType_User = () => {
    let data = bid.filter((element) => element.type_user === filterOption.current.value)
    setFilterData(data)
  }

  let reset = () =>{
    getBid();
  }


  return (
    <div className='bid'>
      {role === "CLIENT" ? (
        <>
          <div className='bid__panel'>
            <Link className='bid__addLink' to="/addbid">Отправить заявку</Link>
            <div className='bid__btnSorts'>
              <button className='btn-sort' onClick={()=>sortData_startASC()}><FaSortAlphaDown/></button>
              <button className='btn-sort' onClick={()=>sortData_startDESC()}><FaSortAlphaUp/></button>
            </div>
          </div>
          {filterData.map((item,i) => <div className='bid__item' key={item.id}>
            <p className='bid__info'>{item.name}</p>
            <p className='bid__info'>{item.surname}</p>
            <p className='bid__info'>{item.type}</p>
            <p className='bid__info'>{item.description}</p>
            <p className='bid__info'>{item.data_start}</p>
            <p className='bid__info'>{item.data_end}</p>
            <p className='bid__info'>{item.price}</p>
            <p className='bid__info'>{item.status}</p>
            <p className='bid__info'>{item.msg}</p>
            <button className='btn delete-btn' onClick={() => deleteBid(item.id)}>Отменить</button>
          </div>)}
        </>
      ):( role === "MANAGER" ? (
        <>
            <div className='bid__panel'>
              <div className='bid__btnSorts'>
                <button className='btn-sort' onClick={()=>sortData_startASC()}><FaSortAlphaDown/></button>
                <button className='btn-sort' onClick={()=>sortData_startDESC()}><FaSortAlphaUp/></button>
              </div>
              <select className='bid__filter' ref={filterOption} defaultValue={"гос. учреждение"} onChange={()=>filterType_User()}>
                <option className='bid__option' value={"гос. учреждение"} selected>Гос. учреждения</option>
                <option className='bid__option' value={"иное юр. лицо"}>Иное юр. лица</option>
                <option className='bid__option' value={"физ. лицо"}>Физ. лицо</option>
              </select>
              <button className='btn reset-btn' onClick={()=>reset()}><GrPowerReset/></button>
            </div>
            {filterData.map((item,i) => <div className='bid__item' key={item.id}>
              <p className='bid__info'>{item.name}</p>
              <p className='bid__info'>{item.surname}</p>
              <p className='bid__info'>{item.type}</p>
              <p className='bid__info'>{item.type_user}</p>
              <p className='bid__info'>{item.price}</p>
              <p className='bid__info'>{item.status}</p>
              <a className='btn read-btn' onClick={()=>changeStatus(item.id)}>Просмотреть</a>
            </div>)}
        </>
      ) : (
        <>
            <div className='bid__panel'>
              <div className='bid__btnSorts'>
                <button className='btn-sort' onClick={()=>sortData_startASC()}><FaSortAlphaDown/></button>
                <button className='btn-sort' onClick={()=>sortData_startDESC()}><FaSortAlphaUp/></button>
              </div>
              <select className='bid__filter' ref={filterOption} defaultValue={"гос. учреждение"} onChange={()=>filterType_User()}>
                <option className='bid__option' value={"гос. учреждение"} selected>Гос. учреждения</option>
                <option className='bid__option' value={"иное юр. лицо"}>Иное юр. лица</option>
                <option className='bid__option' value={"физ. лицо"}>Физ. лицо</option>
              </select>
              <button className='btn reset-btn' onClick={()=>reset()}><GrPowerReset/></button>
            </div>
            {filterData.map((item,i) => <div className='bid__item' key={item.id}>
              <p className='bid__info'>{item.nameManager}</p>
              <p className='bid__info'>{item.surnameManager}</p>
              <p className='bid__info'>{item.name}</p>
              <p className='bid__info'>{item.surname}</p>
              <p className='bid__info'>{item.type}</p>
              <p className='bid__info'>{item.type_user}</p>
              <p className='bid__info'>{item.price}</p>
              <p className='bid__info'>{item.status}</p>
              <Link className='btn read-btn' to = {"/bid/details/" + item.id}>Просмотреть</Link>
            </div>)}
        </>
      )
      )}
    </div>
  )
}

export default Bid