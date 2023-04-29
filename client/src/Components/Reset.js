import React from "react";
import "../styles/username.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidate } from "../helper/Validate";
import { resetPassword } from "../helper/helper";
import { useAuthStore } from "../store/store";
import { useNavigate, Navigate } from "react-router-dom";
import useFetch from "../hooks/fetch.hook";


const Reset = () => {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{isLoading,status, serverError}] = useFetch('createResetSession')


  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
      let resetPromise = resetPassword({ username, password: values.password });
      toast.promise(resetPromise, {
        loading: "Updating...",
        success: <b>Reset Successful</b>,
        error: <b>Could not reset</b>,
      });
      resetPromise.then(function(){navigate('/password')})
    },
  });

  if(isLoading) return <h1>isLoading</h1>;
  if(serverError) return <h1>{serverError.message}</h1>
  if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>


  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="glass">
        <div className="title">
          <h3>Reset yor password</h3>
          {/* <span>jknwd</span> */}
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="textBox" style={{ paddingTop: "50px" }}>
            <input
              {...formik.getFieldProps("password")}
              type="password"
              placeholder="New Password"
            />
            <input
              {...formik.getFieldProps("confirm_password")}
              type="password"
              placeholder="Confirm Password"
            />
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset;
