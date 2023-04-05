import React, { useState,useEffect } from 'react'
import BlogCard from '../../components/cards/BlogCard'
import axios from 'axios';
import parse from "html-react-parser";
import jwt_decode from "jwt-decode";

const allblogs = ({data}) => {
  const[admin,setAdmin] = useState()
  useEffect(()=>{
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    setAdmin(decoded.admin)

  },[])

  return (
    <div className='py-5 flex gap-6 items-center justify-center flex-col'>
      {data.map((element,key)=>{
        return <BlogCard key={key} id={element._id} title={element.title} desc={element.description} admin={admin}/>
      })}
    </div>
  )
}

export default allblogs

export async function getServerSideProps(context){

  const res = await fetch(`http://localhost:5000/posts/allposts`);
  const data = await res.json();
  // console.log(data)
  return {
    props:{data:data.posts}
    
  }
}