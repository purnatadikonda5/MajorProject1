import mongoose from "mongoose";
import bcyrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minLength:[6,"Email must be atleast 6 characters long"],
        maxLength:[50,"Email must be atmax 50 characters long"]
    },
    password:{
        type:String,
        required:true,
        select:false
    }
})


userSchema.statics.hashPassword= async function (password){
    return await bcyrpt.hash(password,10);
}

userSchema.methods.isvalidPassword= async function (password){
    return await bcyrpt.compare(password,this.password); // this.password refers to the password of the current document
}

userSchema.methods.generateJwt=  function(){
    return  jwt.sign({email:this.email},process.env.SECRET);
}

const User= mongoose.model("User",userSchema);

export default User;