import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import measurement from '../../asset/measurement.jpeg'


const PatientForm= ({user,setUser}) => {
    
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [condition, setCondition] = useState("")
    const [width, setWidth] = useState("")
    const [depth, setDepth] = useState("") 
    const [submitter, setSubmitter] = useState("")
    const [assignedWheelchair, setAssignedWheelchair] = useState('')
    const [errors, setErrors] = useState("")

    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/createPatient', {
            firstName,
            lastName,
            age,
            condition,
            width,
            depth,
            submitter: user.firstName + ' ' + user.lastName,
            assignedWheelchair
    }, {withCredentials:true, credentials:"include"})
    .then(res => {
        console.log(res)
        navigate("/Dashboard")
    }).catch((err)=> {
        console.log(err)
        setErrors(err.response.data.errors)
})
}

return (
        <div className='mainBody'>
            <h1>Hi {user.firstName} </h1>
            <h3> Add a Patient</h3>

            <form className="basicForm" onSubmit={onSubmitHandler}>
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
                <label>Age:  
                <input type="number" name="age" onChange={ (e)=>setAge(e.target.value)} value={age} />
                </label>
                </p>
                { errors.age ? <span className='warning'>{errors.age.message}</span> :null}
                <p>
                <label>Patient's condition: 
                <select name="type"  onChange={ (e)=>setCondition(e.target.value)} value={condition}>
                        <option value=""></option>
                        <option value="Cerebal Palsy">Cerebal Palsy</option>
                        <option value="Stroke">Stroke</option>
                        <option value="Loss of Limb">Loss of Limb</option>
                    </select>         
                </label>
                </p>

                { errors.condition ? <span className='warning'>{errors.condition.message}</span> :null}
                <div className='split'>
                    <div>
                        <img  src={measurement} alt='wheelchair'></img>
                    </div>
                    <div>
                        <p>
                        <label>Width:  (A.)
                        <input type="text" onChange={ (e)=>setWidth(e.target.value)} name="width" value={width} /> "
                        </label>
                        </p>
                { errors.width ? <span className='warning'>{errors.width.message}</span> :null}
                <p>
                <label>Depth (B.): 
                    <input type="text" onChange={ (e)=>setDepth(e.target.value)} name="depth" value={depth} /> "
                </label>
                </p>
                { errors.depth ? <span className='warning'>{errors.depth.message}</span> :null}
                </div>
                </div>
                <input type="submit" value="Add Patient"></input>
            </form>
        </div>
    )
}
export default PatientForm;

