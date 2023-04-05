import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from 'next/link';
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router'

const Navbar = (props) => {
const router = useRouter()
const [hamburger, setHamburger] = useState(false);

const signout =() =>{
  localStorage.clear();
  props.setUser(false);
  router.push('/auth/signin')
}

return (
    <div>
      <div className="flex justify-around items-center p-4 shadow-lg">
        {/* Sidebar starts */}
        <div className=" flex flex-col justify-between w-3/6 sm:w-56"
          style={{
            minHeight: "100vh",
            background: "rgb(57 61 70 / 94%)",
            padding: 10,
            boxShadow: "6px 0px 2px rgba(0, 0, 0, 0.15)",
            zIndex: 2,
            position: "fixed",
            top: 0,
            left: !hamburger ? "-100%" : 0,
            bottom: 0,
            transition: "300ms ease-in",
          }}
        >
          <span onClick={() => setHamburger(false)}
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              zIndex: 2,
              cursor: "pointer",
            }}
          >
            <CloseIcon style={{ color: "white" }} />
          </span>
          <div>
            <div className="flex flex-col gap-7 pr-8 justify-center items-center pt-11 ">
              <div className="cursor-pointer text-lg font-bold text-white w-full text-center hover:border-r-2">
                Home
              </div>
                <Link href="/auth/signin" className="cursor-pointer text-lg font-bold text-white w-full text-center hover:border-r-2">
                    Login
                </Link>

              <Link href="/auth/signup" className="cursor-pointer text-lg font-bold text-white w-full text-center hover:border-r-2">
                Signup
              </Link>
            </div>
          </div>
        </div>
        {/* Sidebar Ends */}
        <div className="flex flex-row sm:pl-8">
          <Link  href="/blogs/allblogs" className="text-black cursor-pointer">
            <img src="/logo.jpg" alt="" className="h-8 sm:h-10" />
          </Link>
        </div>
        <div className="hidden md:flex flex-row gap-7 pr-8 justify-center items-center ">
        {
          props.user ? (
            <>
              <Link href="/blogs/allblogs"  className="cursor-pointer text-lg font-bold hover:underline">
                All Blogs
              </Link>
              <div onClick={()=>{router.push(`/blogs/${localStorage.getItem('user')}`)}}  className="cursor-pointer text-lg font-bold hover:underline">
                My Blogs
              </div>
              <div onClick={()=>{router.push('/create-post')}}  className="cursor-pointer text-lg font-bold hover:underline">
                Create Post
              </div>
              <div className="cursor-pointer text-lg font-bold hover:underline"
                onClick={signout}
              >
                Logout
              </div>
            </>
          ):(
            <>
            <Link href="/auth/signin"  className="cursor-pointer text-lg font-bold hover:underline">
                Login
              </Link>
              <Link href="/auth/signup"  className="cursor-pointer text-lg font-bold hover:underline">
                Signup
              </Link>
            </>
          )
        }
        </div>
        <div className="md:hidden cursor-pointer" onClick={() => {setHamburger(true);}}>
          <MenuIcon
            className="text-black"
            style={{ height: "32px", width: "32px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

