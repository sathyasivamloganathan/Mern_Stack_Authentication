import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assests/profile.png";
import "../styles/username.css";
import {toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidate } from "../helper/Validate";
import convertToBase64 from "../helper/Convert";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from '../store/store'
import {updateUser} from '../helper/helper'

const Profile = () => {

  const navigate = useNavigate();
  const { username } = useAuthStore(state => state.auth)
    const[file, setFile] = useState()
    const [{ isLoading, serverError }] = useFetch(`/user/${username}`)

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      mobileNo: '',
      address: '',
      email: "",
      username: username || ""
      // password: apiData?.password || "",
    },
    enableReinitialize: true,
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
    values = await Object.assign(values, {profile : file || ''})
      console.log(values);
      let updatePromise = updateUser(values)
      toast.promise(updatePromise, {
        loading:"Updating...",
        success:"Update Successful",
        error:"Could not Update"
      })
    },
  });

  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  function LogOut(){
    localStorage.removeItem("token");
    navigate('/')
  }
  
  if(isLoading) return <h1>isLoading</h1>;
  if(serverError) return <h1>{serverError.message}</h1>

  return (
    <div className="container" style={{ marginTop: "100px",marginBottom:"200px" }}>
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="glass" style={{width:'400px',height:"50rem"}}>
        <div className="title">
          <h3>Profile</h3>
          <span>You can update the details</span>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="profile">
            <label htmlFor="profile">
              <img src={file || avatar} alt="avatar" className="profile_img" />
            </label>

            <input type="file" id="profile" name="profile" onChange={onUpload}/>
          </div>

          <div className="textBox">
            <div>
            <input
              {...formik.getFieldProps("firstname")}
              type="text"
              placeholder="First Name"
            />
            <input
              {...formik.getFieldProps("lastname")}
              type="text"
              placeholder="Last Name"
            />
            </div>

            <div>
            <input
              {...formik.getFieldProps("email")}
              type="email"
              placeholder="Email"
            />
            <input
              {...formik.getFieldProps("mobileNo")}
              type="text"
              placeholder="Mobile No"
            />
            </div>

            <div>
            <input
              {...formik.getFieldProps("username")}
              type="name"
              placeholder="Username"
            />
            </div>
            
             <input
              {...formik.getFieldProps("address")}
              type="text"
              placeholder="Address"
              style={{margin:'auto'}}
            />
             
            {/* <button type="submit"><Navigate to={'/mainPage'} replace={true}>Update</Navigate></button> */}
            <button type="submit">Update</button>

          </div>

          <div className="notMember">
            <span>
              Come back later{" "}
              <Link to="/" className="RegisterNow" onClick={LogOut}>
                Logout
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
