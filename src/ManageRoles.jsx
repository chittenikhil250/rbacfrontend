import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from './Context/AuthProvider'

const ManageRoles = () => {

  const [users, setUsers] = useState();
  const [error, setError ] = useState();
  const [role, setRole] = useState();
  const [id, setId] = useState();
  const [role2, setRole2] = useState();
  const [message, setMessage] = useState('');
  
  
  const user = useContext(AuthContext).auth;
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchAllUsers = async()=>{
        try {
          const allUsers = await axios.get(
            'http://localhost:5050/user/admin'
            , {
            withCredentials: true,
            headers:{
              'Access-Control-Allow-Origin': '*', 
              'Content-Type': 'application/json'
            }
          })
          const allusersdata = allUsers.data;
          setUsers(allusersdata);
        }
        catch (error) {
          setError(error);
        }
    }
      fetchAllUsers(); 
  }, [])

  const handleRoleChange = (userId, newRole) =>{
    setId(userId);
    setRole2(newRole);
    setUsers((prevUsers) =>
    users.map((user) => 
      (user.id === userId) ? { ...user, role: newRole } : user
    ));
  }
  
  const handleSubmit = async(e)=>{
    e.preventDefault();

    const response = await axios.post(
      'http://localhost:5050/user/admin/update'
      , {
      id: id,
      role: role2 
    }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', 
      }
    })
    if(response.status === 200){
      setMessage('Role Updated Sucessfully!!');
    }
    else{
      setMessage('Failed to Update Role.')
    }
  }
  

  return (
    <>
    <Navbar/>
          <h1 className='mt-5 mx-5'>{error?.response?.data.message}</h1>
        <div className={error ? 'invisible' : 'container'}>
          <center><h1 className='mt-5'>Manage User Roles</h1></center>
          <div className={message?'':'invisible'}>
            <div className="alert alert-success alert-dismissible fade show error" role="alert">
              {message}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </div>

              <form onSubmit={handleSubmit} id='form'>
          <table className='tablecust mt-5'>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email </th>
                <th scope="col">Role</th>
                <th scope="col">Update </th>
              </tr>
            </thead>
            <tbody>
              {users?.map(
                (user)=>{
                return (
                  <tr key={user._id}>
                    <td >{user._id}</td>
                    <td >
                      <Link to={'/profile/'+user._id} >
                      {user.name}
                      </Link>
                    </td>
                    <td >{user.email}</td>
                            <td >
                                <input type="hidden" name="id"  value={user._id}/ > 
                                <select name="role" value={role}  onChange={(e)=>{handleRoleChange(user._id, e.target.value)}} className="accordion" id="role">
                                    <option className="accordion-item" selected={user.role === 'admin' ? true : false} value="admin">Admin</option>
                                    <option className="accordion-item" selected={user.role === 'moderator' ? true : false} value="moderator">Moderator </option>
                                    <option className="accordion-item" selected={user.role === 'member' ? true : false} value="member">Member</option>
                                </select>
                            </td>
                                <td >
                                    <input type="submit"  className="btn btn-primary px-3" value="Update"/>
                                </td>
                  </tr>
                  )}
                  )}
            </tbody>
          </table>
              </form>
        </div>
    </>
  )
}

export default ManageRoles