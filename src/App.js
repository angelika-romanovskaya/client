import './App.css';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import Registration from './pages/Registration/Registration';
import Authorization from './pages/Authorization/Authorization';
import Home from './pages/Home/Home';
import { useState } from 'react';
import Bid from './pages/Bid/Bid';
import Managers from './pages/Managers/Managers';
import AddManager from './pages/Managers/AddManager/AddManager';
import Person from './pages/Person/Person';
import Nav from './components/Nav/Nav';
import Clients from './pages/Clients/Clients';
import Error from './pages/Error/Error';
import Modal from './components/Modal/Modal';
import Calls from './pages/Calls/Calls';
import AddBid from './pages/Bid/AddBid/AddBid';
import DitailsBid from './pages/Bid/DitailsBid/DitailsBid';
import Summary from './pages/Summary/Summary';
import Chart from './pages/Chart/Chart';
import Report from './pages/Report/Report';

function App() {
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState('')
  const [bid, setBid] = useState([]);
  const location = useLocation();

  const setUser = (login, password, id)=>{
    setPassword(password);
    setId(id);
    setLogin(login);
  }

  const setInfoNull = ()=>{
    setRole('');
    setLogin('');
    setPassword('');
  }

  return (
    <div className="App">
      <div className='container'>
        <Nav setInfoNull={setInfoNull} location= {location} role={role} navigate={navigate}/>
        <Routes>
          <Route path='/error' element={<Error/>}/>
          <Route path="/" element={<Home role={role} setRole={setRole} navigate = {navigate}/>} />
          <Route path="/registration" element={<Registration setRole={setRole} navigate = {navigate} setUser ={setUser}/>} />
          <Route path="/authorization" element={<Authorization setRole={setRole} navigate = {navigate} setUser ={setUser}/>} />
          <Route path='/bid' element={<Bid role={role} id = {id} setBid = {setBid} bid={bid} navigate = {navigate}/>}/>
          <Route path='/managers' element={<Managers navigate = {navigate}/>}/>
          <Route path='/managers/addManager' element={<AddManager navigate = {navigate}/>}/>
          <Route path='/person' element={<Person role={role} setRole={setRole} id={id} navigate = {navigate} setUser ={setUser}/>}/>
          <Route path='/clients' element={<Clients navigate = {navigate}/>}/>
          <Route path='/calls' element={<Calls navigate = {navigate}/>}/>
          <Route path='/addbid' element={<AddBid id={id} navigate = {navigate}/>}/>
          <Route path='/summary' element={<Summary navigate = {navigate}/>}/>
          <Route path='/chart' element={<Chart navigate={navigate} role={role} id={id}/>}/>
          <Route path='/report' element={<Report navigate={navigate}/>}/>
          {bid.map((item,i) => <Route key={item.id} path={"/bid/details/" + item.id} element={<DitailsBid role = {role} bid={item} navigate = {navigate}/>}/>)}
        </Routes>
        {role === "CLIENT" || role === '' ? (
          <div>
            <Modal login = {login} password={password} navigate = {navigate}/>
          </div>
        ):(<></>)}
      </div>
    </div>
  );
}

export default App;
