import React, {useContext} from 'react';
import './app.css';
import Login from './Login';
import Signup from './Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import ManageRoles from './ManageRoles';
import About from './About';
import Profile from './Profile';



function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/manageroles' element={<ManageRoles/>}></Route>
      <Route path='/profile/:id' element={<Profile />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
