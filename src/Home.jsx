import React, {useEffect, useContext, useState} from 'react';
import Navbar from './Navbar';
import AuthContext from './Context/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Home = () => {

  axios.defaults.withCredentials = true;
  const Navigate = useNavigate();
  const {auth, setAuth} = useContext(AuthContext);
  const [error, setError] = useState();
  
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
          setAuth(user);
        }
      } catch (error) {
        if(error){
          Navigate('/login');
        }
      }
    }
    fetchUsers();
  }, [])

  const user = useContext(AuthContext).auth;
  
  return (
    <>
      <Navbar/>
    <h1 className={error ? 'mt-5 mx-5' : 'invisible'}>{error?.response?.data.message}</h1>
      <div className={error ? 'invisible' : "container"}>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4 mt-5">
            <div class="card">
              <div class="card-header">
                {user ? user.role : error}
              </div>
              <div class="card-body">
                <h5 class="card-title">{user ? user.name : error}</h5>
                <p class="card-text">{user ? user.email : error}</p>
                <p class="card-text">User ID : {user ? user.id : error}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </>
  )
}

export default Home;