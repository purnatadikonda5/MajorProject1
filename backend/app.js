import express, { urlencoded } from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import UserRoutes from './routers/user.routes.js';
const app= express();
app.use(morgan('dev'));
app.use(express.json());
app.use("/users",UserRoutes);
connect();
app.use(urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.send("hai");
})

export default app;
