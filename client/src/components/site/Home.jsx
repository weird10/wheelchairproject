import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
          <h1>Hi Welcome</h1>
            <p>If you are new here, please<Link  to={"/patientRegister"}>create</Link>an account </p>
    </div>
  )
}


export default Home;

