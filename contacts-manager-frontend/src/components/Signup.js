import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';

const Signup = () => {
    //alert function
    let alertPlaceholder = document.getElementById('liveAlertPlaceholder')
let alertTrigger = document.getElementById('liveAlertBtn')

function alert(message, type) {
  let wrapper = document.createElement('div')
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper)
}

if (alertTrigger) {
  alertTrigger.addEventListener('click', function () {
    alert('Your Account Created Successfully,Please Login to Enter ', 'success')
  })
}

//
    const [credential,setcredential]=useState({name:"",email:"",password:"",cpassword:""})
    let history=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
       const {name,email,password}= credential;
        const response = await fetch("https://contacts-manager-tsfd.onrender.com/api/auth/createuser", {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name,email,password})
        })
        const json = await response.json()
        console.log(json)
       
            console.log(json.success)
            // localStorage.setItem("token", json.authtoken)
            history("/")
        
    }
    const onChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div className='container position-absolute top-50 start-50 translate-middle' style={{"width":"50%"}}>
            <form onSubmit={handleSubmit} >
                <div className="mb-3" style={{"width":"450px"}} >
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} />
                </div>
                <div className="mb-3" style={{"width":"450px"}}>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3" style={{"width":"450px"}}>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength={5}/>
                </div>
                <div className="mb-3" style={{"width":"450px"}}>
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required minLength={5}/>
                </div>
                <div id="liveAlertPlaceholder"></div>
                <button type="submit" className="btn btn-primary" id="liveAlertBtn">Submit</button>
            </form>
        </div>
    )
}

export default Signup
