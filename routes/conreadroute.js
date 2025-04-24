import express from "express";
import { getconread,getmaxconread,createconread,updateconread,deleteconread  } from "../controller/conreadcontroller.js";

const conreadroute = express.Router();

// adminuserroute.post("/createchrgs", createadminuser);
conreadroute.get("/getconread", getconread);
conreadroute.get("/getmaxconread", getmaxconread);
// conreadroute.get("/getupdateconread", getupdateconread);
conreadroute.post("/createconread", createconread);
conreadroute.put("/updateconread/:id", updateconread);
conreadroute.delete("/deleteconread/:id", deleteconread);


export default conreadroute;