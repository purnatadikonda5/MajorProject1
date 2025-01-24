import createUser from "../services/user.services.js";
import UserModel from "../models/usermodel.js";
import { validationResult } from "express-validator";
export const createUserController= async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        // console.log(UserService);
        console.log(req.body);
        const user= await createUser(req.body);
        const token= await user.generateJwt();
        res.status(201).json({user,token});
    } catch (error) {
        console.log("i am the eroor");
        return res.status(400).send(error.message);
    }
}
export const createLoginController = async(req,res)=>{
    let errors= validationResult(req);
    if(!errors.isEmpty()){
       return res.status(401).json(errors.array());
    }
    let {email,password}= req.body;
    try {
        let user= await UserModel.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({
                errors:"Wrong Credentials"
            })
        }
        console.log(user);
        let isMatch= user.isvalidPassword(password);
        if(!isMatch){
            return res.status(401).json({
                errors:"Wrong Credentials"
            })
        }
        let token= await user.generateJwt();
        res.status(201).json({user,token});

    } catch (error) {
        return res.status(401).send(error.message);
    }   
}