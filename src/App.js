import './App.css';
import Axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Registration from './pages/Registration/Registration';
import Authorization from './pages/Authorization/Authorization';
import Home from './pages/Home/Home';
import { useEffect, useState } from 'react';
import Bid from './pages/Bid/Bid';
import Managers from './pages/Managers/Managers';
import AddManager from './pages/Managers/AddManager/AddManager';
import Person from './pages/Person/Person';
import Nav from './components/Nav';
import Clients from './pages/Clients/Clients';
import Error from './pages/Error/Error';
import Canvas from './pages/Canvas/Canvas';
import Modal from './components/Modal';
import Calls from './pages/Calls/Calls';

function App() {
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState('')
  const [calls, setCalls] = useState([]);


  const setLoginPassword = (login, password)=>{
    setPassword(password);
    setLogin(login);
  }

  const setInfoNull = ()=>{
    setRole('');
    setLogin('');
    setPassword('');
  }

  useEffect(()=>{
    if(role === "MANAGER"){
      Axios.get('http://localhost:9090/getbell').then((response)=>{
        if(response.data.status === "success") {
          console.log(response.data.calls)
            setCalls(response.data.calls);
        }
        else{
            navigate('/error')
        };
      })
    }
  }, [role])

  return (
    <div className="App">
      <Nav setInfoNull={setInfoNull} role={role} navigate={navigate}/>
      <Routes>
        <Route path='/error' element={<Error/>}/>
        <Route path="/" element={<Home role={role} setRole={setRole} navigate = {navigate}/>} />
        <Route path="/registration" element={<Registration setRole={setRole} navigate = {navigate} setLoginPassword ={setLoginPassword}/>} />
        <Route path="/authorization" element={<Authorization setRole={setRole} setStatus={setStatus} navigate = {navigate} setLoginPassword ={setLoginPassword}/>} />
        <Route path='/bid' element={<Bid/>}/>
        <Route path='/managers' element={<Managers navigate = {navigate}/>}/>
        <Route path='/managers/addManager' element={<AddManager navigate = {navigate}/>}/>
        <Route path='/person' element={<Person role={role} setRole={setRole} password={password} navigate = {navigate} login={login} setLoginPassword ={setLoginPassword}/>}/>
        <Route path='/clients' element={<Clients navigate = {navigate}/>}/>
        <Route path='/calls' element={<Calls calls={calls} navigate = {navigate}/>}/>
      </Routes>
      {role === "CLIENT" || role === '' ? (
        <div>
          <Modal login = {login} password={password} navigate = {navigate}/>
        </div>
      ):(<></>)}
    </div>
  );
}

export default App;
