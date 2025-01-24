import mongoose from "mongoose";

function connect (){
    // console.log(process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("connected to database successfully")})
    .catch((e)=>console.log(e));
}
export default connect;