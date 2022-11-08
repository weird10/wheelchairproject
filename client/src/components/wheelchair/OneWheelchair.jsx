import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import DeleteWheelchairButton from "../DeleteWheelchairButton";


const OneWheelchair = (props) => {
    const [thisWheelchair, setThisWheelchair] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();


    
    useEffect (() => {
        axios.get("http://localhost:8000/api/wheelchair/" + id, {withCredentials:true,credentials:'include'})
        .then((res) => {
            console.log("this is", res.data);
            setThisWheelchair(res.data);
        }).catch(err=> console.log(err))
    } , [id])

    

  return (
    <div className="mainBody">
       <p><Link to='/allWheelchairs'>All Wheelchairs</Link></p>
        <div className="split">
          <div>
            <h2>{thisWheelchair.color} {thisWheelchair.brand}</h2>
            <h3>Type: {thisWheelchair.type}</h3>
            <h4>Foldable: {thisWheelchair.foldable}</h4>
            <p>ID: {thisWheelchair._id}</p>
            <p>Tyres: {thisWheelchair.tyres}</p>
            <p>Width: {thisWheelchair.width}</p>
            <p>Depth: {thisWheelchair.depth}</p>
          </div>
          <div>
            <img className="catImage" src={thisWheelchair.image} alt="wheelchair Image" />
          </div>
          </div>        
  <Link to={`/edit/${thisWheelchair._id}`}>Edit Wheelchair</Link>
        <DeleteWheelchairButton wheelchairId={thisWheelchair._id} />
         </div>
  )
}

export default OneWheelchair