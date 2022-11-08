import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const DeleteWheelchairButton = (props) => {
    const { wheelchairId, successCallback } = props
    const navigate = useNavigate();
    const deleteWheelchair = (e) => {
        axios.delete("http://localhost:8000/api/delete/" + wheelchairId, {withCredentials:true,credentials:'include'})
        .then (res => {
            navigate('/Dashboard');
        })
    }
    return (
        <button className='warnButton' onClick = {deleteWheelchair}>Delete Wheelchair</button>
    )
}

export default DeleteWheelchairButton