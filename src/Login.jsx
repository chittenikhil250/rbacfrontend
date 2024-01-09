import axios from 'axios';
import React from 'react'
import { useState, useContext, useEffect } from 'react';
import AuthContext from './Context/AuthProvider';
import {json, useLocation, useNavigate} from 'react-router-dom';


const Login = () => {

    const {auth, setAuth} = useContext(AuthContext);
    const Navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] =  useState('');
    const [user, setUser ]= useState(null);
    const {state} = useLocation();

    useEffect(() => {
      const fetchUsers = async()=>{
        try {
          const response = await axios.get(
            'https://rbacwebtwo.onrender.com/user/profile'
            // 'http://localhost:5050/user/profile'
            , {
            withCredentials: true,
            headers:{
              'Access-Control-Allow-Origin': '*', 
              'Content-Type': 'application/json'
            }
          })
          const user = response.data;
          if(user){
            Navigate('/home')
          }
        } catch (error) {
          if(error){
            Navigate('/login')
          }
          // setError(error);
        }
      }
      fetchUsers();
    }, [])

    const handleLogin = async(e) =>{
        try {
          e.preventDefault();
          const response = await axios.post(
            // 'https://rbacweb.onrender.com/auth/login'
            'https://rbacwebtwo.onrender.com/auth/login'
            // 'http://localhost:5050/auth/login'
            , JSON.stringify({email, password}),{
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', 
            },
            })
            setUser(response.data.user);
            setAuth(response.data.user);
            if(response.status === 200){
                Navigate('/home');
              }
            } 
            catch (error) {
              // console.log();
              setError(error);
            }
    }

  return (
    <>

        <div className="container">
            <div className="row">
            <center><h1 className='mt-5'>Welcome back!!</h1></center>
            <div className="col-lg-4"></div>
            <div className="col-lg-4 mt-5">
              <div className={error?'':'invisible'}>
            <div class="alert alert-danger alert-dismissible fade show error" role="alert">
              {error ? error.response.data.message : ''}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
              </div>
              <div className={state ? '': 'invisible'}>
            <div class="alert alert-success alert-dismissible fade show error" role="alert">
              {state?.message}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
              </div>
                <form onSubmit={handleLogin}>
                <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Email address</label>
                      <input type="email" name="email" class="form-control rwed" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">Password</label>
                      <input type="password" name="password" class="rwed form-control" id="exampleInputPassword1" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                    <div class="mb-3 form-check">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                      <label class="form-check-label" for="exampleCheck1">Remember me </label>
                    </div>
                    <div class="mb-3">
                        <p class="form-text inline">Don't have an account?</p> 
                        <a class="form-text text-primary" href="/signup"> Sign up</a>
                    </div>


                    <button type="submit" class="btn px-4 btn-primary">Login</button>
                </form>
            </div>
            <div className="col-lg-4"></div>
            </div>
        </div>
    </>
  )
}

export default Login