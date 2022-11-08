import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";


const Detail = (props) => {
    const [thisUser, setThisUser] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();


    
    useEffect (() => {
        axios.get("http://localhost:8000/api/user/" + id)
        .then((res) => {
            console.log("this is", res.data);
            setThisUser(res.data);
        }).catch(err=> console.log(err))
    } , [id])


  return (
    <div>
        <h2>{thisUser.firstName} {thisUser.lastName}</h2>

    </div>
  )
}

export default Detail