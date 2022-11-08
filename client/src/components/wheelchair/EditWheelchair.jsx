import React, { useEffect, useState } from 'react'
import axios, { Axios } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import WheelchairForm from './WheelchairForm';

const EditWheelchair= (props) => {
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
  
  const {id} = useParams()

useEffect(() => {
  axios.get(`http://localhost:8000/api/wheelchair/${id}`, {withCredentials:true,credentials:'include'})
  .then((res) => {
    setBrand(res.data.brand)
    setType(res.data.type)
    setFoldable(res.data.foldable)
    setTyres(res.data.tyres)
    setColor(res.data.color)
    setWidth(res.data.width)
    setDepth(res.data.depth)
    setImage(res.data.image)
  }).catch((err) => {
    console.log("this ain't good",err)
  })
} ,[])

const submitHandler = (e) => {
  e.preventDefault()
  axios.put(`http://localhost:8000/api/update/${id}`, {
      brand,type,foldable,tyres,color,width,depth,image
}, {withCredentials:true,credentials:'include'})
.then(res => {
  console.log(res)
  console.log(res.data)
  navigate("/allWheelchairs")
}).catch(err=> {
  console.log(err)
  setErrors(err.response.data.errors)
})

}
return (
      <div>
        <p><a href='/allWheelchairs'>All Wheelchairs</a></p>
        <h1> Update Wheelchair</h1>
          <form onSubmit={submitHandler}>
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
              <p>
              <label>Width: 
                  <input type="text" onChange={ (e)=>setWidth(e.target.value)} name="width" value={width} /> "
              </label>
              </p>
              { errors.width ? <span className='warning'>{errors.width.message}</span> :null}
              <p>
              <label>Depth: 
                  <input type="text" onChange={ (e)=>setDepth(e.target.value)} name="depth" value={depth} /> "
              </label>
              </p>
              { errors.depth ? <span className='warning'>{errors.depth.message}</span> :null}
              <p>
              <label>Image(url): 
                  <input type="text" onChange={ (e)=>setImage(e.target.value)} name="image" value={image} />
              </label>
              </p>
              <input type="submit" value="Update Wheelchair"></input>
          </form>
      </div>
  )
}
export default EditWheelchair;

