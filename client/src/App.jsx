import React, {useState} from 'react';
import "./App.css"
import axios from 'axios';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import './App.css';
import WheelchairForm from './components/wheelchair/WheelchairForm'
import WheelchairList from './components/wheelchair/WheelchairList'
import OneWheelchair from './components/wheelchair/OneWheelchair'
import EditWheelchair from './components/wheelchair/EditWheelchair'

import NavBar from './components/site/NavBar';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Dashboard from './components/user/Dashboard';
import PatientForm from './components/patient/PatientForm';
import PatientList from './components/patient/PatientList';
import OnePatient from './components/patient/OnePatient';
import EditPatient from './components/patient/EditPatient';
import Update from './components/user/Update';


function App() {

  const [user, setUser] = useState({})

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar user={user} setUser={setUser}/>
      <Routes>
        
        <Route path = "/"  element={<Login setUser={setUser}/>}></Route>
        <Route path = "/login"  element={<Login setUser={setUser}/>}></Route>

        <Route path = "/addWheelchair"   element={<WheelchairForm user={user}/>}></Route>
        <Route path = "/allWheelchairs" element={<WheelchairList user={user} setUser={setUser} />}></Route>
        <Route path = "/wheelchair/:id" element={<OneWheelchair user={user} />}></Route>
        <Route path = "/edit/:id"  element={<EditWheelchair user={user} />}></Route>


        <Route path = "/userRegister"  element={<Register setUser={setUser}/>}></Route>
        <Route path = "/Dashboard"  element={<Dashboard user={user}/>}></Route>
        <Route path = "/updateUser/:id"  element={<Update user={user} setUser={setUser}/>}></Route>


        <Route path = "/addPatient"   element={<PatientForm user={user}/>}></Route>
        <Route path = "/allPatients"   element={<PatientList user={user}/>}></Route>
        <Route path = "/patient/:id"  element={<OnePatient user={user}/>}></Route>
        <Route path = "/editPatient/:id"   element={<EditPatient user={user}/>}></Route>

        
        </Routes>
        </BrowserRouter>  
    </div>
  );
}

export default App;
