import { useRouter } from "next/router";
import React, { useState } from "react";
import Editor from "../../../components/editor";
import Viewer from "../../../components/Viewer";
import axios from "axios";

const editContent = (props) => {
  const router = useRouter()
 
  const [blog, setBlog] = React.useState({
    title: props.data.title,
    body: props.data.body,
    image: props.data.image,
    description: props.data.description,
    _id: props.data._id,
  });
  
  const onEditorbodyChanged = (c) => {
    setBlog({ ...blog, body: c.html });
  };

  const postImage = async (image) => {
    if (image === undefined || image.size < 100) {
      alert("Please select a valid image");
      return;
    }
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "omen123");

    await fetch("https://api.cloudinary.com/v1_1/omen123/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setBlog({ ...blog, image: data.url });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateBlog = async () => {
    // console.log(blog);
    await axios
      .put(`http://localhost:5000/posts/edit/${blog._id}`, blog, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        alert("updated successfully.");
        router.push('/blogs/allblogs')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-1/2 pb-10">
        <p className="text-center font-bold text-2xl my-3">Update Blog Post</p>
        <input
          className="mb-3 w-full bg-white border-0 border-b-2 px-4 py-2 focus:border-gray-300"
          type="text"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          placeholder="Add Title"
        />
        <input
          className="mb-3 w-full bg-white border-0 border-b-2 px-4 py-2 focus:border-gray-300"
          type="text"
          value={blog.description}
          onChange={(e) => setBlog({ ...blog, description: e.target.value })}
          placeholder="Add Description"
        />
        <p className="text-center font-bold text-md my-2">
          Add Blog Image **only upload if you want to change image
        </p>
        <input
          type="file"
          class="w-full bg-white border border-gray-300 rounded px-4 py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={(e) => {
            postImage(e.target.files[0]);
          }}
        />
        <p
          className="text-center font-bold text-md my-1"
          onClick={() => {
            window.open(blog.image);
          }}
        >
          view image
        </p>
        <p className="text-center font-bold text-xl my-3">
          Update Blog Content
        </p>
        <Editor setData={onEditorbodyChanged} valueMarkdown={blog?.body} />
        <p className="text-center font-bold text-xl">View Your Content</p>
        <div className="border-2 p-5">
          <Viewer htmlValue={blog?.body} />
        </div>
        <div className="flex justify-end gap-2">
          <button className="bg-navBlue w-1/4 text-white rounded-sm mt-3">
            Cancel
          </button>
          <button
            onClick={updateBlog}
            className="bg-navBlue w-1/4 text-white rounded-sm mt-3"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default editContent;

export async function getServerSideProps(context) {
  const res = await fetch(
    `http://localhost:5000/posts/post/${context.params.id}`
  );
  const data = await res.json();
  // console.log(data);
  return {
    props: { data: data.post },
  };
}
