import express from "express";
import { getuser,createuser,updateuser,deleteuser,getselecteduser} from "../controller/usercontroller.js";

const userroute = express.Router();


userroute.get("/getuser", getuser);
userroute.get("/getselecteduser/:id/:id1", getselecteduser);
userroute.post("/createuser", createuser);
userroute.put("/updateuser/:id", updateuser);
userroute.delete("/deleteuser/:id", deleteuser);


export default userroute;