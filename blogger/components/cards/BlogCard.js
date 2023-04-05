import React, { useEffect, useState } from "react";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useRouter } from "next/router";
const BlogCard = (props) => {
  const router = useRouter();
  
  const deletePost = async () => {
    // console.log("delete", props.id);
    await axios
      .delete(`http://localhost:5000/posts/delete/${props.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        alert("deleted successfully.");
        router.push('/blogs/allblogs')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col sm:flex-row  p-3 m-3 sm:m-0 gap-7 sm:w-4/5 md:w-2/4 justify-between hover:shadow-lg  rounded-sm border border-gray-300 cursor-pointer">
      {/* <div className=''> */}
      <div onClick={()=>{
        router.push(`/blogs/view/${props.id}`)
      }} className="flex flex-col gap-4 ">
        <div>
          <h2 className="font-bold text-xl">{props.title}</h2>
        </div>
        <div>
          <p className="text-black">{props.desc}</p>
        </div>
      </div>
      {/* </div> */}

      <div>
        {props.admin ? (
          <div className="flex  sm:flex-col gap-4 sm:border-l sm:border-b sm:border-gray-500 pl-2 pb-2">
            <DriveFileRenameOutlineOutlinedIcon
              onClick={() => {
                router.push(`/blogs/edit/${props.id}`);
              }}
              className="cursor-pointer hover:text-navBlue hover:bg-gray-200 text-2xl"
            />
            {/* <div onClick={deletePost}> */}
            <DeleteIcon
              onClick={deletePost}
              className="cursor-pointer hover:text-navBlue hover:bg-gray-200 text-2xl"
            />
            {/* </div> */}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
    // </div>
  );
};

export default BlogCard;
