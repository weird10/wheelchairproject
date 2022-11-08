import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import DeletePatientButton from "../DeletePatientButton";


const OnePatient = ({user}) => {
    const [thisPatient, setThisPatient] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();
    const [list, setList] = useState([])
    const [assignedWheelchair, setAssignedWheelchair] = useState("")


    
    useEffect (() => {
        axios.get(`http://localhost:8000/api/patient/${id}` ,{withCredentials:true,credentials:'include'})
        .then((res) => {
            console.log("this is", res.data);
            setThisPatient(res.data);
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
      assignedWheelchair
    }, {withCredentials:true,credentials:'include'})
  .then(res => {
    console.log(res.data)
    navigate("/allPatients")
  }).catch(err=> {
    console.log(err)
  })
  }

  return (
    <div className="mainBody">
      <div className="displayForm">
        <Link className="buttons" to="/allPatients">All Patients</Link>
        <h2>{thisPatient.firstName} {thisPatient.lastName}</h2>
        <h3>Age: {thisPatient.age}</h3>
        <h4>Condition: {thisPatient.condition}</h4>
        <p>Width: {thisPatient.width}</p>
        <p>Depth: {thisPatient.depth}</p>
        <p>Submitter: {thisPatient.submitter}</p>
        <p>Wheelchair Assigned: {thisPatient.assignedWheelchair}</p>


        { (user.admin) ?
        <>
        <p>Assign a wheelchair: </p>
        <form onSubmit={submitWheelchairHandler}>
        <select>
          {list.map((wheelchair,index) => { 
            // eslint-disable-next-line no-lone-blocks
            { if (wheelchair.width === thisPatient.width && wheelchair.depth === thisPatient.depth && user.admin)        
          return (
            <>
          <option key={index} onChange={ (e)=>setAssignedWheelchair(e.target.value)} value={wheelchair.color}>{wheelchair.color}</option>
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
        <p>Wheelchair Assigned:  {thisPatient.assignedWheelchair}</p>
        </>
    }
        <Link className="buttons" to={`/editPatient/${thisPatient._id}`}>Edit Patient</Link>
        <DeletePatientButton className="warnButton" patientId={thisPatient._id} />
        </div>
    </div>
  )
}

export default OnePatient