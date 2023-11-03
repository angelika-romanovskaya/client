import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Registration from './pages/Registration/Registration';
import Authorization from './pages/Authorization/Authorization';
import Home from './pages/Home/Home';
import { useState } from 'react';
import Bid from './pages/Bid/Bid';
import Managers from './pages/Managers/Managers';
import AddManager from './pages/Managers/AddManager/AddManager';
import Person from './pages/Person/Person';
import Nav from './components/Nav';
import Clients from './pages/Clients/Clients';

function App() {
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState('')

  const setLoginPassword = (login, password)=>{
    setPassword(password);
    setLogin(login);
  }

  return (
    <div className="App">
      <Nav role={role} setRole={setRole} navigate={navigate}/>
      <Routes>
        <Route path="/" element={<Home role={role} setRole={setRole} navigate = {navigate}/>} />
        <Route path="/registration" element={<Registration setRole={setRole} navigate = {navigate} setLoginPassword ={setLoginPassword}/>} />
        <Route path="/authorization" element={<Authorization setRole={setRole} setStatus={setStatus} navigate = {navigate} setLoginPassword ={setLoginPassword}/>} />
        <Route path='/bid' element={<Bid/>}/>
        <Route path='/managers' element={<Managers navigate = {navigate}/>}/>
        <Route path='/managers/addManager' element={<AddManager navigate = {navigate}/>}/>
        <Route path='/person' element={<Person role={role} setRole={setRole} password={password} navigate = {navigate} login={login} setLoginPassword ={setLoginPassword}/>}/>
        <Route path='/clients' element={<Clients navigate = {navigate}/>}/>
      </Routes>
    </div>
  );
}

export default App;
