import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import avatar from "../assests/profile.png";
import "../styles/username.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidate } from "../helper/Validate";
import convertToBase64 from "../helper/Convert";  
import { registerUser } from "../helper/helper";

const Register = () => {
  const navigate = useNavigate();
    const[file, setFile] = useState()

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
    values = await Object.assign(values, {profile : file || ''})
      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success:<b>Register Successfully...!</b>,
        error:<b>Couldn't Register</b>
      });
      registerPromise.then(function(){navigate('/')})
      console.log(values)
    },
  });

  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }


  return (
    <div className="container" style={{ marginTop: "100px",marginBottom:"200px" }}>
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="glass" style={{width:'400px',height:"50rem"}}>
        <div className="title">
          <h3>Register</h3>
          <span>Happy to join you!</span>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="profile">
            <label htmlFor="profile">
              <img src={file || avatar} alt="avatar" className="profile_img" />
            </label>

            <input type="file" id="profile" name="profile" onChange={onUpload}/>
          </div>

          <div className="textBox">
            <input
              {...formik.getFieldProps("email")}
              type="email"
              placeholder="Email"
            />
             <input
              {...formik.getFieldProps("username")}
              type="text"
              placeholder="Username"
              style={{margin:'auto'}}
            />
             <input
              {...formik.getFieldProps("password")}
              type="password"
              placeholder="Password"
            />
            <button type="submit">Register</button>
          </div>

          <div className="notMember">
            <span>
              Already Registered{" "}
              <Link to="/" className="RegisterNow">
                Login Now
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
