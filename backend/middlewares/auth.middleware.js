import jwt from 'jsonwebtoken';

export const authUser= (req,res,next)=>{
    try {
        let token= req.cookies?.token || req.headers.authorization.split(' ')[1];
        console.log("token ",token);
        if(!token){
            
            res.status(401).send({error:"unauthorized"});
        }
        let user=jwt.verify(token,process.env.SECRET);
        req.user=user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({error:"unauthorized"});
    }
}   
