import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const DeletePatientButton = (props) => {
    const { patientId } = props
    const navigate = useNavigate();
    const deletePatient = (e) => {
        axios.delete("http://localhost:8000/api/deletePatient/" + patientId, {withCredentials:true,credentials:'include'})
        .then (res => {
            navigate('/Dashboard');
        })
    }
    return (
        <button className="warnButton" onClick = {deletePatient}>Delete Patient</button>
    )
}

export default DeletePatientButton