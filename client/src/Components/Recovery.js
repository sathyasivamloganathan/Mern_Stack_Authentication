import React, { useEffect, useState } from "react";
import '../styles/username.css'
import toast,{ Toaster } from 'react-hot-toast'
import { useAuthStore } from "../store/store";
import { generateOTP } from '../helper/helper'
import {verifyOTP} from '../helper/helper'
import { useNavigate } from "react-router-dom";
const Recovery = () => {

  const {username} = useAuthStore(state => state.auth)
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    generateOTP(username).then(OTP => {
      console.log(OTP)
      if(OTP) {return toast.success("OTP has been sent to your Email")}
      return toast.error("Problem while generating OTP")
    })
  }, [username])

  async function onsubmit(e){
    e.preventDefault();
    try {
      let{status} = await verifyOTP({username, code:OTP})
      if(status === 201){
        toast.success("Verified Successful")
        return navigate('/reset')
      }
      } 
     catch (error) {
      return toast.error("Wrong OTP. Check Email again!")
    }
  };

  /**Resend OTP */
  function resendOTP(){
    let sendPromise = generateOTP(username)
    toast.promise(sendPromise, {
      loading:"Sending....",
      success:<b>OTP has been send to your Email</b>,
      error:<b>Could not send it</b>
    })
    sendPromise.then((OTP) => {
      console.log(OTP)
    })
  }

  return (
    <div className="container" style={{marginTop:'100px'}}>

      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className='glass'>
        <div className="title">
          <h3>Recovery</h3>
          <span >Enter OTP to recover password</span>
        </div>

        <form onSubmit={onsubmit}>

          <div className="textBox" style={{paddingTop:'50px'}}>
            <input type="text" placeholder="OTP" onChange={(e) => setOTP(e.target.value)} />
            <button type="submit">Sign in</button>
          </div>

          
        </form>
        <div className="notMember">
            <span>
              Can't get OTP{" "}
              <button className="RegisterNow" onClick={resendOTP}>
                Resend
              </button>
            </span>
          </div>
      </div>
    </div>
  );
};

export default Recovery;