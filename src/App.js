import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Registration from './pages/Registration/Registration';
import Authorization from './pages/Authorization/Authorization';
import Home from './pages/Home/Home';
import { useState } from 'react';

function App() {
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState('')

  const setLoginPassword = (login, password)=>{
    setPassword(password);
    setLogin(login);
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home role={role} setRole={setRole} navigate = {navigate}/>} />
        <Route path="/registration" element={<Registration setRole={setRole} navigate = {navigate} setLoginPassword ={setLoginPassword}/>} />
        <Route path="/authorization" element={<Authorization setRole={setRole} navigate = {navigate} setLoginPassword ={setLoginPassword}/>} />
      </Routes>
    </div>
  );
}

export default App;
