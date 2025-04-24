import express from "express";
import { getplantread,getmaxplantread,getOneplantread,createplantread,createplantread1,updateplantread,deleteplantread,deletemonthplantread  } from "../controller/plantreadcontroller.js";

const plantreadroute = express.Router();

// adminuserroute.post("/createchrgs", createadminuser);
plantreadroute.get("/getplantread", getplantread);
plantreadroute.get("/getmaxplantread", getmaxplantread);
plantreadroute.get("/getOneplantread/:id", getOneplantread);
plantreadroute.post("/createplantread", createplantread);
plantreadroute.post("/createplantread1", createplantread1);
plantreadroute.put("/updateplantread/:id", updateplantread);
plantreadroute.delete("/deleteplantread/:id", deleteplantread);
plantreadroute.delete("/deletemonthplantread/:id", deletemonthplantread);


export default plantreadroute;