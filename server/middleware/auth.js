import jwt from "jsonwebtoken"
import ENV from '../config.js'

export default async function Auth(req,res,next){
    try {
        

        //access authorize header to validate req
       const token = req.headers.authorization.split(" ")[1];

       //retrive the user details of the login user
       const deToken =await jwt.verify(token, ENV.JWT_SECRET)
       req.user = deToken;
    //    res.json(deToken);
        next();

    } catch (error) {
        res.status(401).json({error:"Authentication fail"})
    }
}

export function localvariables(req,res,next){
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}