import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import DeletePatientButton from "../DeletePatientButton";


const OnePatient = ({user}) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [condition, setCondition] = useState("")
    const [width, setWidth] = useState("")
    const [depth, setDepth] = useState("") 
    const [submitter, setSubmitter] = useState("") 
    const [assignedWheelchair, setAssignedWheelchair] = useState("")
    const {id} = useParams();
    const navigate = useNavigate();
    const [list, setList] = useState([])


    
    useEffect (() => {
        axios.get(`http://localhost:8000/api/patient/${id}` ,{withCredentials:true,credentials:'include'})
        .then((res) => {
            console.log("this is", res.data);
            setFirstName(res.data.firstName)
            setLastName(res.data.lastName)
            setAge(res.data.age)
            setCondition(res.data.condition)
            setWidth(res.data.width)
            setDepth(res.data.depth)
            setAssignedWheelchair(res.data.assignedWheelchair)
            setSubmitter(res.data.submitter)
        }).catch(err=> console.log(err))
    } , [])

    useEffect(() => {
      axios.get('http://localhost:8000/api/allWheelchairs', {withCredentials:true,credentials:'include'})     
  .then(res => {
      setList(res.data)
  })
  } , [])

  const submitWheelchairHandler = (e) => {
    console.log("helllooooooo", assignedWheelchair)
    e.preventDefault()
    axios.put(`http://localhost:8000/api/updatePatient/${id}`, {
      firstName,lastName,age,condition,width,depth,submitter,assignedWheelchair
    }, {withCredentials:true,credentials:'include'})
  .then(res => {
    console.log(res.data)
    navigate("/allPatients")
  }).catch(err=> {
    console.log( )
    console.log(err)
    
  })
  }

  return (
    <div className="mainBody">
      <div className="displayForm">
        <Link className="buttons" to="/allPatients">All Patients</Link>
        <h2>{firstName} {lastName}</h2>
        <h3>Age: {age}</h3>
        <h4>Condition: {condition}</h4>
        <p>Width: {width}</p>
        <p>Depth: {depth}</p>
        <p>Submitter: {submitter}</p>
        <p>Wheelchair Assigned: {assignedWheelchair}</p>


        { (user.admin) ?
        <>
        <p>Assign a wheelchair: </p>
        <form onSubmit={submitWheelchairHandler}>
        <select>
          {list.map((wheelchair,index) => { 
            // eslint-disable-next-line no-lone-blocks
            { if (wheelchair.width === width && wheelchair.depth === depth && user.admin)        
          return (
            <>
          <option key={index} onChange={ (e)=>setAssignedWheelchair(e.target.value)} name="assignedWheelchair" value={wheelchair._id}>{wheelchair.color}</option>
          </>
          )
        }
        })}
          </select>
          {/* why can't I submit */}
          <input className="goButton" type="submit" value="Assign wheelchair"></input>
          </form>
        </>
        :
        
        <>        
        <p>Wheelchair Assigned:  {assignedWheelchair}</p>
        </>
    }
        <Link className="buttons" to={`/editPatient/${id}`}>Edit Patient</Link>
        <DeletePatientButton className="warnButton" patientId={id} />
        </div>
    </div>
  )
}

export default OnePatient