import axios from 'axios';
import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../App.css";
import DeleteWheelchairButton from '../DeleteWheelchairButton';
import defaultWCimg from'../../asset/defaultWC.jpeg'

const WheelchairList = ({user}) => {
    
    const [list, setList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/allWheelchairs', {withCredentials:true,credentials:'include'})     
    .then(res => {
        setList(res.data)
    })
    } , [])

    
    const removeFromDom = (wheelchairId) => {
        setList(list.filter(wheelchair => wheelchair._id !== wheelchairId))
        }
  return (
    <div className='mainBody'>
        <table className='tableRow'>
            <tbody className='tableInnerBorder'>
                <tr>
                    <th>Wheelchair Image</th>
                    <th>Link</th>
                    <th>Action</th>
                </tr>
        {
        list.map((wheelchair,index) => {
            return( 
            
            <tr key={index}> 
                <td>{ wheelchair.image ? <img src='{wheelchair.image}'></img>
                        :
                     <img className="wcListIcon" src={defaultWCimg} alt='wheelchair'></img>
                         }</td>
                <td>
                    <p>{wheelchair.width}" x {wheelchair.depth}" </p>
                    <Link to={`/wheelchair/${wheelchair._id}`}>{wheelchair.color} {wheelchair.brand}'s page</Link>
                </td>
                <td>
                <Link className='buttons' to={`/edit/${wheelchair._id}`}>Edit Wheelchair</Link>
                <DeleteWheelchairButton wheelchairId={wheelchair._id} />
                </td>
            </tr>              
            )})
    }  
    </tbody>
            </table>
    </div>
  )
}

export default WheelchairList