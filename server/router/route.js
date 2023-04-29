import { Router } from "express";
const router = Router();
import * as controller from '../controllers/appController.js'
import Auth from '../middleware/auth.js'
import {localvariables} from '../middleware/auth.js'
import {registerMail} from '../controllers/mailler.js'

/**Post Methods */
router.route('/register').post(controller.register);  //register user
router.route('/registerMail').post(registerMail);  //send the email
router.route('/authenticate').post(controller.verifyUser, (req,res)=> res.end()); //authenticate user
router.route('/login').post(controller.verifyUser,controller.login);  //login to app


/**Get Methods */
router.route('/user/:username').get(controller.getUser);  //userwith username
router.route('/generateOTP').get(controller.verifyUser,localvariables,controller.generateOTP);  //generate random OPT
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP);  //verify generate OPT
router.route('/createResetSession').get(controller.createResetSession);  //reset all the variables

/**Put Methods */
router.route('/updateuser').put(Auth,controller.updateUser);  //user to update the user profile
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword);  //use too reset password



export default router;