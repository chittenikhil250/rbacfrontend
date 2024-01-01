import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Profile = () => {

    const [error2, setError] = useState(null);
    const [user, setUser] = useState();
    const {id} = useParams(); 
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchData = async()=>{
            try {
            const response = await axios.get('https://rbacwebtwo.onrender.com/user/'+id, {
              withCredentials: true,
              headers:{
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'application/json'
              }
            });
            const user = response.data.person;
            setUser(user);
          }
          catch (error) {
              setError(error);
            }
        }
        fetchData();
    }, [])
    

  return (
    <>
        <Navbar/>
        <div className='container mt-5'>
        <div className={error2?'':'invisible'}>
            <div class="alert alert-danger alert-dismissible fade show error" role="alert">
            {error2?.response?.data.message}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <button className='btn btn-primary' onClick={(e)=>Navigate('/manageroles')}> Go Back </button>
        </div>
        </div>
      <div className={error2 ? "invisible" : "container"}>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4 mt-5">
            <div class="card">
              <div class="card-header">
                {user?.role}
              </div>
              <div class="card-body">
                <h5 class="card-title">{user?.name}</h5>
                <p class="card-text">{user?.email}</p>
                <p class="card-text">User ID : {user?._id}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </>
  )
}

export default Profile;