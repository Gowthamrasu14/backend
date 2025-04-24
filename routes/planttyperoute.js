import express from "express";
import { getplanttype,getOneplanttype,createplanttype,updateplanttype,deleteplanttype } from "../controller/planttypecontroller.js";

const planttyperoute = express.Router();

// adminuserroute.post("/createchrgs", createadminuser);
planttyperoute.get("/getplanttype", getplanttype);
planttyperoute.get("/getOneplanttype", getOneplanttype);
planttyperoute.post("/createplanttype", createplanttype);
planttyperoute.put("/updateplanttype/:id", updateplanttype);
planttyperoute.delete("/deleteplanttype/:id", deleteplanttype);


export default planttyperoute;