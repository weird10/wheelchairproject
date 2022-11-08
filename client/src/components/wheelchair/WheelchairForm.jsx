import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import wcMeasurement from '../../asset/WCmeasurement.jpg'


const WheelchairForm= (props) => {
    const {onSubmitProp} = props
    const [ brand, setBrand ] = useState("")
    const [ type, setType ] = useState("")
    const [ foldable, setFoldable ] = useState ("")
    const [ tyres, setTyres ] = useState ("")
    const [ color, setColor ] = useState ("")
    const [ width, setWidth ] = useState ("")
    const [ depth, setDepth ] = useState ("")
    const [ image, setImage] = useState ("")
    const [errors, setErrors] = useState("")

    const navigate = useNavigate();


    const onSubmitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/createWheelchair', {
            brand,type,foldable,tyres,color,width,depth,image
    }, {withCredentials:true, credentials:"include"})
    .then(res => {
        console.log(res)
        navigate("/allWheelchairs")
    }).catch((err)=> {
        console.log(err)
        setErrors(err.response.data.errors)
})

}

return (
        <div className="mainBody">
            <h1> Add a Wheelchair</h1>

            <form className="regForm" onSubmit={onSubmitHandler}>
            <p>
                <label>Brand: 
              <select name="brand" onChange={ (e)=>setBrand(e.target.value)} value={brand}>
                      <option value=""></option>
                      <option value="Invacare">Invacare</option>
                      <option value="Drive">Drive</option>
                      <option value="Free Wheelchair Mission">Free Wheelchair Mission</option>
                  </select>  
              </label>
              </p>
              { errors.brand ? <span className='warning'>{errors.brand.message}</span> :null} 

                <p><label>Type: 
                <select name="type"  onChange={ (e)=>setType(e.target.value)} value={type}>
                        <option value=""></option>
                        <option value="Transporter">Transporter</option>
                        <option value="Recliner">Recliner</option>
                        <option value="Pediatric">Pediatric</option>
                        <option value="Standard">Standard</option>
                        <option value="Sports">Sports</option>
                        <option value="Active">Active</option>
                    </select>
                </label>
                </p>
                { errors.type ? <span className='warning'>{errors.type.message}</span> :null}

                <p>
                <label>Foldable?:  
                    <select name="foldable" onChange={ (e)=>setFoldable(e.target.value)} value={foldable}>
                        <option value=""></option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </label>
                </p>
                { errors.foldable ? <span className='warning'>{errors.foldable.message}</span> :null}
                <p>
                <label>Type of Tyre: 
                <select name="tyres" onChange={ (e)=>setTyres(e.target.value)} value={tyres}>
                        <option value=""></option>
                        <option value="inflatable">Inflatable</option>
                        <option value="massive">Massive</option>
                    </select>                
                </label>
                </p>
                { errors.tyres ? <span className='warning'>{errors.tyres.message}</span> :null}

                <p>
                <label>Color: 
                    <input type="text" onChange={ (e)=>setColor(e.target.value)} name="color" value={color} />
                </label>
                </p>
                { errors.color ? <span className='warning'>{errors.color.message}</span> :null}
                <div className='split'>
                    <div>
                        <img  src={wcMeasurement} alt='wheelchair'></img>
                    </div>
                    <div>
                        <p>
                        <label>Width:  (A.)
                        <input type="text" onChange={ (e)=>setWidth(e.target.value)} name="width" value={width} />"
                        </label>
                        </p>
                { errors.width ? <span className='warning'>{errors.width.message}</span> :null}
                <p>
                <label>Depth (B.): 
                    <input type="text" onChange={ (e)=>setDepth(e.target.value)} name="depth" value={depth} />"
                </label>
                </p>
                { errors.depth ? <span className='warning'>{errors.depth.message}</span> :null}
                </div>
                </div>
                <p>
                <label>Image(url): 
                    <input type="text" onChange={ (e)=>setImage(e.target.value)} name="image" value={image} />
                </label>
                </p>
                <input className="buttons" type="submit" value="Add Wheelchair"></input>
            </form>
        </div>
    )
}
export default WheelchairForm;

