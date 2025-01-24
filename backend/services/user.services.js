import User from "../models/usermodel.js";
import UserModel from "../models/usermodel.js";

export default async function createUser({email,password}){
    if(!email||!password){
        throw new Error("Email and password are required");
    }
    let hashedPassword= await UserModel.hashPassword(password);
    let user= await UserModel.create({
        email,
        password:hashedPassword
    })
    return user;
}

