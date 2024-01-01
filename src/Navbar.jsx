import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './Context/AuthProvider'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const {Auth, setAuth} = useContext(AuthContext);
  const Navigate = useNavigate()

  const handleLogout = async()=>{
    const response = await axios.get('https://rbacwebtwo.onrender.com/auth/logout', {
      withCredentials: true,
          headers:{
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json'
          }
    })
    setAuth(null);
    if(response.status === 200) Navigate('/login');
  }

  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item px-3">
                <Link class="nav-link active" aria-current="page" to="/about">About </Link>
            </li>
            
            <li class="nav-item px-3">
                <Link class="nav-link active" aria-current="page" to="/home">Profile </Link>
            </li>
            
            <li class="nav-item px-3">
              <Link class="nav-link active" aria-current="page" to="/manageroles">Manage Users</Link>
            </li>
            
            <li class="nav-item px-3">
                <button class="nav-link active" aria-current="page" onClick={handleLogout}>Logout</button>
            </li>
        </ul>
      </div>
    </div>
</nav>
    </>
  )
}

export default Navbar