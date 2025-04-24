import express from "express";
import { getplant,createplant,updateplant,deleteplant ,createplantexcel } from "../controller/plantcontroller.js";

const plantroute = express.Router();

// adminuserroute.post("/createchrgs", createadminuser);
plantroute.get("/getplant", getplant);
plantroute.post("/createplantexcel", createplantexcel);
plantroute.post("/createplant", createplant);
plantroute.put("/updateplant/:id", updateplant);
plantroute.delete("/deleteplant/:id", deleteplant);


export default plantroute;