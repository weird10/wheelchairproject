
import axios from 'axios'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../../App.css";


const NavBar = ({user}) => {


  const navigate = useNavigate();


const logout = (e) => {
  axios.get('http://localhost:8000/api/logout' , {withCredentials:true})
  .then((res) => {
    console.log("admin logged out")
    console.log(res)
    navigate('/login')
    window.location.reload()
  }).catch((err) => {
    console.log(err)
  })
  
}


  return (
    <div className='topbar'>
        <div className='topbarLink'>
       
        { (user.firstName) ?
                <>
                  <Link className="buttons" to="/Dashboard">Dashboard</Link>
                  <Link className="buttons" to={`/updateUser/${user._id}`}>Update User</Link>
                  <Link className="buttons" onClick={logout}>Logout</Link>
                </>
                :
                <> 
                <Link className="buttons" to="/userRegister">Register</Link>

                 <Link className="buttons" to="/login">Log in</Link>
                    </>
            }
        </div>
    </div>
  )
}

export default NavBar