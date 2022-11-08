import axios from 'axios';
import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeletePatientButton from '../DeletePatientButton';

const PatientList = ({user}) => {
    const [list, setList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/allPatients', {withCredentials:true,credentials:'include'})
        .then(res => setList(res.data))
    } , [])

    const removeFromDom = (patientId) => {
        setList(list.filter(patient => patient._id !== patientId))
        }
  return (
    <div className='mainBody'>
        <table className='tableRow'>
            <tbody>
            <tr>
                            <th>Name:</th>
                            <th>Action</th>                        
            </tr> 
        {list.map((patient,index) => {
            return (
                <>
                    
                    { (patient.assignedWheelchair) || (user.admin) ? 
                    // { (patient.assignedWheelchair) && (user.firstName + ' ' + user.lastName === patient.submitter) || (user.admin) ?  ?
                        <>   
                    <tr key={index}>
                            <td>
                                <Link className="" to={`/patient/${patient._id}`}>{patient.lastNaME} {patient.firstName}'s page</Link>                                
                            </td>
                            <td>
                                <Link className="buttons" to={`/editPatient/${patient._id}`}>Edit Patient</Link>
                                <DeletePatientButton patientId={patient._id} />

                            </td>
                    </tr>
                        </>
                        :
                        <>
                        </>
                    }
                </>
                
                )})
            }  
            </tbody>
            </table>
    </div>
  )
}

export default PatientList