import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import warehouse from '../../asset/warehouse.png'
import wheelchair from '../../asset/wheelchair.jpeg'
import people from '../../asset/people.png'
import addPatient from '../../asset/add-patient.png'
import { Link } from 'react-router-dom'

const Dashboard = ({user}) => {

  
    return (
      <div className="mainBody">
              
              { (user.admin) ?
              <>

              <h1>Hi, {user.firstName}</h1>
              <p className='details'> You have Admin permissions</p>
              <div className="centered">
                <table className='basicTable'>
                  <tbody className='testingTable'>
                <tr>
                  <td className="rows">
                    <img className="categoryImg" src={wheelchair} alt='wheelchair'></img>
                    <Link className="buttons" to="/addWheelchair">Add Wheelchair</Link>
                  </td>
                </tr>
                <tr>
                  <td className="rows">
                    <img className="categoryImg" src={warehouse} alt='wheelchair'></img>                
                    <Link className="buttons" to='/allWheelchairs' >All Wheelchair</Link>
                  </td>
                </tr>
                <tr>
                  <td className="rows">
                    <img className="categoryImg" src={people} alt='wheelchair'></img>
                    <Link  className="buttons" to="/allPatients">All Patients</Link>
                  </td>
                </tr>
                </tbody>
                </table>
              </div>
              </>
              :
              <div className="mainBody">


                <div className="centered">
            
                  <table className='basicTable'>
                  <tbody className='testingTable'>
                    <tr>
                      <td className="rows">
                        <img className="categoryImg" src={people} alt='wheelchair'></img>
                        {/* (wip,"Patients awaiting wheelchairs") */}
                        <Link className="buttons" to="/allPatients">All Patients </Link>
                        <Link className="buttons" to="/allPatients">Patients assigned wheelchair. </Link>
                        <img className="categoryImg" src={people} alt='wheelchair'></img>
                        <Link className="buttons" to="/allPatients">Patients Assigned Wheelchairs (**wip)</Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="rows">
                        <img className="categoryImg" src={addPatient} alt='wheelchair'></img>
                        <Link className="buttons" to="/addPatient">Add a new patient</Link></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              } 
    </div>    
        
    )
  }


export default Dashboard