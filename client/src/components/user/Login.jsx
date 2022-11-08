import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';


const Login= ({setUser}) => {
    const [ email, setEmail ] = useState ("")
    const [ password, setPassword ] = useState ("")
    const [errors, setErrors] = useState('')

    const navigate = useNavigate();


    const onSubmitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', {
            email,
            password,
    }, {withCredentials:true,credentials:"include"})
    .then((res) => {
        console.log("logged in success")
        console.log(res.data.user)
        setUser(res.data.user)
        navigate('/Dashboard')
    }).catch(err=> {console.log(err.response); setErrors(err.response)})
}



return (
        <div className="mainBody">
            <h2>Hello :) !</h2>
            <div>
                <p className="details">If you have not registered, please register: <a href="/userRegister">here</a> </p>
            </div>
                <h3>Welcome back! Please login:</h3>
            <form className="basicForm" onSubmit={onSubmitHandler}>    
                <p>
                    <label>Email:  
                    <input type="text" name="email" onChange={ (e)=>setEmail(e.target.value)} value={email} />
                </label>
                </p>
                <p>
                <label>Password: 
                    <input type="password" onChange={ (e)=>setPassword(e.target.value)} name="password" value={password} />
                </label>
                </p>
                <input className="clicker" type="submit" value="Log in"></input>
            </form>
        </div>
    )
}
export default Login;

