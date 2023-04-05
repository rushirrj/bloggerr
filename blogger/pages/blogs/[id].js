import React, { useEffect, useState } from 'react'
import BlogCard from '../../components/cards/BlogCard'
import axios from 'axios';
import useSWR from 'swr'
import { useRouter } from 'next/router'; 

const ViewMyPost = ({data}) => {
 
  // console.log(data)
  return (
    <div className='py-5 flex gap-6 items-center justify-center flex-col'>
      {
        data.post.map((ele,key)=>{
         return <BlogCard key={key} title={ele.title} desc={ele.description} admin={true} id={ele._id}/>
        })
      }
    </div>
  )
}

export default ViewMyPost


export async function getServerSideProps(context) {
  const {params} = context
  const res = await axios.get(`http://localhost:5000/posts/mypost/${params.id}`)
  return {
      props: {
          data: res.data
      },
  }
}