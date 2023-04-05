import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
const signup = () => {
  const router = useRouter()
  const [value,setValues] = useState({
    name:"",
    email:"",
    password:"",
    admin:"",
  })

  const createNewUser = async (value) => {
    // console.log("User: ", value);
    if(value.name === "" ||
      value.email === "" ||
      value.password === "" ||
      value.password === undefined ||
      value.name === undefined ||
      value.email === undefined
    ){
      alert("Please fill all the fields");
      return;
    }
    await axios
      .post("http://localhost:5000/users/signup", value, {
      })
      .then((res) => {
        alert("New User Created Successfully.")
        setValues({
          name: "",
          email: "",
          password:"",
          admin:"",
        }); // Clear the form
        router.push('/auth/signin')
      })
      .catch((err) => {
        console.log(err);
      });
  };


  
  return (
    <div className='flex justify-center items-center py-8 sm:h-monitor'  >
      <div className='flex flex-col sm:flex-row' style={{boxShadow:"rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px, rgba(0, 0, 0, 0.2) 0px 1px 5px 0px"}}>
        <div className='h-96 w-96 flex justify-center items-center'>
          <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" alt="" />
        </div>
        <div className=' flex justify-center sm:justify-start items-center px-8 py-4 sm:py-0'>
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className=' text-2xl underline'>Register Your Account</div>
            <div><input type="text" className='p-1 rounded-sm border ' placeholder='Name' onChange={(e)=>{setValues({...value,name:e.target.value})}}/></div>
            <div><input type="text" className='p-1 rounded-sm border ' placeholder='Email' onChange={(e)=>{setValues({...value,email:e.target.value})}}/></div>
            <div><input type="text" className='p-1 rounded-sm border ' placeholder='Password..' onChange={(e)=>{setValues({...value,password:e.target.value})}}/></div>
            <div className='flex justify-start w-full gap-2'>
              <div className='flex pl-4 justify-center items-center'>
                <label >Admin : </label>
                <div className='p-1 rounded-sm border ml-3 flex gap-3' >
                    <input type="radio" name='admin' value="true" onChange={(e)=>{setValues({...value,admin:e.target.value})}}/>
                    <label htmlFor="admin">Yes</label>
                    <input type="radio" name='admin' value="false" onChange={(e)=>{setValues({...value,admin:e.target.value})}}/>
                    <label htmlFor="admin">No</label><br></br>
                </div>
              </div>
            </div>
            <div className='w-2/3 flex justify-center items-center'>
              <div className='rounded-lg  p-2 w-full flex justify-center items-center cursor-pointer bg-blue-500 hover:bg-blue-600'
                onClick={()=>{createNewUser(value)}}
              >
              Register
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default signup