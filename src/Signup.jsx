import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const Navigate = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const response = await axios.post(
                // 'http://localhost:5050/auth/signup'
                'https://rbacwebtwo.onrender.com/auth/signup'
                , {name, email, password, password2});
            if(response.status === 200){
                Navigate('/home');
            }
            else{
                Navigate('/dns');
            }
            
        } catch (error) {
            Navigate('/mini');
        }
    }

  return (
    <>
    <div className="container">
        <div className="row">
            <center><h1 className='mt-5'>Welcome!!</h1></center>
            <div className="col-lg-4"></div>
            <div className="col-lg-4 mt-5">
            <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label htmlFor="name" class="form-label">Full Name </label>
                        <input type="text" required class="form-control rwed" id="name" name="name" aria-describedby="emailHelp" value={name} onChange={(e)=> setName(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                      <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
                      <input type="email" required class="form-control rwed" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)}/>
                      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                      <label htmlFor="exampleInputPassword1" class="form-label">Password</label>
                      <input type="password" name="password" required class="rwed form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="exampleInputPassword2" class="form-label">Confirm Password</label>
                        <input type="password" name="password2" required class="rwed form-control" id="exampleInputPassword2" value={password2} onChange={(e) => setPassword2(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <p class="form-text inline">Already have an account? </p>
                        <a class="form-text text-primary" href="/login"> Login</a>
                    </div>
                    <input type="submit" class="btn px-4 btn-primary" value="Sign Up"/>
                </form> 
            </div>
            <div className="col-lg-4"></div>
        </div>
    </div>
    </>
  )
}

export default Signup