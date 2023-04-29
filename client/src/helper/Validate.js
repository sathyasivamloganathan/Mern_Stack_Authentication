import toast from "react-hot-toast";
import {authenticate} from './helper.js'
/** validate login page username */

export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  if(values.username){
    //check user existance
    const {status} = await authenticate(values.username)
    if(status !== 200){
      errors.exist = toast.error("User does not exist")
    }
  }
  return errors;
}

/**Validate Password */
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

/**Validate reset password */
export async function resetPasswordValidate(values) {
  const errors = passwordVerify({}, values);
  if (values.password !== values.confirm_password) {
    errors.exist = toast.error("Password not match");
  }
  return errors;
}

/**Validate Register Form */
export async function registerValidate(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values)
}


/**Validate Profile */
export async function profileValidate(values){
    const errors = emailVerify({}, values);
    return errors;
} 

/**Validate username */
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username required");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username");
  }

  return error;
}

/**Validate password */
function passwordVerify(error = {}, values) {
  const specialCharacters = /[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/;

  if (!values.password) {
    error.password = toast.error("Password required");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Invalid password");
  } else if (values.password.length < 5) {
    error.password = toast.error("Password must be more than 5 characters");
  } else if (!specialCharacters.test(values.password)) {
    error.password = toast.error("Password must have special characters");
  }

  return error;
}

/**Validate Email */
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email required");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Invalid email");
  }
  return error;
}
