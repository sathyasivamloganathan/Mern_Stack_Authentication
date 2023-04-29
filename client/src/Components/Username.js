import React from "react";
import { Link, useNavigate} from "react-router-dom";
import avatar from "../assests/profile.png";
import '../styles/username.css'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { usernameValidate } from '../helper/Validate'
import { useAuthStore } from "../store/store";

const Username = () => {
    const navigate = useNavigate();
    const setUsername = useAuthStore(state => state.setUsername)
    
    // useEffect(() => {
    //     console.log(username)
    // })
  const formik = useFormik({
    initialValues: {
      username : '',
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
    //   console.log(values)
    setUsername(values.username)
    navigate('/password')
    }
})

  return (
    <div className="container" style={{marginTop:'100px'}}>

      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className='glass'>
        <div className="title">
          <h3>Hello Again!</h3>
          <span>jknwd</span>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="profile">
            <img src={avatar} alt="avatar" className="profile_img"/>
          </div>

          <div className="textBox">
            <input {...formik.getFieldProps('username')} type="text" placeholder="Username" />
            <button type="submit">Let's Go!</button>
          </div>

          <div className="notMember">
            <span>
              Not a Member{" "}
              <Link to="/register" className="RegisterNow">
                Register Now
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Username;
