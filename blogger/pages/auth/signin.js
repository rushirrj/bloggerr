import React,{useState} from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'

const signin = () => {
  const router = useRouter()
  const [value,setValues] = useState({
    email:"",
    password:"",
  })

  const loginUser = async (value) => {
    // console.log("User: ", value);
    if(
      value.email === "" ||
      value.password === "" ||
      value.password === undefined ||
      value.email === undefined
    ){
      alert("Please fill all the fields");
      return;
    }
    await axios
      .post("http://localhost:5000/users/signin", value, {
      })
      .then((res) => {
        setValues({
          email: "",
          password:"",
        }); // Clear the form
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("user",res.data.User._id)
        // console.log(res.data)
        router.push('/blogs/allblogs')
        alert("Logged in successfully.")
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
            <div className=' text-2xl underline'>Sign in to your Account</div>
            <div><input type="text" className='p-1 rounded-sm border' onChange={(e)=>{setValues({...value,email:e.target.value})}} placeholder='Email..'/></div>
            <div><input type="text" className='p-1 rounded-sm border'onChange={(e)=>{setValues({...value,password:e.target.value})}} placeholder='Password..'/></div>
            <div className='w-2/3 flex justify-center items-center'>
              <div className='rounded-lg p-2 w-full flex justify-center items-center cursor-pointer  bg-blue-500 hover:bg-blue-600'
                onClick={()=>{loginUser(value)}}>
                Login
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default signin