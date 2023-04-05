import React, { useState } from "react";
import MyEditor from "../components/MyEditor";
import Viewer from "../components/Viewer";
import axios from "axios";
import { useRouter } from "next/router";
const CreatePostPage = () => {
  const router = useRouter()
  const [blog, setBlog] = React.useState({
    title: "",
    body: "",
    image: "",
    description: "",
  });

  const createNewBlog = async () => {
    // console.log("BLOG: ", blog);
    if (
      blog.title === "" ||
      blog.body === "" ||
      blog.title === undefined ||
      blog.body === undefined
    ) {
      alert("Please fill all the fields");
      return;
    }
    await axios
      .post("http://localhost:5000/posts/createpost", blog, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        alert("New Post Created Successfully.");
        setBlog({
          title: "",
          body: "",
          image: "",
          description: "",
        }); // Clear the form
        router.push('/blogs/allblogs')
      })
      .catch((err) => {
        console.log(err);
      });
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
        console.log(data);
        setBlog({ ...blog, image: data.url });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEditorbodyChanged = (c) => {
    setBlog({ ...blog, body: c.html });
  };
  return (
    <div className="w-1/2 pb-10">
      <p className="text-center font-bold text-2xl my-3">Create Blog Post</p>
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
      <input
        type="file"
        class="w-full bg-white border border-gray-300 rounded px-4 py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        onChange={(e) => {
          postImage(e.target.files[0]);
        }}
      />
      <p className="text-center font-bold text-xl my-3">Add Blog Content</p>
      <MyEditor setData={onEditorbodyChanged} />
      <p className="text-center font-bold text-xl">View Your Content</p>
      <div className="border-2 p-5">
        <Viewer htmlValue={blog?.body} />
      </div>
      <div className="flex justify-end gap-2">
        <button className="bg-navBlue w-1/4 text-white rounded-sm mt-3">
          Cancel
        </button>
        <button
          onClick={createNewBlog}
          className="bg-navBlue w-1/4 text-white rounded-sm mt-3"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostPage;
