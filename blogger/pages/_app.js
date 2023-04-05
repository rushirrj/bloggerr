import '/styles/globals.css'
import 'react-quill/dist/quill.snow.css'
import Navbar from '../Screens/Navbar'
import Footer from '../Screens/Footer'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }){
  const [user,setUser] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem('token')){setUser(true)}
    else{setUser(false)}
  })

  return(
    <div>
      <Navbar user={user} setUser={setUser}/>
      <div className='min-h-monitor' style={{minHeight:"79vh"}}>
      <Component {...pageProps} />
      </div>
      <Footer/>
    </div>
  )
}
