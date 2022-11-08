
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import {useNavigate} from 'react-router-dom'

const Update = ({user}) => {
    const {id} = useParams();
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${id}`, {withCredentials:true,credentials:'include'})
        .then ( res => {
          setFirstName(res.data.firstName)
          setLastName(res.data.lastName)
          setEmail(res.data.email)
          console.log(res)
        })
        .catch((err) => console.log(err))
    }, [])

    const submitHandler = (e) => {
      e.preventDefault()
      axios.put(`http://localhost:8000/api/updateUser/${id}`,{firstName, lastName, email}, {withCredentials:true,credentials:'include'})
      .then(res => {
        console.log(res);
        console.log(res.data)
        navigate('/Dashboard')
        
      })
      .catch(err => {
        console.log(err)
        setErrors(err.response.data.errors)
      })
    }

  return (
    <div>
      <h1>Update your profile, {user.firstName}</h1>
      <form className="basicForm" onSubmit={submitHandler}>
                <p><label>First Name: 
                    <input type="text" name="firstName" onChange={ (e)=>setFirstName(e.target.value)} value={firstName} />
                </label>
                </p>
                { errors.firstName ? <span className='warning'>{errors.firstName.message}</span> :null}
                <p><label>Last Name: 
                <input type="text" name="lastName" onChange={ (e)=>setLastName(e.target.value)} value={lastName} />

                </label>
                </p>
                { errors.lastName ? <span className='warning'>{errors.lastName.message}</span> :null}

                <p>
                <label>Email:  
                <input type="text" name="email" onChange={ (e)=>setEmail(e.target.value)} value={email} />
                </label>
                </p>
                { errors.email ? <span className='warning'>{errors.email.message}</span> :null}
                <p>
                <input type="submit" value="Edit User"></input>
                </p>
            </form>
  </div>
  )
}

export default Update