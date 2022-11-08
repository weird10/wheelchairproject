import React, { useEffect, useState } from 'react'
import axios, { Axios } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const EditPatient= (props) => {
  const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [condition, setCondition] = useState("")
    const [width, setWidth] = useState("")
    const [depth, setDepth] = useState("")
    const [errors, setErrors] = useState("")


  const navigate = useNavigate();
  
  const {id} = useParams()

useEffect(() => {
  axios.get(`http://localhost:8000/api/patient/${id}`, {withCredentials:true,credentials:'include'})
  .then((res) => {
    setFirstName(res.data.firstName)
    setLastName(res.data.lastName)
    setAge(res.data.age)
    setCondition(res.data.condition)
    setWidth(res.data.width)
    setDepth(res.data.depth)
  }).catch((err) => {
    console.log(err)
  })
} ,[])

const submitHandler = (e) => {
  e.preventDefault()
  axios.put(`http://localhost:8000/api/updatePatient/${id}`, {
    firstName,lastName,age,condition,width,depth
  }, {withCredentials:true,credentials:'include'})
.then(res => {
  console.log(res)
  console.log(res.data)
  navigate("/allPatients")
}).catch(err=> {
  console.log(err)
  setErrors(err.response.data.errors)
})

}
return (
      <div className="mainBody">
        <h1> Update Patient</h1>
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
                <p>
                <label>Width: 
                    <input type="text" onChange={ (e)=>setWidth(e.target.value)} name="width" value={width} /> "
                </label>
                </p>
                { errors.width ? <span className='warning'>{errors.width.message}</span> :null}
                <p>
                <label>Depth: 
                    <input type="text" onChange={ (e)=>setDepth(e.target.value)} name="depth" value={depth} /> "
                </label>
                </p>
                { errors.depth ? <span className='warning'>{errors.depth.message}</span> :null}
                <input type="submit" value="Edit Patient"></input>
            </form>
      </div>
  )
}
export default EditPatient;

