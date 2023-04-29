import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assests/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/Validate'
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { verifyPassword } from '../helper/helper'

export default function Password() {

  const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, serverError }] = useFetch(`/user/${username}`)

  const formik = useFormik({
    initialValues : {
      password : ''
    },
    validate : passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      
      let loginPromise = verifyPassword({ username, password : values.password })
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success : <b>Login Successfully...!</b>,
        error : <b>Password Not Match!</b>
      });

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/profile')
      })
    }
  })

  if(isLoading) return <h1>isLoading</h1>;
  if(serverError) return <h1>{serverError.message}</h1>

  return (
    <div className="container">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className='glass'>

          <div className="title">
            <h4>Hello {username}</h4>
            <span>
              Explore More by connecting with us.
            </span>
          </div>

          <form onSubmit={formik.handleSubmit}>
              <div className="profile">
                  <img src={ avatar} alt="avatar"  className="profile_img"/>
              </div>

              <div className="textBox">
                  <input {...formik.getFieldProps('password')} type="text" placeholder='Password' />
                  <button type='submit'>Sign In</button>
              </div>

              <div className="notMember">
                <span>Forgot Password? <Link to="/recovery"  className="RegisterNow">Recover Now</Link></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}