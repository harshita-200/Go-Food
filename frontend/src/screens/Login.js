import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import './Signup.css';
export default function Login() {
  const [credentials, setCredentials] = useState({email:"",password:""})
     let navigate=useNavigate();

  const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch("https://go-food-4.onrender.com/api/loginuser",{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              email:credentials.email,
              password:credentials.password
        })
        });
        const json= await response.json()
        console.log(json);
        if(!json.success)
          {
            alert("Enter Valid Credentials");
          }
          if(json.success)
         {
          localStorage.setItem("userEmail",credentials.email)
          localStorage.setItem("authToken",json.authToken)
          console.log(localStorage.getItem("authToken"))
         navigate("/");
         }
  }

  const onchange=(event)=>{
      setCredentials({...credentials,[event.target.name]:event.target.value});
  }

  return (
    <div  className="setLogin">
    <div className="container login" style={{width:'30rem'}}>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onchange} id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to="/createuser" className="m-3 btn btn-danger">New User</Link>
</form>
</div>
    </div>
  )
}
